import { Button } from "@heroui/react";
import Link from "next/link";
import Image from 'next/image'
import Header from '@components/Header2'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="h-full">
      <Header></Header>
      <div className="text-center flex md:flex-row flex-col-reverse justify-center items-center h-full w-full md:px-[116px] px-[16px]md:my-0 my-[24px]">
        <div className="md:h-[100vh] w-[60%] flex flex-col justify-center md:items-start items-center">
          <h1 className="text-3xl md:text-5xl xl:text-7xl mb-4  font-bold md:text-left text-center text-text leading-[1.1]">Embark on your <span className="text-3xl md:text-5xl xl:text-7xl text-primary">pathway</span> to career success.</h1>
          <h2 className="mb-8 md:text-left text-center md:text-[14px] xl:text-[18px] w-[75%] text-[#777777]">Explore job listings, submit applications, and create connections that matter—all in one place.
          </h2>
          <Button className="bg-primary text-white font-semibold" as={Link} href="/register">
            Get Started
          </Button>
        </div>
        <div className="w-[40%] h-full flex flex-col items-center justify-center">
        <Image src="/images/audio-book.png" width={500} height={500} alt="Learning Icon"/>
        </div>
      </div>

      <div className="text-center flex md:flex-row flex-col justify-center items-center h-full w-full md:px-[116px] px-[48px]">
        <div className="h-full w-[40%] flex flex-col justify-center items-center">
          <Image src="/images/architecture.png" width={400} height={400} alt="icon"></Image>
        </div>
        
        <div className="min-h-[90vh] h-full w-[60%] flex flex-col justify-center items-start">
          <p className="w-full md:text-left text-center font-bold text-[32px] text-[#444444]">Discover, Apply, and Connect</p>
          <p className="md:text-left text-center md:text-[14px] xl:text-[16px] text-text md:w-[80%] mt-[10px]">At Montgomery Blair High School, we’re committed to helping students explore career opportunities and connect with employers in the community. Our new Blair Opportunities Hub makes it easier than ever for students to find job postings and for employers to share openings with talented, motivated students.</p>
          <Button color="primary" variant="bordered" className="mt-[12px] font-semibold" as={Link} href="/register">
            Start Pathway  →
          </Button>
        </div>
      </div>

      
      <div className="text-center flex md:flex-row flex-col justify-center items-center h-full w-full md:px-[116px] px-[48px] min-h-[70vh]">
        <div className="h-full w-[60%] flex flex-col justify-center items-center rounded-lg shadow-md px-8 py-16">
          <p className="w-full text-center font-bold text-[32px] text-[#444444]">Gain Career Readiness</p>
          <p className="text-center md:text-[14px] xl:text-[16px] text-text md:w-[80%] mt-[10px] High schools that introduced job platforms saw a 30% increase in student employment rates within the first year">High schools that introduced job platforms saw a <span className="text-primary font-bold">30% increase</span> in student employment rates within the first year <a href="https://www.edsurge.com/news/2020-06-11-the-post-pandemic-outlook-for-edtech">(source)</a>.</p>
          <Button color="primary" variant="solid" className="mt-[12px] font-semibold" as={Link} href="/approvedJobs">
            Search Jobs
          </Button>
        </div>
      </div>

      <div className="text-center flex flex-col justify-start items-center min-h-[90vh] h-full w-full md:px-[116px] px-[48px] mt-[24px]">
        <div className="flex flex-col justify-center items-center">
          <p className="text-[16px]  font-bold text-[#6B7280]">Why Us</p>
          <p className="text-[32px]  font-bold text-[#444444]">Key Features of our Platform</p>
        </div>

        <div className="grid grid-rows-1 xl:grid-flow-col justify-center items-center xl:gap-x-[60px] gap-y-[20px] mt-[20px] md:grid-flow-row">
          <div className="bg-[#faf0f4] rounded-md shadow-[#EEEEEE] shadow-md w-[300px] xl:h-[400px] md:h-[300px] flex flex-col justify-center items-center px-[12px] py-[12px] md:py-0">
            <Image src="/images/clock.png" width={96} height={96} alt={"icon"}></Image>
            <p className=" font-bold text-[20px] pt-[8px] text-primary">Streamlined Application Process</p>
            <p className=" text-[16px] pt-[8px] text-[#6B7280]">Straightforward application, tracking progress, and review experience.</p>
          </div>
          <div className="bg-[#faf0f4] rounded-md shadow-[#EEEEEE] shadow-md w-[300px] xl:h-[400px] md:h-[300px] flex flex-col justify-center items-center px-[12px]">
            <Image src="/images/trust.png" width={96} height={96} alt={"icon"}></Image>
            <p className=" font-bold text-[20px] pt-[8px] text-primary">Trusted and Verified Opportunities</p>
            <p className=" text-[16px] pt-[8px] text-[#6B7280]">Every job posting is reviewed and approved by administrators.</p>
          </div>
          <div className="bg-[#faf0f4] rounded-md shadow-[#EEEEEE] shadow-md w-[300px] xl:h-[400px] md:h-[300px] flex flex-col justify-center items-center px-[12px]">
            <Image src="/images/link.png" width={96} height={96} alt={"icon"}></Image>
            <p className=" font-bold text-[20px] pt-[8px] text-primary">Build Connections</p>
            <p className=" text-[16px] pt-[8px] text-[#6B7280]">We connect students with employers specialized for MBHS students.</p>
          </div>
          
        </div>
      </div>

      <div className="text-center flex flex-col-reverse md:flex-row justify-center items-center min-h-[90vh] h-full w-full px-[15vw] my-[32px] xl:my-0">
        <div className="h-full w-[60%] flex flex-col justify-center items-center md:items-start">
          <div className="flex flex-col justify-center items-center md:items-start">
            <p className="text-[16px]  font-bold text-[#6B7280] text-center md:text-left ">Easy and Fast</p>
            <p className="text-[32px]  font-bold text-[#444444] text-center md:text-left">How It Works:</p>
          </div>

          <div className="grid grid-rows-4 grid-flow-col justify-start items-center md:items-start gap-x-[24px] gap-y-[16px] mt-[20px] w-full">
            <div><Image src="/images/point.png" width={40} height={40} alt="icon"></Image></div>
            <div><Image src="/images/point.png" width={40} height={40} alt="icon"></Image></div>
            <div><Image src="/images/point.png" width={40} height={40} alt="icon"></Image></div>
            <div><Image src="/images/point.png" width={40} height={40} alt="icon"></Image></div>
            <div><p className="flex flex-row justify-start  text-text text-[16px] font-bold text-left">Employers Submit Postings</p>
            <p className="text-[#AAAAAA] text-left ">Use our employer-friendly submission form to share job openings and essential details.</p></div>
            <div><p className="flex flex-row justify-start  text-text text-[16px] font-bold text-left ">Approval Panel Review</p>
            <p className="text-[#AAAAAA] text-left ">Our team reviews and approves job postings.</p></div>
            <div><p className="flex flex-row justify-start  text-text text-[16px] font-bold text-left ">Job Postings Go Live</p>
            <p className="text-[#AAAAAA] text-left ">Approved jobs are featured on the platform for students to explore.</p></div>
            <div><p className="flex flex-row justify-start  text-text text-[16px] font-bold text-left ">Students Apply</p>
            <p className="text-[#AAAAAA] text-left ">Students submit their applications directly through the platform.</p></div>
          </div>

          <Button color="primary" className="mt-6" as={Link} href="/register">
            Register Now
          </Button>
          
        </div>
        
        <div className="h-full w-[40%] flex flex-col justify-center items-start">
          <Image src="/images/graduation.png" width={400} height={400} alt="icon"></Image>
        </div>
      </div>

      <Footer/>
    </div>
  );
}
