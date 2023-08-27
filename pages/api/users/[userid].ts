import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prismadb'
import { error } from 'console'
export default async function handler(
    req: NextApiRequest,res :NextApiResponse
    ) {
    if(req.method !== 'GET'){
        return res.status(405).end()
    }

    try {
        const {userid:userId}=req.query
        if(!userId || typeof userId !== 'string'){
            throw new Error('User ID not provided')
        }

        const existUser=await prisma.user.findUnique({
            where:{
                id:userId
            }
        })

       
        if(!existUser){
            throw new Error('User not found')
        }

        const followersCount=await prisma.user.count({
            where:{
                followingIds:{
                    has:userId
                }
             }
        })

        return res.status(200).json({...existUser,followersCount})

    } catch (error) {
        console.error(error)
        return res.status(400).end()
    }
    }