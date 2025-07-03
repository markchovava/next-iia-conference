import Link from 'next/link'
import React from 'react'
import { FaMapLocation } from "react-icons/fa6";

export default function FooterArea() {
  return (
    <>
    <section className="w-full bg-teal-950 text-gray-300 border-t border-gray-700 pt-[3rem]">
        <div className="mx-auto w-[92%] grid lg:grid-cols-3 grid-cols-1 gap-8 lg:gap-4 pb-[3rem]">
            <div>
                <Link href="/">
                <h1 className='text-[2rem] uppercase'>
                    <span className='mr-2 font-extrabold'>IIA</span>
                    <span className='text-teal-700 font-light'>Conference</span>
                </h1>
                </Link>
            </div>
            <div>
                <h3 className='font-semibold font-serif text-[2rem] mb-2'>Venue</h3>
                <div className='flex items-center justify-start gap-2'>
                    <p><FaMapLocation className='text-[2rem]' /></p>
                    <p className='text-lg'>1 First Street, Harare, Zimbabwe</p>
                </div>
            </div>

            <div className='flex items-center lg:justify-end justify-center'>
                 <Link href="#register">
                    <button className='font-medium rounded-md transition-al ease-in-out bg-teal-700 text-white hover:bg-gradient-to-br hover:from-teal-700 hover:to-teal-900 hover:drop-shadow px-6 py-3'>
                    Register</button>
                </Link>
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
