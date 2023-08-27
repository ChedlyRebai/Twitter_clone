import useUser from "@/hooks/useUser";
import Avatar from "../Avatar";
import { Prisma, User } from "@prisma/client";
import Image from "next/image";


interface UserHeroProps {
userId: string;
}

const UserHero = ({userId}:UserHeroProps) => {
    const {data:fetchedUser} : {data:any} =useUser(userId)
    return ( 
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image src={fetchedUser.coverImage} fill alt="Cover Image" style={{ objectFit: 'cover' }}/>
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
     );
}   
 
export default UserHero;