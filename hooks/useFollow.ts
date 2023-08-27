import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import useCurrentUser from "./useCurrentuser";
import { is } from "date-fns/locale";

const useFollow = (userId: string,currentId?:String) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser,data:fetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  let isFollowing = useMemo(() => {

    const list = currentUser?.followingIds;
    console.log("follow: " +fetchedUser?.followingIds.includes(currentUser?.id as string))
    return fetchedUser?.followingIds.includes(currentUser?.id as string);
  }, [currentUser, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    console.log('current uuuu '+ currentUser?.id )
    try {
      let request;
       
      console.log("current user iii: "+currentUser?.id)
      const list =await currentUser?.followingIds ;
      console.log(list)

      if (isFollowing) {
      
      console.log(" is follow :true)");
      
          request = () => axios.delete('/api/follow', { data :{userId,currentId}  });
          isFollowing=false;
      } else {
        console.log(" is follow :false)");
          
        request = () => axios.post('/api/follow', { userId,currentId });
        isFollowing=true;
      }

      await request();
      mutateCurrentUser();
      mutateFetchedUser();

      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal]);

  return {
    isFollowing,
    toggleFollow,
  }
}

export default useFollow;
