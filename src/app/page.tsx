import Image from "next/image";
import MainSlider from "./_components/MainSlider";
import CarouselSpeakers from "./_components/CarouselSpeakers";
import RegisterArea from "./_components/RegisterArea";
import PackageArea from "./_components/PackageArea";
import { Organisers } from "@/_data/Organisers";
import { Secretariat } from "@/_data/Secretariat";
import { SpeakersData } from "@/_data/Speakers";
import SpeakerSection from "./_components/SpeakerSection";



export default function Home() {
  return (
   <>
   <MainSlider />

   <section id="about" className="py-[6rem] bg-teal-950 text-gray-200">
    <div className="mx-auto w-[82%]">
      <h1 className="text-center font-bold text-[3rem] uppercase mb-4 font-serif">
        Elevate your game, Rise above the status quo.</h1>
      <p className="font-light text-[1.8rem] text-center">
        The 2025 Annual Conference will be held in
        the resort town of Victoria Falls from
        September 9th to 13th, 2025. This
        conference is the institute's premier annual
        event, and we value your partnership as you
        gain visibility and create awareness and gain
        visibility for your brand.
      </p>
    </div>
   </section>


    <section id="speakers" className="w-full flex flex-col gap-4 items-center justify-center pt-[5rem]">
      <h1 className="font-extrabold text-[3rem] font-serif">Main Speakers</h1>
      <hr className="w-[8rem] border-b border-8 border-teal-900" />
    </section>

    <div className="h-[8rem]" />

    {/* SPEAKER */}
    <SpeakerSection
      name={SpeakersData[0].name}
      title={SpeakersData[0].title}
      company={SpeakersData[0].company}
      img={SpeakersData[0].img}
      description={SpeakersData[0].description}
      css="flex md:flex-row flex-col"
    />

    <div className="h-[8rem]" />

    <SpeakerSection
      name={SpeakersData[1].name}
      title={SpeakersData[1].title}
      company={SpeakersData[1].company}
      img={SpeakersData[1].img}
      description={SpeakersData[1].description}
      css="flex md:flex-row-reverse flex-col"
    />

    <div className="h-[8rem]" />
   

    {/* Organising Committee */}
    <section className="w-full bg-gray-50 flex flex-col items-center justify-center">
        <div className="h-[3rem]" />
        <h1 className="font-extrabold text-[3rem] font-serif text-center px-3">Organising Committee</h1>
        <div className="h-[1rem]" />
        <hr className="w-[8rem] border-b border-8 border-teal-900" />
        <div className="h-[1rem]" />
        <div className="mx-auto w-[92%]">
          <CarouselSpeakers dbData={Organisers} />
        </div>
        <div className="h-[4rem]" />
    </section>


    {/* Secretariat */}
    <section className="w-full bg-white flex flex-col items-center justify-center pb-[2rem]">
        <div className="h-[3rem]" />
        <h1 className="font-extrabold text-[3rem] font-serif px-3">Secretariat</h1>
        <div className="h-[1rem]" />
        <hr className="w-[8rem] border-b border-8 border-teal-900" />
        <div className="h-[1rem]" />
        <div className="mx-auto w-[92%]">
          <CarouselSpeakers dbData={Secretariat} />
        </div>
        <div className="h-[4rem]" />
    </section>

   
    <RegisterArea />


    <PackageArea />



   </>
  );
}
