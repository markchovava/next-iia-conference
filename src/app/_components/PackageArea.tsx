
"use client"
import { PackagesData } from '@/_data/PackagesData'
import { useOrderStore } from '@/_store/useOrderStore';
import Link from 'next/link'
import React from 'react'

export default function PackageArea() {
    const { setData } = useOrderStore();



  return (
    <section id="package" className='w-full pt-[4rem] pb-[5rem] bg-gray-50'>

        <div className='flex flex-col items-center justify-center mb-6'>
            <h1 className="font-extrabold text-[3rem] font-serif">Our Packages</h1>
            <hr className="w-[8rem] border-b border-8 border-teal-900" />
        </div>
       
        
        <div className="mx-auto w-[92%] grid lg:grid-cols-3 grid-cols-1 gap-8">
            {PackagesData.map((i, key) => (
                <div key={key} className='bg-white drop-shadow-lg rounded-2xl overflow-hidden'>
                    <h2 className='font-serif font-extrabold bg-teal-900 text-gray-100 text-center text-xl mb-2 py-4 px-4'>
                        {i.title}
                    </h2>
                    <ul className='px-3 font-light flex flex-col items-center justify-center gap-2 py-3 border-b border-gray-300 mb-3'>
                        <li>
                            <span className='mr-1'>Members: </span>
                            <span className="font-bold">{i.member}</span>
                        </li>
                        <li>
                            <span className='mr-1'>Non-Members: </span>
                            <span className="font-bold">{i.nonMember}</span>
                        </li>
                    </ul>
                    <div className='flex items-center justify-center pb-6'>
                        <Link href='#register'>
                        <button onClick={() => setData('package', i.title)}  className='px-8 py-3 cursor-pointer rounded-xl text-gray-300 bg-gradient-to-br from-teal-600 to-teal-950 hover:drop-shadow-lg hover:bg-gradient-to-br hover:from-teal-700 hover:to-teal-950'>
                            Order Ticket Now</button>
                        </Link>
                    </div>
                </div>
            ))}

          

        </div>
    </section>
  )
}
