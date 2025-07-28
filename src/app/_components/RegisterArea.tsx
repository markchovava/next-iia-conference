"use client"
import React, { useState } from 'react'
import emailjs from '@emailjs/browser';
import { fullFormattedDate } from "@/_utils/formatDate";
import { reactToastifyDark } from "@/_utils/reactToastify";
import { toast } from 'react-toastify';

interface RegData {
    name: string
    phone: string
    email: string
    gender: string
    occupation: string
    created?: object
    updated?: object
}

interface ValidationErrors {
    name?: string
    phone?: string
    email?: string
    gender?: string
    occupation?: string
    general?: string
}

const DataInput: RegData = {
    name: '',
    phone: '',
    email: '',
    gender: '',
    occupation: '',
    created: {},
    updated: {},
}

const currentDate = new Date();

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Phone validation regex (supports various formats)
const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

export default function RegisterArea() {
    const [data, setData] = useState<RegData>(DataInput)
    const [errors, setErrors] = useState<ValidationErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        setData(prev => ({ ...prev, [name]: value }));
        
        // Clear error for this field when user starts typing
        if (errors[name as keyof ValidationErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    }

    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};

        // Name validation
        if (!data.name?.trim()) {
            newErrors.name = "Full name is required.";
        } else if (data.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters long.";
        } else if (data.name.trim().length > 50) {
            newErrors.name = "Name must be less than 50 characters.";
        }

        // Phone validation
        if (!data.phone?.trim()) {
            newErrors.phone = "Phone number is required.";
        }

        // Email validation
        if (!data.email?.trim()) {
            newErrors.email = "Email address is required.";
        } else if (!EMAIL_REGEX.test(data.email.trim())) {
            newErrors.email = "Please enter a valid email address.";
        }

        // Occupation validation
        if (!data.occupation?.trim()) {
            newErrors.occupation = "Occupation is required.";
        } else if (data.occupation.trim().length < 2) {
            newErrors.occupation = "Occupation must be at least 2 characters long.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const resetForm = () => {
        setData(DataInput);
        setErrors({});
        setSubmitSuccess(false);
    }

    const postData = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isSubmitting) return; // Prevent double submission
        
        setIsSubmitting(true);
        setErrors({}); // Clear previous errors
        
        try {
            // Validate form
            if (!validateForm()) {
                setIsSubmitting(false);
                return;
            }

            const body = `
                Name: ${data.name.trim()}
                Phone: ${data.phone.trim()}
                Email: ${data.email.trim()}
                Occupation: ${data.occupation.trim()}
            `.trim();

            const emailData = {
                title: "ATTENDANCE INQUIRY",
                name: data.name.trim(),
                time: fullFormattedDate(currentDate),
                message: body,
                email: data.email.trim(),
            };

            const response = await emailjs.send(
                "service_womx366",
                "template_f4lq602",
                emailData,
                'YO9ODOGz2tC6xxXM4'
            );

            if (response.status === 200) {
                const successMessage = "Sent successful! We will contact you very soon.";
                toast.success(successMessage, reactToastifyDark);
                setSubmitSuccess(true);
                resetForm();
                console.log('Email sent successfully:', response);
            } else {
                throw new Error(`Email service returned status: ${response.status}`);
            }

        } catch (error) {
            console.error('Registration error:', error);
            
            let errorMessage = "Something went wrong. Please try again.";
            
            // Handle specific error types
            if (error instanceof Error) {
                if (error.message.includes('network') || error.message.includes('fetch')) {
                    errorMessage = "Network error. Please check your connection and try again.";
                } else if (error.message.includes('429')) {
                    errorMessage = "Too many requests. Please wait a moment and try again.";
                } else if (error.message.includes('400')) {
                    errorMessage = "Invalid data submitted. Please check your information.";
                }
            }
            
            setErrors({ general: errorMessage });
            toast.error(errorMessage, reactToastifyDark);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section id="register" className='w-full bg-teal-950 text-gray-300 pt-[4rem] pb-[6rem]'>
            <div className='mx-auto lg:w-[60%] w-[92%]'>
                <form onSubmit={postData} noValidate className='text-gray-200'>
                    <div className='flex flex-col items-center justify-center mb-8'>
                        <h1 className='font-extrabold text-[3rem] leading-[3rem] text-center text-gray-100 mb-2'>
                            ORDERING FORM
                        </h1>
                        <p className='text-sm mb-3 text-gray-400'>Kindly fill up the form and submit, we will contact you shortly.</p>
                        <hr className="w-[8rem] border-b border-8 border-teal-700" />
                    </div>

                    {/* Success Message */}
                    {submitSuccess && (
                        <div className='mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg'>
                            Registration submitted successfully! We'll be in touch soon.
                        </div>
                    )}

                    {/* General Error */}
                    {errors.general && (
                        <div className='mb-6 p-4 border border-red-400 text-red-700 rounded-lg'>
                            {errors.general}
                        </div>
                    )}

                    {/* FULL NAME */}
                    <div className='mb-6'>
                        <label htmlFor="name" className='mb-2 block'>
                            Full Name: <span className="text-red-400">*</span>
                        </label>
                        <input 
                            id="name"
                            type='text'
                            name='name' 
                            value={data.name}
                            onChange={handleInput}
                            disabled={isSubmitting}
                            placeholder='Enter Full Name...' 
                            className={`w-[100%] outline-none border rounded-lg px-5 py-3  disabled:cursor-not-allowed ${
                                errors.name ? 'border-red-400 bg-red-50' : 'border-gray-400'
                            }`}
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name && (
                            <p id="name-error" className='text-sm text-red-500 mt-1' role="alert">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* PHONE AND EMAIL */}
                    <div className='mb-6 grid lg:grid-cols-2 grid-cols-1 gap-4'>
                        <div className='w-[100%]'>
                            <label htmlFor="phone" className='mb-2 block'>
                                Phone Number: <span className="text-red-400">*</span>
                            </label>
                            <input 
                                id="phone"
                                type='tel'
                                name='phone'
                                value={data.phone}
                                onChange={handleInput}
                                disabled={isSubmitting}
                                placeholder='Enter Phone Number...' 
                                className={`w-[100%] outline-none border rounded-lg px-5 py-3   disabled:cursor-not-allowed ${
                                    errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-400'
                                }`}
                                aria-invalid={!!errors.phone}
                                aria-describedby={errors.phone ? "phone-error" : undefined}
                            />
                            {errors.phone && (
                                <p id="phone-error" className='text-sm text-red-500 mt-1' role="alert">
                                    {errors.phone}
                                </p>
                            )}
                        </div>
                        <div className='w-[100%]'>
                            <label htmlFor="email" className='mb-2 block'>
                                Email: <span className="text-red-400">*</span>
                            </label>
                            <input 
                                id="email"
                                type='email'
                                name='email' 
                                value={data.email}
                                onChange={handleInput}
                                disabled={isSubmitting}
                                placeholder='Enter Email...' 
                                className={`w-[100%] outline-none border rounded-lg px-5 py-3   disabled:cursor-not-allowed ${
                                    errors.email ? 'border-red-400 bg-red-50' : 'border-gray-400'
                                }`}
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? "email-error" : undefined}
                            />
                            {errors.email && (
                                <p id="email-error" className='text-sm text-red-500 mt-1' role="alert">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                    </div>


                    {/* OCCUPATION */}
                    <div className='w-[100%] mb-6'>
                        <label htmlFor="occupation" className='mb-2 block'>
                            Occupation: <span className="text-red-400">*</span>
                        </label>
                        <input 
                            id="occupation"
                            type='text'
                            name='occupation' 
                            value={data.occupation}
                            onChange={handleInput}
                            disabled={isSubmitting}
                            placeholder='Enter Occupation...' 
                            className={`w-[100%] outline-none border rounded-lg px-5 py-3   disabled:cursor-not-allowed ${
                                errors.occupation ? 'border-red-400 bg-red-50' : 'border-gray-400'
                            }`}
                            aria-invalid={!!errors.occupation}
                            aria-describedby={errors.occupation ? "occupation-error" : undefined}
                        />
                        {errors.occupation && (
                            <p id="occupation-error" className='text-sm text-red-500 mt-1' role="alert">
                                {errors.occupation}
                            </p>
                        )}
                    </div>
                    
                    {/* SUBMIT BUTTON */}
                    <div className='w-[100%] mb-2'>
                        <button 
                            type='submit' 
                            disabled={isSubmitting}
                            className={`border border-gray-400 w-[100%] transition-all ease-in-out duration-200 py-3 rounded-lg bg-gradient-to-br from-teal-700 to-teal-800 hover:text-gray-50 hover:bg-gradient-to-br hover:from-teal-700 hover:to-teal-900 hover:drop-shadow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-teal-700 disabled:hover:to-teal-800`}
                        >
                            {isSubmitting ? (
                                <div className='flex gap-2 items-center justify-center'>
                                    <svg 
                                        aria-hidden="true" 
                                        className="w-4 h-4 text-gray-200 animate-spin dark:text-slate-300 fill-teal-950" 
                                        viewBox="0 0 100 101" 
                                        fill="none" 
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C0 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span>Submitting...</span> 
                                </div>
                            ) : (
                                "Order Ticket"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}