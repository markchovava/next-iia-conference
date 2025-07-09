"use client"
import React, { useState } from 'react'


interface RegData {
    name: string
    phone: string
    email: string
    gender: string
    occupation: string
    created: object
    updated: object
}

const DataInput = {
        name: '',
        phone: '',
        email: '',
        gender: '',
        occupation: '',
        created: {},
        updated: {}
    }


export default function RegisterArea() {
    const [data, setData] = useState<RegData>(DataInput)
    const [errMsg, setErrMsg] = useState(DataInput)
    const [isSubmit, setIsSubmit] = useState(false)

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setData({...data, [e.target.name]: e.target.value })
    }

    function postData(){
        setErrMsg(DataInput)
        setTimeout(() => {
            console.log("Delayed by 2 seconds");
            if(!data.name){
                const message = "Name is required."
                setErrMsg(prev => ({...prev, name: message}))
                setIsSubmit(false)
                return
            }
            if(!data.phone){
                const message = "Phone Number is required."
                setErrMsg(prev => ({...prev, phone: message})) // Fix: use 'phone' not 'name'
                setIsSubmit(false)
                return
            }
            if(!data.email){
                const message = "Email is required."
                setErrMsg(prev => ({...prev, email: message})) // Fix: use 'email' not 'name'
                setIsSubmit(false)
                return
            }
            if(!data.occupation){
                const message = "Occupation is required."
                setErrMsg(prev => ({...prev, occupation: message}))
                setIsSubmit(false)
                return
            }
             if(!data.gender){
                const message = "Gender is required."
                setErrMsg(prev => ({...prev, gender: message}))
                setIsSubmit(false)
                return
            }
    
            const formData = {
                name: data?.name,
                phone: data?.phone,
                email: data?.email,
                occupation: data?.occupation,
                gender: data?.gender
            }
    
            console.log('formData', formData)
        }, 2000);
    }


  return (
    <section id="register" className='w-full bg-teal-950 text-gray-300 pt-[4rem] pb-[6rem]'>
        <div className='mx-auto lg:w-[60%] w-[92%]'>
            <form action={postData} onSubmit={() => setIsSubmit(true)}>
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
                        value={data.name}
                        onChange={handleInput} 
                        placeholder='Enter Full Name...' 
                        className='w-[100%] outline-none border border-gray-400 rounded-lg px-5 py-3' />
                    {errMsg.name && 
                    <p className='text-sm text-red-500'>{errMsg.name}</p>}
                </div>
                {/*  */}
                <div className='mb-8 grid lg:grid-cols-2 grid-cols-1 gap-4'>
                    <div className='w-[100%]'>
                        <p className='mb-2'>Phone Number:</p>
                        <input 
                            type='text'
                            name='phone'
                            value={data.phone}
                            onChange={handleInput} 
                            placeholder='Enter Phone Number...' 
                            className='w-[100%] outline-none border border-gray-400 rounded-lg px-5 py-3' />
                        {errMsg.phone && 
                            <p className='text-sm text-red-500'>{errMsg.phone}</p>}
                    </div>
                    <div className='w-[100%]'>
                        <p className='mb-2'>Email:</p>
                        <input 
                            type='text'
                            name='email' 
                            value={data.email}
                            onChange={handleInput} 
                            placeholder='Enter Email...' 
                            className='w-[100%] outline-none border border-gray-400 rounded-lg px-5 py-3' />
                        {errMsg.email && 
                            <p className='text-sm text-red-500'>{errMsg.email}</p>}
                    </div>
                </div>
                {/*  */}
                <div className='mb-8 grid lg:grid-cols-2 grid-cols-1 gap-4'>
                    <div className='w-[100%]'>
                        <p className='mb-2'>Gender:</p>
                        <select
                            name='gender' 
                            value={data.gender}
                            onChange={handleInput} 
                            className='transparent-select w-[100%] outline-none border border-gray-400 rounded-lg px-5 py-3'>
                                <option  value="">Select Gender</option>
                                <option  value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                        </select>
                        {errMsg.gender && 
                            <p className='text-sm text-red-500'>{errMsg.gender}</p>}
                    </div>
                    <div className='w-[100%]'>
                        <p className='mb-2'>Occupation:</p>
                        <input 
                            type='text'
                            name='occupation' 
                            value={data.occupation}
                            onChange={handleInput} 
                            placeholder='Enter Occupation...' 
                            className='w-[100%] outline-none border border-gray-400 rounded-lg px-5 py-3' />
                        {errMsg.occupation && 
                            <p className='text-sm text-red-500'>{errMsg.occupation}</p>}
                    </div>
                </div>

                <div className='w-[100%]'>
                    <button type='submit' className=' border border-gray-400 cursor-pointer w-[100%] transition-all ease-in-out duration-200 py-3 rounded-lg bg-gradient-to-br from-teal-700 to-teal-800 hover:text-gray-50 hover:bg-gradient-to-br hover:from-teal-700 hover:to-teal-900 hover:drop-shadow'>
                        {isSubmit ?
                        <>
                        <div className='flex gap-2 items-center justify-center'>
                            <svg aria-hidden="true" 
                                className="w-4 h-4 text-gray-200 animate-spin dark:text-slate-300 fill-teal-950" 
                                viewBox="0 0 100 101" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span>Processing...</span> 

                        </div>
                        </> 
                        : 
                        "Register to Attend"}
                    </button>
                </div>
            </form>
        </div>
    </section>
  )
}
