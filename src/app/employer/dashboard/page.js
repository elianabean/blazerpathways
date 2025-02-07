'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {Button} from "@heroui/react";
import Link from 'next/link';
import Header2 from '@components/Header2'
import Image from 'next/image';

export default function EmployerDashboard() {
  const { data: session, status } = useSession();
  const [jobPostings, setJobPostings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || session.user.role !== 'employer') {
      router.push('/api/auth/signin');
    } else {
      fetch(`/api/employer/${encodeURIComponent(session.user.id)}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => setJobPostings(data))
        .catch((error) => console.error(error));
    }
  }, [session, status, router]);

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className='h-full w-full'>
      <Header2></Header2>
      <div className="flex flex-row mt-[60px] mx-[10vw] justify-center items-start">
        <div className="w-[20%] flex flex-col justify-center items-start gap-6">
          <p className="text-[#CCCCCC] text-[18px]">MANAGE</p>
          <div className="ml-[16px] text-text text-[18px] flex flex-col gap-4 items-start">
            <Button className="flex flex-row items-center gap-4 bg-white" startContent={<Image src="/icons/jobPostings.png" width={28} height={28} alt="job postings"/>}>Job Postings</Button>
            <Button className="flex flex-row items-center gap-4 bg-white" startContent={<Image src="/icons/users.png" width={28} height={28} alt="job postings"/>}>Users</Button>
          </div>

          <p className="text-[#CCCCCC] text-[18px]">ACCOUNT</p>
          <div className="ml-[16px] text-text text-[18px] flex flex-col gap-4 items-start">
            <Button className="flex flex-row items-center gap-4 bg-white" startContent={<Image src="/icons/jobPostings.png" width={28} height={28} alt="job postings"/>}>Settings</Button>
          </div>
        </div>

        <div className="w-[80%] flex flex-col items-start justify-start">
            <p className="text-4xl text-text font-bold">Your Job Postings</p>
            <p className="text-[18px] text-[#AAAAAA] mt-4">View the applications submitted to your job postings.</p>

            <div className="flex flex-row justify-between items-center w-[100%] mt-[32px] px-[48px]">
              <p className="w-1/3 text-[#CCCCCC] text-left">JOB TITLE</p>
              <p className="w-1/3 text-[#CCCCCC] text-center">COMPANY</p>
              <p className="w-1/3 text-[#CCCCCC] text-right">Applications</p>
            </div>
            <ul className="w-[100%] mt-[12px]">
        {jobPostings.map((job) => (
          <li key={job._id} className="w-[100%] mb-10">
            <div className="w-[100%] bg-white shadow-md rounded-md px-[32px] py-[40px]">
                  <div className="w-[100%] bg-white flex flex-row justify-between items-center">
                    <p className="w-1/3 text-left truncate">{job.title}</p>
                    <p className="w-1/3 text-left truncate">{job.company}</p>
                    <div><Link href={`/employer/jobs/${job._id}`}><Button  color="primary" variant="bordered">View
                    </Button></Link></div>
                  </div>
                  
                </div>
          </li>
        ))}
      </ul>
        </div>

      </div>
    </div>
  );
}
