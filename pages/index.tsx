import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import UserHero from '@/components/users/UserHero'
import UserBio from '@/components/users/UserBio'
import Form from '@/components/Form'
import PostFeed from '@/components/PostFeed'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='text-3xl text-sky-400'>
      <Header text="header" />
      <Form placeholder={'What s happening  '} postId={''} />  
      <PostFeed/> 
    </div>
  )
}
  