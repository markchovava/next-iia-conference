import Image from "next/image";
import MainSlider from "./_components/MainSlider";
import CarouselSpeakers from "./_components/CarouselSpeakers";
import RegisterArea from "./_components/RegisterArea";
import PackageArea from "./_components/PackageArea";



export default function Home() {
  return (
   <>
   <MainSlider />

   <section id="about" className="py-[6rem] bg-teal-950 text-gray-200">
    <div className="mx-auto w-[82%]">
      <h1 className="text-center font-bold text-[3rem] uppercase mb-4 font-serif">
        Connect, Collaborate, Conquer</h1>
      <p className="font-light text-[1.8rem] text-center">
        Join leading internal audit professionals at our Annual Conference to sharpen your 
        skills, explore cutting-edge methodologies, and master the strategies that will define 
        the future of our profession. Gain actionable insights, expand your network, and ensure 
        your audit function remains indispensable in an evolving landscape.
      </p>
    </div>
   </section>


    <section id="speakers" className="w-full flex flex-col gap-4 items-center justify-center pt-[5rem]">
      <h1 className="font-extrabold text-[3rem] font-serif">Main Speakers</h1>
      <hr className="w-[8rem] border-b border-8 border-teal-900" />
    </section>

    {/* SPEAKER */}
    <section  className="pb-[5rem] pt-[3rem]">
      <div className="mx-auto w-[92%] flex md:flex-row flex-col items-center justify-start gap-8">
        <div className="lg:w-[40%] w-[92%]">
          <div className="w-[100%] rounded-2xl overflow-hidden aspect-[4/3] bg-gray-600">
            <div className="relative w-[100%] h-[100%]">
              <Image
                src="/assets/img/4by3/01.png"
                alt="Full Cover Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        <div className="lg:w-[60%] w-[100%]">
          <h2 className="text-[2rem] mb-3 font-serif">Dr. J. P. Konangale</h2>
          <p className="text-md font-light">
            Dr. J. P. Konangale is a highly accomplished and results-driven internal audit 
            professional with 15 years of progressive experience in risk management, compliance, 
            and operational excellence. Holding a Ph.D. in Accounting, 
            Finance and Business Administration, Dr. J. P. Konangale brings a unique blend of deep 
            academic understanding and extensive practical expertise to complex audit challenges. 
            They possess a proven track record of leading high-performing audit teams, developing 
            robust audit methodologies, and delivering strategic insights that drive business value 
            and mitigate organizational risk.
          </p>
        </div>
      </div>
    </section>

    {/* SPEAKER */}
    <section className="pb-[5rem] ">
      <div className="mx-auto w-[92%] flex md:flex-row flex-col items-center justify-start gap-8">
        <div className="lg:w-[60%] w-[100%]">
          <h2 className="text-[2rem] mb-3 font-serif">Dr. J. P. Konangale</h2>
          <p className="text-md font-light">
            Dr. J. P. Konangale is a highly accomplished and results-driven internal audit 
            professional with 15 years of progressive experience in risk management, compliance, 
            and operational excellence. Holding a Ph.D. in Accounting, 
            Finance and Business Administration, Dr. J. P. Konangale brings a unique blend of deep 
            academic understanding and extensive practical expertise to complex audit challenges. 
            They possess a proven track record of leading high-performing audit teams, developing 
            robust audit methodologies, and delivering strategic insights that drive business value 
            and mitigate organizational risk.
          </p>
        </div>
        <div className="lg:w-[40%] w-[92%]">
          <div className="w-[100%] rounded-2xl overflow-hidden aspect-[4/3] bg-gray-600">
            <div className="relative w-[100%] h-[100%]">
              <Image
                src="/assets/img/4by3/02.png"
                alt="Full Cover Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* OTHER SPEAKERS */}
    <section className="w-full bg-gray-50 flex flex-col gap-4 items-center justify-center pt-[3rem] pb-[2rem]">
      <h1 className="font-extrabold text-[3rem] font-serif">Other Speakers</h1>
      <hr className="w-[8rem] border-b border-8 border-teal-900" />
    </section>

    <section className="pb-[5rem] bg-gray-50">
       <div className="mx-auto w-[92%]">
        <CarouselSpeakers />
       </div>
    </section>

    <RegisterArea />

    <PackageArea />



   </>
  );
}
