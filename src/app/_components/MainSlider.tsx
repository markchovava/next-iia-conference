"use client"
import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Link from 'next/link';

const slideData = [
  {
    id: 1,
    image: '/assets/img/01.png',
    title: 'Welcome to our Conference Website',
    description: 'Register Now and Secure Your Future in Internal Audit!',
    ctaText: 'Register Now'
  },
  {
    id: 2,
    image: '/assets/img/02.png',
    title: 'Connect, Collaborate, Conquer',
    description: 'The Premier Internal Audit Conference in Zimbabwe.',
    ctaText: 'Register Now'
  },
  {
    id: 3,
    image: '/assets/img/03.png',
    title: 'We are excited to hear from you',
    description: 'Talk to us.',
    ctaText: 'Contact Us'
  },
];

// Text animation variants
const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: custom * 1,
      duration: 1,
      ease: "easeOut"
    }
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 1 } }
};

export default function MainSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  // Handle server-side rendering compatibility
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Custom navigation buttons
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  
  if (!isClient) {
    // Return a placeholder during server-side rendering
    return <div className="w-full h-[600px] bg-gray-200 animate-pulse relative" />;
  }

  return (
    <div 
      className="relative w-full lg:h-[500px] h-[360px] overflow-hidden" >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true,
          renderBullet: function (index, className) {
            return `
            <div className="hidden">
            <span class="${className} w-3 h-3 bg-white bg-opacity-50 rounded-full transition-all duration-300" style="margin: 0 5px;"></span>
            </div>
            `;
          }
        }}
        loop={true}
        speed={2000}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onSwiper={(swiper) => {
          // Update swiper instances after mounting
          setTimeout(() => {
            if (navigationPrevRef.current && navigationNextRef.current) {
              if (swiper.params.navigation && typeof swiper.params.navigation === 'object') {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }
            }
          });
        }}
        className="w-full h-full"
      >
        {slideData.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Image Background */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black opacity-10" /> 
            </div>
            
            {/* Text Content */}
            <AnimatePresence mode="wait">
              {activeIndex === slideData.indexOf(slide) && (
                <div className="absolute inset-0 flex flex-col justify-center items-start p-12 z-10 text-white">
                  <motion.h2
                    custom={0}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-4xl md:text-5xl font-bold mb-4"
                  >
                    {slide.title}
                  </motion.h2>
                  
                  <motion.p
                    custom={1}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-xl md:text-2xl mb-8 max-w-lg"
                  >
                    {slide.description}
                  </motion.p>
                  
                  <Link href="#register">
                      <motion.button
                        custom={2}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="cursor-pointer flex px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-opacity-90 hover:scale-110 transition-all ease-in-out duration-300"
                      >
                        {slide.ctaText}
                      </motion.button>
                  </Link>
                </div>
              )}
            </AnimatePresence>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Navigation Buttons */}
      <div className="absolute bottom-16 right-12 z-20 flex space-x-4">
        <button
          ref={navigationPrevRef}
          className="group cursor-pointer w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center backdrop-blur-sm hover:bg-opacity-30 transition-all duration-300"
          aria-label="Previous slide"
        >
          <FaAngleLeft className="w-5 h-5 text-black group-hover:scale-125 ease-in-out transition-all duration-300" />
        </button>
        <button
          ref={navigationNextRef}
          className="group cursor-pointer w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center backdrop-blur-sm hover:bg-opacity-30 transition-all duration-300"
          aria-label="Next slide"
        >
          <FaAngleRight className="w-5 h-5 text-black group-hover:scale-125 ease-in-out transition-all duration-300" />
        </button>
      </div>
      
      {/* Slide indicator showing current slide / total slides */}
      <div className="absolute top-12 right-12 z-20 bg-black bg-opacity-30 backdrop-blur-sm rounded-full px-4 py-2 text-white font-medium">
        {activeIndex + 1} / {slideData.length}
      </div>
    </div>
  );
};