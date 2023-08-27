import { useEffect, useMemo } from "react";
import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";

import Button from "../Button";
import useCurrentUser from "@/hooks/useCurrentuser";
import useUser from "@/hooks/useUser";
import { User } from "@prisma/client";
import EditModal from "@/Modal/EditModal";
import useEditModal from "@/hooks/useEditModal";
import useFollow from "@/hooks/useFollow";
import { is } from "date-fns/locale";

interface UserBioProps {
  userId: string;
}

const UserBio = ({userId}:UserBioProps) => {
    const {data:currentUser}:{data:any}=useCurrentUser() 
    const {data:fetchedUser}:{data:any}=useUser(userId) 
    const editModal=useEditModal()
    let {isFollowing,toggleFollow } =useFollow(userId,currentUser?.id)
    const createdAt = useMemo(() => {
        if (!fetchedUser?.createdAt) {
          return null;
        }
        return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');
    }, [fetchedUser?.createdAt])

    useEffect(() => {
        console.log("isFollowing:"+isFollowing)
    }, [isFollowing])

    if(fetchedUser){
        console.log("fetched:"+fetchedUser?.id )
    }
  
    if(currentUser){
        console.log("current"+currentUser?.id)
    }
    
    return ( 
        <div className="border-b-[1px] border-neutral-800 pb-4  ">
            <div className="flex justify-end p-2">   
        {
        currentUser &&  currentUser?.id === userId  
            ? <Button secondary label="Edit" onClick={editModal.onOpen} />
            : <Button secondary label={isFollowing ? `Unfollow`:`Follow`}  onClick={toggleFollow} />
        }

        </div>
            <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-neutral-500">
            @{fetchedUser?.username}
          </p>
        </div>

        <div className="flex flex-col mt-4 ">
            <p className="text-white text-md ">
            {fetchedUser?.bio}
            </p>
            <div className="flex flex-row items-center gap-2 mt-4 text-neutral-400">
                <BiCalendar size={20} />
                <p>
                    joined {createdAt}
                </p>
            </div>

        </div>
        <div className="flex flex-row items-center">
        <div className="flex flex-row items-center mt-4 gap-6 ">
            <div className="flex flex-row items-center gap-1">
                <p className="text-white">
                    {fetchedUser?.followingIds?.length || 0}
                </p>
                <p className="text-white">
                    Following
                </p>
            </div>
        </div>

        <div className="flex flex-row items-center mt-4 gap-6 ml-2">
            <div className="flex flex-row items-center gap-1">
                <p className="text-white">
                    {fetchedUser?.followersCount || 0}
                </p>
                <p className="text-white">
                    Followers
                </p>
            </div>
        </div>
        </div>
        </div>   
        </div>
    );
}
 
export default UserBio;