import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedin, FaMapLocationDot, FaXTwitter } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'



export default function TopArea() {

    
  return (
    <>
   <section className='w-full border-b border-gray-100 md:py-3 py-4'>
           <div className=' w-[92%] mx-auto flex md:flex-row  items-center justify-between gap-2'>
               {/*  */}
               <div className='flex flex-row items-center justify-start md:gap-3 gap-1 text-sm'>
                   <div className='flex items-center justify-start gap-1'>
                       <FaMapLocationDot className='text-teal-900 text-md' />
                       <span>Cnr Adylinn/Marlborough Drive, Marlborough, Harare, Zimbabwe</span>
                   </div>
                   <div className='flex items-center justify-start gap-1'>
                       <MdEmail className='text-teal-900 text-md' />
                       <span>marketing@iiazim.co.zw</span>
                   </div>
               </div>
               {/*  */}
               <div className='flex items-center md:justify-between gap-2'>
                   <Link href="https://www.facebook.com/iiazim" 
                   className='bg-blue-900 p-1 rounded-full hover:scale-110 transition-all ease-in-out duration-200'>
                       <FaFacebookF className='text-white text-sm' />
                   </Link>
                  
                   <Link href="https://www.instagram.com/iia.zim" className='bg-pink-500 p-1 rounded-full hover:scale-110 transition-all ease-in-out duration-200'>
                       <FaInstagram className='text-white text-sm' />
                   </Link>                              
                   <Link 
                   href="https://www.linkedin.com/company/institute-of-internal-auditors-zimbabwe/" 
                    className='bg-blue-700 p-1 rounded-full hover:scale-110 transition-all ease-in-out duration-200'>
                       <FaLinkedin className='text-white text-sm' />
                   </Link>                              
                             
               </div>
           </div>
       </section>
    </>
  )
}
