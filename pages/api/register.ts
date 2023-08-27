import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt"

import prisma from "@/libs/prismadb";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    if(req.method !== "POST"){
        return res.status(405).json({message:"Method not allowed"})
    }

    try {
        const {email,username,name ,password} = req.body
        if(!email || !username || !name || !password){
            return res.status(400).json({message:"Please fill all fields"})
        }

        // const userExists = await prisma. ser.findUnique({
        //     where:{
        //         email:email
        //     }
        // })

        // if(userExists){
        //     return res.status(400).json({message:"User already exists"})
        // }
        
        
        const hashPassword= await bcrypt.hash(password,10)
        const user =await prisma.user.create({
            data:{
                email,
                username,
                name,
                hashedPassword:hashPassword
            }
        })

        return res.status(200).json({message:"User created successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}