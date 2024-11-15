import { Button } from "@nextui-org/react";
import Link from "next/link";
import Image from 'next/image'
import Header from '@components/Header2'

export default function Home() {
  return (
    <div className="h-full">
      <Header></Header>
      <div className="text-center flex justify-center items-center h-full w-full px-[116px]">
        <div className=" h-[100vh] w-[60%] flex flex-col justify-center items-start">
          <h1 className="text-7xl mb-4  font-bold text-left text-text leading-[1.1]">Embark on your <span className="text-primary">pathway</span> to career success.</h1>
          <h2 className="mb-8  text-left text-[18px] w-[75%] text-[#777777]">Explore job listings, submit applications, and create connections that matter—all in one place.
          </h2>
          <Button className="bg-primary text-white font-semibold" as={Link} href="/learn">
            Get Started
          </Button>
        </div>
        <div className="w-[40%] h-full flex flex-col items-center justify-center">
        <Image src="/images/self-learning.png" width={500} height={500} alt="Learning Icon"/>
        </div>
      </div>

      <div className="text-center flex flex-row justify-center items-center h-full w-full px-[116px]">
        <div className="h-full w-[40%] flex flex-col justify-center items-center">
          <Image src="/images/online-exam.png" width={400} height={400} alt="icon"></Image>
        </div>
        
        <div className="h-full w-[60%] flex flex-col justify-center items-start">
          <p className="w-full text-left font-bold text-[32px] text-[#444444]">Join our collaborative learning platform!</p>
          <p className="text-left text-[16px] text-text w-[80%] mt-[10px]">Our platform is designed to make studying more accessible and collaborative. Whether you&apos;re preparing for exams or tackling a tough subject, you can find a wealth of student-shared resources to support your learning. Together, we make learning easier and more engaging.</p>
          <Button className="bg-[white] text-[#0E793C] border-1 border-[#0E793C] mt-[12px] font-semibold" as={Link} href="/learn">
            Start Learning  →
          </Button>
        </div>
      </div>

      <div className="text-center flex flex-col justify-start items-center h-full w-full px-[116px]">
        <div className="flex flex-col justify-center items-center">
          <p className="text-[16px]  font-bold text-[#6B7280]">Why Us</p>
          <p className="text-[32px]  font-bold text-[#444444]">Key Features of our Platform</p>
        </div>

        <div className="grid grid-rows-1 grid-flow-col justify-center items-center gap-x-[24px] mt-[20px]">
          <div className="rounded-md shadow-[#EEEEEE] shadow-md w-[300px] h-[400px] flex flex-col justify-center items-center px-[12px]">
            <Image src="/images/collaborate.png" width={96} height={96} alt={"icon"}></Image>
            <p className=" font-bold text-[20px] pt-[8px] text-[#444444]">Collaborative Study Hub</p>
            <p className=" text-[16px] pt-[8px] text-[#6B7280]">Connect with students from all over by sharing and accessing study materials. Learn more efficiently through collaboration.</p>
          </div>
          <div className="rounded-md shadow-[#EEEEEE] shadow-md w-[300px] h-[400px] flex flex-col justify-center items-center px-[12px]">
            <Image src="/images/file.png" width={96} height={96} alt={"icon"}></Image>
            <p className=" font-bold text-[20px] pt-[8px] text-[#444444]">Upload & Share Materials</p>
            <p className=" text-[16px] pt-[8px] text-[#6B7280]">Easily upload your notes, flashcards, and other study resources to help others while benefiting from materials shared by your peers.</p>
          </div>
          <div className="rounded-md shadow-[#EEEEEE] shadow-md w-[300px] h-[400px] flex flex-col justify-center items-center px-[12px]">
            <Image src="/images/knowledge.png" width={96} height={96} alt={"icon"}></Image>
            <p className=" font-bold text-[20px] pt-[8px] text-[#444444]">Discover New Resources</p>
            <p className=" text-[16px] pt-[8px] text-[#6B7280]">Browse through a wide variety of student-contributed content to find new ways to approach your studies and deepen your understanding.</p>
          </div>
          <div className="rounded-md shadow-[#EEEEEE] shadow-md w-[300px] h-[400px] flex flex-col justify-center items-center px-[12px]">
            <Image src="/images/interactive.png" width={96} height={96} alt={"icon"}></Image>
            <p className=" font-bold text-[20px] pt-[8px] text-[#444444]">Interactive Learning</p>
            <p className=" text-[16px] pt-[8px] text-[#6B7280]">Engage with diverse learning materials and collaborate in real-time with your peers, making studying more dynamic and effective.</p>
          </div>
          
        </div>
      </div>

      <div className="text-center flex flex-row justify-center items-center h-full w-full px-[116px]">
        <div className="h-full w-[60%] flex flex-col justify-center items-start">
          <div className="flex flex-col justify-center items-start">
            <p className="text-[16px]  font-bold text-[#6B7280]">Easy and Fast</p>
            <p className="text-[32px]  font-bold text-[#444444] w-[80%] text-left">Transform Your Learning In Three Steps</p>
          </div>

          <div className="grid grid-rows-3 grid-flow-col justify-start items-start gap-x-[24px] gap-y-[16px] mt-[20px] w-full">
            <div><Image src="/images/enter.png" width={40} height={40} alt="icon"></Image></div>
            <div><Image src="/images/choose.png" width={40} height={40} alt="icon"></Image></div>
            <div><Image src="/images/studying.png" width={40} height={40} alt="icon"></Image></div>
            <div><p className="flex flex-row justify-start  text-[#6B7280] text-[16px]">Login or Register for an account on our platform</p></div>
            <div><p className="flex flex-row justify-start  text-[#6B7280] text-[16px]">Select a module to start learning</p></div>
            <div><p className="flex flex-row justify-start  text-[#6B7280] text-[16px]">Watch the video, read the article, and test your knowledge on the quiz</p></div>
          </div>

          <Button className="bg-[#0E793C] text-white mt-[20px] font-semibold" as={Link} href="/login">
            Register/Login
          </Button>
          
        </div>
        
        <div className="h-full w-[40%] flex flex-col justify-center items-start">
          <Image src="/images/best-results.png" width={400} height={400} alt="icon"></Image>
        </div>
      </div>

    </div>
  );
}
