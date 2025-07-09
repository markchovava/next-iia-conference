"use client"
import Image from 'next/image';
import Link from 'next/link'
import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

export default function NavArea() {
    const [toggleNav, setToggleNav] = useState(false)
    
    // Smooth scroll function
    const smoothScrollTo = (elementId: string) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu after clicking
        setToggleNav(false);
    }

    // Handle click for anchor links
    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, elementId: string) => {
        e.preventDefault();
        smoothScrollTo(elementId);
    }
    
    return (
        <>
        <section className='w-full lg:block hidden bg-white drop-shadow'>
            <div className='mx-auto w-[92%] flex items-center justify-between py-6'>
                <div className='flex-1'>
                    {/* <h1 className='text-[2rem] uppercase'>
                        <span className='mr-2 font-extrabold'>IIA</span>
                        <span className='text-teal-700 font-light'>Conference</span>
                    </h1> */}

                    <Link href="/">
                        <div className="h-[50px] aspect-[3.5/1] relative">
                            <Image
                            src="/assets/img/logo.jpg"
                            fill
                            alt="Company Logo"
                            className="object-fill w-[100%]"
                            /> 
                        </div>
                    </Link>
                    
                </div>
                <div className='flex-3 flex items-center justify-end'>
                    <ul className='flex items-center justify-end gap-5'>
                        <li className={`font-medium hover:text-teal-700 hover:border-b hover:border-teal-700 pb-2 cursor-pointer`}
                            onClick={() => smoothScrollTo('home')}>
                            Home
                        </li>
                        <li className='font-medium hover:text-teal-700 hover:border-b hover:border-teal-700 pb-2 cursor-pointer'
                            onClick={() => smoothScrollTo('about')}>
                            About the Conference
                        </li>
                        <li className='font-medium hover:text-teal-700 hover:border-b hover:border-teal-700 pb-2 cursor-pointer'
                            onClick={() => smoothScrollTo('speakers')}>
                            Our Speakers
                        </li>
                        <li className='font-medium hover:text-teal-700 hover:border-b hover:border-teal-700 pb-2 cursor-pointer'
                            onClick={() => smoothScrollTo('package')}>
                            Attendance Tickets
                        </li>
                        <li className='font-medium rounded-md transition-al ease-in-out bg-teal-700 text-white hover:bg-gradient-to-br hover:from-teal-700 hover:to-green-800 hover:drop-shadow px-4 py-2 cursor-pointer'
                            onClick={() => smoothScrollTo('register')}>
                            Register
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section className='w-full lg:hidden block bg-white drop-shadow'>
            <div className='mx-auto w-[92%] flex flex-col items-center justify-between py-6 gap-4'>
                <div className='flex-1'>
                    <Link href="/">
                    <div className="h-[50px] aspect-[3.5/1] relative">
                        <Image
                        src="/assets/img/logo.jpg"
                        fill
                        alt="Company Logo"
                        className="object-fill w-[100%]"
                        /> 
                    </div>
                </Link>
                </div>
                <div className='w-[100%] flex items-center justify-end'>
                    <button onClick={() => setToggleNav(!toggleNav)}>
                    {toggleNav ?
                        <IoClose className='text-2xl' /> :
                        <GiHamburgerMenu className='text-xl' />
                    }
                    </button>
                </div>
                {toggleNav &&
                    <div className='flex-3'>
                        <ul className='flex flex-col items-center justify-end gap-5'>
                            <li className={`font-medium hover:text-teal-700 hover:border-b hover:border-teal-700 pb-2 cursor-pointer`}
                                onClick={() => smoothScrollTo('home')}>
                                Home
                            </li>
                            <li className='font-medium hover:text-teal-700 hover:border-b hover:border-teal-700 pb-2 cursor-pointer'
                                onClick={() => smoothScrollTo('about')}>
                                About the Conference
                            </li>
                            <li className='font-medium hover:text-teal-700 hover:border-b hover:border-teal-700 pb-2 cursor-pointer'
                                onClick={() => smoothScrollTo('speakers')}>
                                Our Speakers
                            </li>
                            <li className='font-medium hover:text-teal-700 hover:border-b hover:border-teal-700 pb-2 cursor-pointer'
                                onClick={() => smoothScrollTo('package')}>
                                Attendance Tickets
                            </li>
                            <li className='font-medium rounded-md transition-al ease-in-out bg-teal-700 text-white hover:bg-gradient-to-br hover:from-teal-700 hover:to-green-800 hover:drop-shadow px-4 py-2 cursor-pointer'
                                onClick={() => smoothScrollTo('register')}>
                                Register
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </section>
        </>
    )
}