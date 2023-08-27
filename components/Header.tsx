import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { BiArrowBack } from 'react-icons/bi'

interface HeaderProps {
    text : string
    displayArrow?: boolean
}

const Header = ({text,displayArrow}:HeaderProps) => {
    const router=useRouter()
    
    const handleClick = () => {
    useCallback(() => {
      router.back()      
    },[router])
    
    }
  return (
    <div className='border-b-[1px] border-neutral-800 p-5'>
        <div className="flex flex-row items-center gap-2">
            {
                displayArrow && (
                    <BiArrowBack 
                        size={24} 
                        color="white" 
                        onClick={handleClick}
                        className="cursor-pointer hover:opacity-70
                        transition
                        "    
                    />
                )
            }
            <h1 className='text-white text-xl font-semibold'> {text}</h1>
        </div>
      
    </div>
  )
}

export default Header
