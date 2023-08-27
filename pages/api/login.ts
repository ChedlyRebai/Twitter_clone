import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    try {
      const isValid = await bcrypt.compare(password, `${user?.hashedPassword}`);
      if (!isValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    } catch (bcryptError) {
      return res.status(500).json({ message: 'An error occurred during authentication' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred' });
  }
}
