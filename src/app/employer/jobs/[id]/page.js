'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import Header2 from '@components/Header2'
import {Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import React from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function JobApplicationsPage() {
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState([]);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  const router = useRouter();

  const handleOpen = (application) => {
    setSelectedApplication(application);
    onOpen();
  };

  const handleClose = () => {
    setSelectedApplication(null);
    onOpenChange(false);
  };

  const params = useParams();
  const jobId = params.id;

  useEffect(() => {
    if (status === 'loading' || !jobId) return;

    if (!session || session.user.role !== 'employer') {
      router.push('/api/auth/signin');
    } else {
      fetch(`/api/employer/applications/${jobId}`)
        .then((response) => response.json())
        .then((data) => setApplications(data))
        .catch((error) =>  console.log("Error fetching applications:", error));
    }
  }, [session, status, jobId]);

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      const response = await fetch(`/api/employer/applications/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        const updatedApplication = await response.json();
        setApplications((prevApplications) =>
          prevApplications.map((application) =>
            application._id === applicationId ? updatedApplication : application
          )
        );
        router.reload();
      } else {
         console.log("Failed to update application status");
      }
    } catch (error) {
       console.log("Error updating application status:", error);
    }
  };

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
            <p className="text-4xl text-text font-bold">Applications for Your Job Posting</p>
            <p className="text-[18px] text-[#AAAAAA] mt-4">View applications for your job posting.</p>

            <div className="flex flex-row justify-between items-center w-[100%] mt-[32px] px-[48px]">
              <p className="w-1/3 text-[#CCCCCC] text-left">Full Name</p>
              <p className="w-1/3 text-[#CCCCCC] text-center">Email</p>
              <p className="w-1/3 text-[#CCCCCC] text-right">STATUS</p>
            </div>

            <ul className="w-[100%] mt-[12px]">
            {applications.map((application) => (
              <li key={application._id} className="w-[100%] mb-10">
                <Button onPress={() => handleOpen(application)} className="w-[100%] bg-white shadow-md rounded-md px-[32px] py-[40px]">
                  <div className="w-[100%] bg-white flex flex-row justify-between items-center">
                    <p className="w-1/3 text-left truncate">{application.name}</p>
                    <p className="w-1/3 text-left truncate">{application.email}</p>
                    <div className={`bg-white rounded-full px-3 py-2 border-1 border-${
    application.status === 'approved' 
      ? 'success' 
      : application.status === 'rejected' 
      ? 'primary' 
      : 'error'
  } text-${
    application.status === 'approved' 
      ? 'success' 
      : application.status === 'rejected' 
      ? 'primary' 
      : 'error'
  }`}>{application.status}</div>
                  </div>
                  
                </Button>
                {selectedApplication && selectedApplication._id === application._id && (
      <Modal isOpen={isOpen} onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
      }} scrollBehavior={scrollBehavior}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{application.name}</ModalHeader>
              <ModalBody>
                <p className="font-bold">Email: <span className="font-normal">{application.email}</span></p>
                <p className="font-bold">Phone: <span className="font-normal">{application.phone}</span></p>
                <p className="font-bold">Resume/CV Link: <span className="font-normal">{application.resumeLink}</span></p>
                <p className="font-bold">Portfolio: <span className="font-normal">{application.portfolio}</span></p>
              </ModalBody>
              <ModalFooter>
                <Button color="success"onClick={() => handleStatusUpdate(application._id, 'approved')}>
                  Approve
                </Button>
                <Button color="primary"  onClick={() => handleStatusUpdate(application._id, 'rejected')}>
                  Reject
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>)}
              </li>

            ))}

            </ul>
        </div>
      </div>
    </div>
  );
}
