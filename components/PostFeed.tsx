import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

interface PostFeedProps {
    userId : string;
}



const PostFeed = ({userId}:PostFeedProps) => {
    const {data:posts = []}:{data:any[]}=usePosts(userId)
    return ( 
        <>
            {
                posts.map((post:Record<string,any>)=>(
                <PostItem
                    userId={post.user.id}
                    key={post.id}
                    data={post}                
                />
                ))
            }
        </>
     );
}
 
export default PostFeed;