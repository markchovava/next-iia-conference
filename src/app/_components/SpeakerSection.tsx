import Image from 'next/image';
import React from 'react'

interface SpeakerSectionProps {
    name: string,
    title: string,
    company: string,
    img: string,
    description: React.ReactNode
    css: string,
}

const props = {
    name: "",
    title: "",
    company: "",
    img: "",
    description: <></>,
    css: "",
}


export default function SpeakerSection(props: SpeakerSectionProps) {
    const {name, title, company, img, description, css} = props;

  return (
    <section className="">
        <div className={`mx-auto w-[92%] ${css} items-start justify-start gap-8`}>
        <div className="lg:w-[40%] w-[92%]">
            <div className="w-[100%] rounded-2xl overflow-hidden aspect-[5/4] bg-gray-600 drop-shadow">
            <div className="relative w-[100%] h-[100%]">
                <Image
                src={img}
                alt={name}
                width={800}
                height={700}
                className="w-full h-full object-cover"
                />
            </div>
            </div>
        </div>
        <div className="lg:w-[60%] w-[100%]">
            <div className='h-[1rem]' />
            <h2 className="text-[2rem] mb-2 font-serif leading-tight">
                {name} - {title && <span>{title}</span>}
            </h2>
            {company &&
            <h3 className='mb-2 font-medium'>{company}</h3>
            }
            <div className="text-md font-light">
            {description}
            </div>
        </div>
        </div>
    </section>
  )
}
