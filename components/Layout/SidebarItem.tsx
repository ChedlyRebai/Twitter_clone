import useCurrentUser from '@/hooks/useCurrentuser'
import useLoginModal from '@/hooks/useLoginModal'
import { Icon } from 'next/dist/lib/metadata/types/metadata-types'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { IconType } from 'react-icons'
import { BiCommentDots, BiDotsHorizontal, BiDotsVertical, BiSolidBoltCircle, BiSolidCircle } from 'react-icons/bi'
import { FaDotCircle } from 'react-icons/fa'

interface SidebarItemProps{
    title: string,
    href: string,
    icon: IconType,
    alert ?: boolean,
    onClick?: () => void
}

const SidebarItem = ({title,href,icon:Icon,onClick,alert}:SidebarItemProps) => {

  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if ( !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, href,  loginModal, onClick, currentUser]);
  return (
    <div onClick={handleClick} className="flex flex-row items-center">
    <div className="
      relative
      rounded-full 
      h-14
      w-14
      flex
      items-center
      justify-center 
      p-4
      hover:bg-slate-300 
      hover:bg-opacity-10 
      cursor-pointer 
      lg:hidden
    ">
      <Icon size={28} color="white" />    
      {alert ? <BiSolidCircle className="text-sky-500 text-base absolute top-3 left-2"   /> : null}
      </div>
    <div className="
      relative
      hidden 
      lg:flex 
      items-row 
      gap-4 
      p-4 
      rounded-full 
      hover:bg-slate-300 
      hover:bg-opacity-10 
      cursor-pointer
      items-center
    ">

      <Icon size={24} color="white" />
      <p className="hidden lg:block text-white text-xl">
        {title}
      </p>
      {alert ? <BiSolidCircle className="text-sky-500 text-base absolute top-3 left-2"    /> : null}
    </div>
  </div>

  )
}

export default SidebarItem