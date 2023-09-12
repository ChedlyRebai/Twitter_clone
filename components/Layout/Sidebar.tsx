    import React from 'react'
    import { BiLogOut } from 'react-icons/bi';
    import {  FaBell, FaHome} from "react-icons/fa";
    import SideBarLogo from './SideBarLogo';
    import SidebarItem from './SidebarItem';

    import { FaUser } from 'react-icons/fa';
    import SideBartweetButton from './SideBartweetButton';

import useCurrentUser from '@/hooks/useCurrentuser';
import { signOut } from 'next-auth/react';
    const Sidebar = () => {
        const {data:currentUser}=useCurrentUser()
       
        const items = [
        {
            title:'Home',
            href:'/',
            icon: FaHome
        },{
            title:'notifications',
            href:'/notifications',
            icon:FaBell,
            alert : currentUser?.hasNotification

        },{
            title:' Profile',
            href:`/users/${currentUser?.id}}`,
            icon:FaUser
        }
        ]

    return (
        <div className='col-span-1 h-full pr-4 md:pr-6'>
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px] ">
                    <SideBarLogo />  
                    {items.map((item) => (
                            <SidebarItem key={item.title} 
                            title={item.title}
                            href={item.href}
                            icon={item.icon}
                            />
                        ))}
                    { 
                    currentUser 
                    ? <SidebarItem onClick={() => signOut()}  icon={BiLogOut} title="Logout" href={''} /> 
                    : <></>
                    } 
                    <SideBartweetButton/>
                
                    
                </div>  
            </div>
        </div>
    )
    }

    export default Sidebar


    
