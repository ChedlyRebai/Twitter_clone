import useCurrentUser from "@/hooks/useCurrentuser";
import useLoginModal from "@/hooks/useLoginModal";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { da } from "date-fns/locale";
import { useRouter } from "next/router";
import { format } from "path";
import { useCallback, useMemo, useReducer } from "react";
import Avatar from "./Avatar";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import useLike from "@/hooks/useLike";

interface PostItemProps {
userId : string;
data : Record<string,any>;
}

const PostItem = ({userId,data}:PostItemProps) => {
    
    const router = useRouter()
    const loginModal=useLoginModal()
    const {data : currentUser} = useCurrentUser()
    const {hasLike   , toggleLike }=useLike({postId:data.id,userId})
    const goToUser = useCallback((event:any)=>{
        event.stopPropagation();
        router.push(`/users/${userId}`)
    },[router,data.user.id])


    const goToPost = useCallback((event:any)=>{
        event.stopPropagation();
        router.push(`/posts/${data.id}`)
    },[router,data.id])

    const onLike = useCallback(async (ev: any) => {
      ev.stopPropagation();
  
      if (!currentUser) {
        return loginModal.onOpen();
      }
  
      toggleLike();
    }, [loginModal, currentUser, toggleLike]);
  

    const createdAt =useMemo(()=>{
        if(!data.createdAt){
            return null
        }
        return formatDistanceToNowStrict(new Date(data.createdAt))
    },[data.createdAt])

    const LikeIcon= hasLike ? AiFillHeart:AiOutlineHeart
  return (
    <div 
      onClick={goToPost}
      className="
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      ">
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p 
              onClick={goToUser} 
              className="
                text-xl
                text-white 
                 
                cursor-pointer 
                hover:underline
            ">
              {data.user.name}
            </p>
            <span 
              onClick={goToUser} 
              className="
                text-neutral-500
                cursor-pointer
                text-sm
                hover:underline
                hidden
                md:block
            ">
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">
              {createdAt}
            </span>
          </div>
          <div className="text-white mt-1 text-sm">
            {data.body}
          </div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div 
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                text-[20px]
                cursor-pointer 
                transition 
                hover:text-sky-500
            ">
              <AiOutlineMessage size={20} />
              <p>
                {data.comments?.length || 0}
              </p>
            </div>
            <div
              onClick={onLike}
              className="
              flex 
              flex-row 
              items-center 
              text-neutral-500 
              gap-2 
              text-[20px]
              cursor-pointer 
              transition  
            hover:text-red-500
            ">
                <LikeIcon  size={20} />
              <p>
                {data.likedIds.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
 
export default PostItem;