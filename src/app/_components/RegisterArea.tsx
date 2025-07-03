"use client"
import React from 'react'


export default function RegisterArea() {
  return (
    <section id="register" className='w-full bg-teal-950 text-gray-300 pt-[4rem] pb-[6rem]'>
        <div className='mx-auto lg:w-[60%] w-[92%]'>
            <div className='flex flex-col items-center justify-center mb-8'>
                <h1 className='font-extrabold text-[3rem] text-center text-gray-100 mb-2'>
                    Registration Form</h1>
                <hr className="w-[8rem] border-b border-8 border-teal-700" />
            </div> 
            {/* FULL NAME */}
            <div className='mb-8'>
                <p className='mb-2'>Full Name:</p>
                <input 
                    type='text'
                    name='name' 
                    placeholder='Enter Full Name...' 
                    className='w-[100%] outline-none border border-gray-400 rounded-lg px-5 py-3' />
            </div>
            {/*  */}
            <div className='mb-8 grid lg:grid-cols-2 grid-cols-1 gap-4'>
                <div className='w-[100%]'>
                    <p className='mb-2'>Phone Number:</p>
                    <input 
                        type='text'
                        name='phone' 
                        placeholder='Enter Phone Number...' 
                        className='w-[100%] outline-none border border-gray-400 rounded-lg px-5 py-3' />
                </div>
                <div className='w-[100%]'>
                    <p className='mb-2'>Email:</p>
                    <input 
                        type='text'
                        name='email' 
                        placeholder='Enter Email...' 
                        className='w-[100%] outline-none border border-gray-400 rounded-lg px-5 py-3' />
                </div>
            </div>
            {/*  */}
            <div className='mb-8 grid lg:grid-cols-2 grid-cols-1 gap-4'>
                <div className='w-[100%]'>
                    <p className='mb-2'>Gender:</p>
                    <input 
                        type='text'
                        name='gender' 
                        placeholder='Enter Gender...' 
                        className='w-[100%] outline-none border border-gray-400 rounded-lg px-5 py-3' />
                </div>
                <div className='w-[100%]'>
                    <p className='mb-2'>Occupation:</p>
                    <input 
                        type='text'
                        name='occupation' 
                        placeholder='Enter Occupation...' 
                        className='w-[100%] outline-none border border-gray-400 rounded-lg px-5 py-3' />
                </div>
            </div>

            <div className='w-[100%]'>
                <button className=' border border-gray-400 cursor-pointer w-[100%] transition-all ease-in-out duration-200 py-3 rounded-lg bg-gradient-to-br from-teal-700 to-teal-800 hover:text-gray-50 hover:bg-gradient-to-br hover:from-teal-700 hover:to-teal-900 hover:drop-shadow'>
                    Register to Attend</button>
            </div>
        </div>
    </section>
  )
}
