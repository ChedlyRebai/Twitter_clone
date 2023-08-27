import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST' && req.method !== 'DELETE') {
        return res.status(405).end(); // Method Not Allowed
    }

    try {
        const { userId, currentId } = req.body;
        //const { currentUser } = await serverAuth(req);
        
        if (!userId || typeof userId !== 'string' || !currentId) {
            throw new Error('Invalid user ID or current ID');
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        console.log(user?.name)

        if (!user) {
            throw new Error('User not found');
        }

        let updateFollowings = [...(user.followingIds || [])];

        console.log(req.method)
        if (req.method === 'POST') {
            console.log(req.method)
            console.log("userId in follow api p: "+userId);
            console.log("currentId in follow api p: "+req.body.currentId);
            
             updateFollowings.push(currentId);
            // console.log()
            // console.log("userId in follow api p: "+userId);
            // console.log("currentUser in follow api p: "+req.body.currentId);  
            // console.log("updateFollowings in follow api p: "+updateFollowings);
             console.log("add:" + updateFollowings.includes(currentId) )
             try {
                await prisma.notification.create({
                  data: {
                    body: 'Someone followed you!',
                    userId,
                  },
                });
        
                await prisma.user.update({
                  where: {
                    id: userId,
                  },
                  data: {
                    hasNotification: true,
                  }
                });
              } catch (error) {
                console.log(error);
              }
            
        }

        if (req.method === 'DELETE') {
            updateFollowings = updateFollowings.filter(id => id !== currentId);
             console.log("userId in follow api d: "+userId);
            console.log("currentId in follow api d  : "+req.body.currentId);
            // updateFollowings= updateFollowings.filter((id)=> id !== userId)
            // console.log("updateFollowings in follow api d: "+updateFollowings);
            console.log("remove: "+updateFollowings.includes(currentId))
        
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                followingIds: {
                    set: updateFollowings,
                },
            },
        });
        console.log(updatedUser)

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(400).end();
    }
}





