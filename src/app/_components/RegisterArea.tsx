"use client"
import React, { useState } from 'react'
import emailjs from '@emailjs/browser';
import { fullFormattedDate } from "@/_utils/formatDate";
import { reactToastifyDark } from "@/_utils/reactToastify";
import { toast } from 'react-toastify';
import { MembershipData } from '@/_data/sample/MembershipData';
import { ShirtSizeData } from '@/_data/sample/ShirtSizeData';
import { useOrderStore } from '@/_store/useOrderStore';
import { OrderInterface } from '@/_data/OrderData';
import { PackagesData } from '@/_data/PackagesData';





const currentDate = new Date();

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Phone validation regex (supports various formats)
const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

export default function RegisterArea() {
    const { data, setData, resetData } = useOrderStore();
    const [errors, setErrors] = useState<OrderInterface>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(name as keyof OrderInterface, value);
        if (errors[name as keyof OrderInterface]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: OrderInterface = {};

        // First Name validation
        if (!data.firstName?.trim()) {
            newErrors.firstName = "First Name is required.";
        } else if (data.firstName.trim().length < 2) {
            newErrors.firstName = "First Name must be at least 2 characters long.";
        } else if (data.firstName.trim().length > 50) {
            newErrors.firstName = "First Name must be less than 50 characters.";
        }

         // Last Name validation
        if (!data.lastName?.trim()) {
            newErrors.lastName = "Last Name is required.";
        } else if (data.lastName.trim().length < 2) {
            newErrors.lastName = "Last Name must be at least 2 characters long.";
        } else if (data.lastName.trim().length > 50) {
            newErrors.lastName = "Last Name must be less than 50 characters.";
        }

        // Phone validation
        if (!data.phone?.trim()) {
            newErrors.phone = "Phone number is required.";
        } else if (!PHONE_REGEX.test(data.phone.trim())) {
            newErrors.phone = "Please enter a valid phone number.";
        }

        // Email validation
        if (!data.email?.trim()) {
            newErrors.email = "Email address is required.";
        } else if (!EMAIL_REGEX.test(data.email.trim())) {
            newErrors.email = "Please enter a valid email address.";
        }

        // Organization validation
        if (!data.organization?.trim()) {
            newErrors.organization = "Organization is required.";
        } else if (data.organization.trim().length < 2) {
            newErrors.organization = "Organization must be at least 2 characters long.";
        }

        // Membership Status validation
        if (!data.membershipStatus?.trim()) {
            newErrors.membershipStatus = "Membership status is required.";
        }

         // Gender validation
        if (!data.gender?.trim()) {
            newErrors.gender = "Gender is required.";
        }

        // Shirt Size validation
        if (!data.shirtSize?.trim()) {
            newErrors.shirtSize = "Shirt size is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const resetForm = () => {
        resetData();
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
                First Name: ${data.firstName.trim() ?? ''}
                Last Name: ${data.lastName.trim()}
                Phone: ${data.phone.trim()}
                Email: ${data.email.trim()}
                Organization: ${data.organization.trim()}
                Membership Status: ${data.membershipStatus?.trim() || ''}
                Gender: ${data.gender?.trim()}
                Shirt Size: ${data.shirtSize?.trim() || ''}
                Package:  ${data.package?.trim()}
            `.trim();

            const emailData = {
                title: "ATTENDANCE TICKET REQUEST",
                name: `${data.firstName.trim()} ${data.lastName.trim()}`,
                time: fullFormattedDate(currentDate),
                message: body,
                email: data.email.trim(),
            };

            console.log('emailData', data)
            setSubmitSuccess(true);

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
                            ORDER TICKET FORM
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


                    {/* PACKAGES */}
                    <div className='w-[100%] mb-6'>
                        <label htmlFor="package" className='mb-2 block'>
                            Package: <span className="text-red-400">*</span>
                        </label>
                        <select 
                            id="package"
                            name='package'
                            value={data.package}
                            onChange={handleInput}
                            disabled={isSubmitting}
                            className={`w-[100%] outline-none border rounded-lg px-5 py-3 text-gray-500 disabled:cursor-not-allowed ${
                                errors.package ? 'border-red-400 bg-red-50' : 'border-gray-400'
                            }`}
                            aria-invalid={!!errors.package}
                            aria-describedby={errors.package ? "package-error" : undefined} >
                                <option value="">Package...</option>
                                { PackagesData.map((i, key) => (
                                    <option key={key} value={i.title}>{i.title}</option>
                                )) }
                        </select>
                        {errors.package && (
                            <p id="shirtSize-error" className='text-sm text-red-500 mt-1' role="alert">
                                {errors.package}
                            </p>
                        )}
                    </div>

                    {/* FULL NAME */}
                    <div className='mb-6 grid grid-cols-2 gap-4'>
                        <div className=''>
                            <label htmlFor="firstName" className='mb-2 block'>
                                First Name: <span className="text-red-400">*</span>
                            </label>
                            <input 
                                id="firstName"
                                type='text'
                                name='firstName' 
                                value={data.firstName}
                                onChange={handleInput}
                                disabled={isSubmitting}
                                placeholder='Full Name...' 
                                className={`w-[100%] outline-none border rounded-lg px-5 py-3 text-gray-400 disabled:cursor-not-allowed ${
                                    errors.firstName ? 'border-red-400 bg-red-50' : 'border-gray-400'
                                }`}
                                aria-invalid={!!errors.firstName}
                                aria-describedby={errors.firstName ? "firstName-error" : undefined}
                            />
                            {errors.firstName && (
                                <p id="firstName-error" className='text-sm text-red-500 mt-1' role="alert">
                                    {errors.firstName}
                                </p>
                            )}
                        </div>

                        <div className=''>
                            <label htmlFor="lastName" className='mb-2 block'>
                                Last Name: <span className="text-red-400">*</span>
                            </label>
                            <input 
                                id="lastName"
                                type='text'
                                name='lastName' 
                                value={data.lastName}
                                onChange={handleInput}
                                disabled={isSubmitting}
                                placeholder='Last Name...' 
                                className={`w-[100%] outline-none border rounded-lg px-5 py-3 text-gray-400 disabled:cursor-not-allowed ${
                                    errors.lastName ? 'border-red-400 bg-red-50' : 'border-gray-400'
                                }`}
                                aria-invalid={!!errors.lastName}
                                aria-describedby={errors.lastName ? "lastName-error" : undefined}
                            />
                            {errors.lastName && (
                                <p id="lastName-error" className='text-sm text-red-500 mt-1' role="alert">
                                    {errors.lastName}
                                </p>
                            )}
                        </div>

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
                                placeholder='Phone Number (eg. +263772123456)...' 
                                className={`w-[100%] outline-none border rounded-lg px-5 py-3 text-gray-400 disabled:cursor-not-allowed ${
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
                                placeholder='Email...' 
                                className={`w-[100%] outline-none border rounded-lg px-5 py-3 text-gray-400 disabled:cursor-not-allowed ${
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

                    {/* GENDER */}
                    <div className='w-[100%] mb-6'>
                        <label htmlFor="gender" className='mb-2 block'>
                            Gender: <span className="text-red-400">*</span>
                        </label>
                        <select 
                            id="gender"
                            name='gender'
                            value={data.gender}
                            onChange={handleInput}
                            disabled={isSubmitting}
                            className={`w-[100%] outline-none border rounded-lg px-5 py-3 text-gray-500 disabled:cursor-not-allowed ${
                                errors.gender ? 'border-red-400 bg-red-50' : 'border-gray-400'
                            }`}
                            aria-invalid={!!errors.gender}
                            aria-describedby={errors.gender ? "gender-error" : undefined}>
                            <option value="">Gender...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            
                        </select>
                        {errors.gender && (
                            <p id="gender-error" className='text-sm text-red-500 mt-1' role="alert">
                                {errors.gender}
                            </p>
                        )}
                    </div>


                    <div className='mb-6 grid grid-cols-2 gap-4'>
                         {/* MEMBERSHIP STATUS */}
                        <div className='w-[100%] '>
                            <label htmlFor="membershipStatus" className='mb-2 block'>
                                Membership Status: <span className="text-red-400">*</span>
                            </label>
                            <select 
                                id="membershipStatus"
                                name='membershipStatus'
                                value={data.membershipStatus}
                                onChange={handleInput}
                                disabled={isSubmitting}
                                className={`w-[100%] outline-none border rounded-lg px-5 py-3 text-gray-500 disabled:cursor-not-allowed ${
                                    errors.membershipStatus ? 'border-red-400 bg-red-50' : 'border-gray-400'
                                }`}
                                aria-invalid={!!errors.membershipStatus}
                                aria-describedby={errors.membershipStatus ? "membershipStatus-error" : undefined}
                            >
                                <option value="">Membership Status...</option>
                                {MembershipData.map((i, key) => (
                                    <option key={key} value={i.name}>{i.name}</option>
                                ))}
                            </select>
                            {errors.membershipStatus && (
                                <p id="membershipStatus-error" className='text-sm text-red-500 mt-1' role="alert">
                                    {errors.membershipStatus}
                                </p>
                            )}
                        </div>
                        {/* SHIRT SIZE */}
                        <div className='w-[100%]'>
                            <label htmlFor="shirtSize" className='mb-2 block'>
                                Shirt Size: <span className="text-red-400">*</span>
                            </label>
                            <select 
                                id="shirtSize"
                                name='shirtSize'
                                value={data.shirtSize}
                                onChange={handleInput}
                                disabled={isSubmitting}
                                className={`w-[100%] outline-none border rounded-lg px-5 py-3 text-gray-500 disabled:cursor-not-allowed ${
                                    errors.shirtSize ? 'border-red-400 bg-red-50' : 'border-gray-400'
                                }`}
                                aria-invalid={!!errors.shirtSize}
                                aria-describedby={errors.shirtSize ? "shirtSize-error" : undefined}
                            >
                                <option value="">Shirt Size...</option>
                                {ShirtSizeData.map((i, key) => (
                                    <option key={key} value={i.name}>{i.name}</option>
                                ))}
                            </select>
                            {errors.shirtSize && (
                                <p id="shirtSize-error" className='text-sm text-red-500 mt-1' role="alert">
                                    {errors.shirtSize}
                                </p>
                            )}
                        </div>

                    </div>


                    {/* ORGANIZATION */}
                    <div className='w-[100%] mb-6'>
                        <label htmlFor="organization" className='mb-2 block'>
                            Organization: <span className="text-red-400">*</span>
                        </label>
                        <input 
                            id="organization"
                            type='text'
                            name='organization' 
                            value={data.organization}
                            onChange={handleInput}
                            disabled={isSubmitting}
                            placeholder='Organization...' 
                            className={`w-[100%] outline-none border rounded-lg px-5 py-3 text-gray-400 disabled:cursor-not-allowed ${
                                errors.organization ? 'border-red-400 bg-red-50' : 'border-gray-400'
                            }`}
                            aria-invalid={!!errors.organization}
                            aria-describedby={errors.organization ? "organization-error" : undefined}
                        />
                        {errors.organization && (
                            <p id="organization-error" className='text-sm text-red-500 mt-1' role="alert">
                                {errors.organization}
                            </p>
                        )}
                    </div>

                    
                    {/* SUBMIT BUTTON */}
                    <div className='w-[100%] mt-4 mb-2'>
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