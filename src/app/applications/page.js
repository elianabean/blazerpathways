'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header2 from '@components/Header2'
import {Button, useDisclosure} from "@heroui/react";
import React from "react";
import Image from 'next/image';

export default function ApplicationsPage() {
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState([]);
  const router = useRouter();
  const {_isOpen, onOpen, onOpenChange} = useDisclosure();
  const [_selectedapp, setSelectedApp] = useState(null);
  
  const handleOpen = (job) => {
    setSelectedApp(job);
    onOpen();
  };

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/api/auth/signin');
      return;
    }

    fetch(`/api/userApplications/${session.user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setApplications(data);
        console.log("the applications", data);
      })
      .catch((error) => console.error('Error fetching applications:', error));
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
            <p className="text-4xl text-text font-bold">Your Applications</p>
            <p className="text-[18px] text-[#AAAAAA] mt-4">View the status of your submitted applications.</p>

            <div className="flex flex-row justify-between items-center w-[100%] mt-[32px] px-[48px]">
              <p className="w-1/3 text-[#CCCCCC] text-left">JOB TITLE</p>
              <p className="w-1/3 text-[#CCCCCC] text-center">COMPANY</p>
              <p className="w-1/3 text-[#CCCCCC] text-right">STATUS</p>
            </div>
            <ul className="w-[100%] mt-[12px]">
            {applications.map((app) => (
              <li key={app._id} className="w-[100%] mb-10">
                <Button onPress={() => handleOpen(app)} className="w-[100%] bg-white shadow-md rounded-md px-[32px] py-[40px]">
                  <div className="w-[100%] bg-white flex flex-row justify-between items-center">
                    <p className="w-1/3 text-left truncate">{app.jobId.title}</p>
                    <p className="w-1/3 text-left truncate">{app.jobId.company}</p>
                    <div className={`bg-white rounded-full px-3 py-2 border-1 border-${
    app.status === 'approved' 
      ? 'success' 
      : app.status === 'pending' 
      ? 'warning' : app.status === 'rejected' ? 'primary'
      : 'error'
  } text-${
    app.status === 'approved' 
      ? 'success' 
      : app.status === 'pending' 
      ? 'warning' : app.status === 'rejected' ? 'primary'
      : 'error'
  }`}>{app.status}</div>
                  </div>
                  
                </Button>
              </li>

            ))}

            </ul>
        </div>

      </div>
    </div>
  );
}
