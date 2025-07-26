import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { FaMapLocation, FaPhone } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";


export default function FooterArea() {
  return (
    <>
    <section className="w-full bg-teal-950 text-gray-300 border-t border-gray-700 pt-[3rem]">
        <div className="mx-auto w-[92%] grid lg:grid-cols-3 grid-cols-1 gap-8 lg:gap-4 pb-[3rem]">
            <div>
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
            <div>
                <h3 className='font-semibold font-serif text-[2rem] mb-2'>Venue</h3>
                <div className='flex items-center justify-start gap-2 mb-4'>
                    <p><FaMapLocation className='text-[2rem]' /></p>
                    <p className='text-lg'>
                        Elephant Hills, Victoria Falls</p>
                </div>
                <div className='flex items-center justify-start gap-2'>
                    <p><MdOutlineDateRange className='text-[2rem]' /></p>
                    <p className='text-lg'>
                        9 - 13 September 2025</p>
                </div>

            </div>

            <div>
                <h3 className='font-semibold font-serif text-[2rem] mb-2'>Contacts Details</h3>
                <div className='flex items-center justify-start gap-2 mb-6'>
                    <p><FaPhone className='text-[2rem]' /></p>
                    <p className='text-lg'>
                        +263 774 163667, +263 8677 111207, +263 242 313286/7</p>

                </div>
                <div className='flex items-center justify-start'>
                    <Link href="#register">
                        <button className='font-medium rounded-md transition-al ease-in-out bg-teal-700 text-white hover:bg-gradient-to-br hover:from-teal-700 hover:to-teal-900 hover:drop-shadow px-6 py-3'>
                        Register</button>
                    </Link>
                </div>
            </div>
        </div>

        <div className='w-[92%] mx-auto pb-[1rem] text-gray-100 flex lg:flex-row flex-col lg:items-center items-start lg:justify-between justify-start gap-6 font-light text-sm'>
            <ul className='flex lg:flex-row flex-col lg:items-center justify-start gap-3'>
                <Link href='#' className='hover:underline ease-linear transition-all duration-150'>
                    <li>Privacy</li>
                </Link>
                <li className='hidden lg:inline'>|</li>
                <Link href='#' className='hover:underline ease-linear transition-all duration-150'>
                    <li>Terms of Use</li>
                </Link>
                <li className='hidden lg:inline'>|</li>
                <Link href='#' className='hover:underline ease-linear transition-all duration-150'>
                    <li>Accessibility</li>
                </Link>
                <li className='hidden lg:inline'>|</li>
                <Link href='#' className='hover:underline ease-linear transition-all duration-150'>
                    <li>Cookies Policy</li>
                </Link>
            </ul>
            <p className='leading-tight'>
                &copy; {new Date().getFullYear()} IIA Conference. All rights reserved.
            </p>
        </div>

    </section>
    </>
  )
}
