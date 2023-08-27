import useCurrentUser from "@/hooks/useCurrentuser";
import useLoginModal from "@/hooks/useLoginModal";
import usePost from "@/hooks/usePost";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";
import Avatar from "./Avatar";
import { is } from "date-fns/locale";

interface FormProps {
    placeholder: string;
    isComment?: boolean;
    postId : string;

}

const Form = ({placeholder,isComment,postId}:FormProps) => {
    const registreModal=useRegisterModal();
    const loginModal=useLoginModal()
    const {data:currentUser}:{data:any}=useCurrentUser()
    
    
    const { mutate: mutatePosts } = usePosts();
    const { mutate: mutatePost } = usePost(postId as string);
  
    const [body,setBody]=useState('')
    const [isLoading,setIsLoading]=useState(false)

    const onSubmit = useCallback(async () => {
        try {
          setIsLoading(true);

          const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts';
          if(isComment){
            console.log('is comment')
          }
          await axios.post(url, { body , id:currentUser?.id });
          toast.success('Tweet created');
          setBody('');
          mutatePosts();
          mutatePost()
        } catch (error) {
          toast.error('Something went wrong');
        } finally {
          setIsLoading(false);
        }
      }, [body, mutatePosts,isComment]);
    
    return ( 
     
    <div className="
    border-b-[1px] border-neutral-800 px-5 py-2
    ">
        <div className="py-8">

            {
                currentUser ? (
                    <div className="flex flex-row gap-4">
                    <div>
                      <Avatar userId={currentUser?.id} />
                    </div>
                    <div className="w-full">
                      <textarea
                        disabled={isLoading}
                        onChange={(event) => setBody(event.target.value)}
                        value={body}
                        className="
                          disabled:opacity-80
                          peer
                          resize-none 
                          mt-2
                          w-full 
                          bg-black 
                          ring-0 
                          outline-none 
                          text-[20px] 
                          placeholder-neutral-500 
                          text-white
                        "
                        placeholder={placeholder}>
                      </textarea>
                      <hr 
                        className="
                          opacity-0 
                          peer-focus:opacity-100 
                          h-[1px] 
                          w-full 
                          border-neutral-800 
                          transition"
                      />
                      <div className="mt-4 flex flex-row justify-end">
                        <Button disabled={isLoading || !body} onClick={onSubmit} label="Tweet" />
                      </div>
                    </div>
                  </div>
                ):(
                    <>
                    <h1 className="text-white text-2xl text-center mb-4 font-bold">
                        welcome to twitter 
                    </h1>
                <div className="flex flex-row items-center justify-center gap-4">
                    <Button onClick={loginModal.onOpen} label="Login"/>
                    <Button secondary onClick={registreModal.onOpen} label="Register"/>
                </div>
                </>
                )
            }
            
        </div>
         
    </div> );
}
 
export default Form;