import { useCallback, useMemo } from "react"
import useCurrentUser from "./useCurrentuser"
import useLoginModal from "./useLoginModal"
import usePost from "./usePost"
import usePosts from "./usePosts"
import axios from "axios"
import { toast } from "react-hot-toast"

const useLike = ({postId,userId}:{postId:string,userId?:string}) => {

    const {data:currentUser}= useCurrentUser()
    const {data:fetchedPost ,mutate:mutateFetchedPost }= usePost(postId)
    const {mutate : mutateFetchedPosts}=usePosts(userId)
    
    const loginModal = useLoginModal();

    
    let hasLike = useMemo(() => {

        const list = fetchedPost?.likedIds || [];
 
        
        return list.includes(currentUser?.id);
    }, [fetchedPost, currentUser]);

 
    
    const toggleLike= useCallback(async()=>{
        if(!currentUser){
            return loginModal.onOpen()
        }

        try {
            let request;

            if(hasLike){
    //             console.log(" is like :true)");
    //             console.log("post from useFollwo : " + postId)
    // console.log("userId from useFollwo : " + userId)
    

                request=()=> axios.delete('/api/like',{data:{postId,userId:currentUser?.id}})
                hasLike=false;
            }else{
                // console.log(" is like :false)");
                // console.log("post from useFollwo : " + postId)
                // console.log("userId from useFollwo : " + userId)
    

                request=()=> axios.post('/api/like',{postId,userId:currentUser?.id})
                hasLike=true;
            }

            await request()
            mutateFetchedPost()
            mutateFetchedPosts()

            toast.success('Success')
        } catch (error) {
            toast.error('Something went wrong')
        }
    },[currentUser, hasLike, postId, mutateFetchedPost, mutateFetchedPosts, loginModal])

    return {
        hasLike,
        toggleLike
    }
}

export default useLike