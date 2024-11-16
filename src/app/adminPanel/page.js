"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header2 from "@components/Header2";
import Image from 'next/image';
import {Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import React from "react";

export default function AdminPanel() {

  const { data: session, status } = useSession();
  const router = useRouter();
  const [jobPostings, setJobPostings] = useState([]);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedJob, setSelectedJob] = useState(null);
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  
  const handleOpen = (job) => {
    setSelectedJob(job); // Set the selected job
    onOpen(); // Open the modal
  };

  const handleClose = () => {
    setSelectedJob(null); // Clear the selected job
    onOpenChange(false); // Close the modal
  };

  useEffect(() => {

    if (status === 'loading') return;

    if (!session || session.user.role !== 'admin') {

      router.push('/api/auth/signin');

      return;

    }

    const fetchJobPostings = async () => {

      try {

        const response = await fetch('/api/admin/jobs');

        const jobs = await response.json();

        setJobPostings(jobs);

      } catch (error) {

        console.log('Error fetching job postings:', error);

      }

    };



    fetchJobPostings();

  }, [session, status, router]);



  const handleApprove = async (id) => {

    const encodedId = encodeURIComponent(id);

    try {

      console.log(`Sending PUT request to /api/jobs/${encodedId}`);

      const response = await fetch(`/api/jobs/${encodedId}`, {

        method: 'PUT',

      });

  

      if (response.ok) {

        const data = await response.json();

        console.log('Approved job', data);
        router.push('/adminPanel');

      } else {

        const errorData = await response.json();

        console.error('Failed to approve job:', errorData.message);

      }

    } catch (error) {

      console.error('Error:', error);

    }

  };  

  const handleDelete = async (id) => {
    const confirmation = confirm('Are you sure you want to delete this job posting?');

    const encodedId = encodeURIComponent(id); 

    if (!confirmation) return;

    try {
      const response = await fetch(`/api/jobs/${encodedId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Job posting deleted successfully!');
        router.push('/adminPanel');
      } else {
        alert('Failed to delete job posting');
      }
    } catch (error) {
      alert('Error deleting job posting');
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
            <p className="text-4xl text-text font-bold">Job Postings</p>
            <p className="text-[18px] text-[#AAAAAA] mt-4">View jobs requested to be posted on the job board.</p>

            <div className="flex flex-row justify-between items-center w-[100%] mt-[32px] px-[48px]">
              <p className="w-1/3 text-[#CCCCCC] text-left">JOB TITLE</p>
              <p className="w-1/3 text-[#CCCCCC] text-center">COMPANY</p>
              <p className="w-1/3 text-[#CCCCCC] text-right">STATUS</p>
            </div>
            <ul className="w-[100%] mt-[12px]">
            {jobPostings.map((job) => (
              <li key={job._id} className="w-[100%] mb-10">
                <Button onPress={() => handleOpen(job)} className="w-[100%] bg-white shadow-md rounded-md px-[32px] py-[40px]">
                  <div className="w-[100%] bg-white flex flex-row justify-between items-center">
                    <p className="w-1/3 text-left truncate">{job.title}</p>
                    <p className="w-1/3 text-left truncate">{job.company}</p>
                    <div className={`bg-white rounded-full px-3 py-2 border-1 border-${
    job.status === 'approved' 
      ? 'success' 
      : job.status === 'pending' 
      ? 'warning' 
      : 'error'
  } text-${
    job.status === 'approved' 
      ? 'success' 
      : job.status === 'pending' 
      ? 'warning' 
      : 'error'
  }`}>{job.status}</div>
                  </div>
                  
                </Button>
                {selectedJob && selectedJob._id === job._id && (
      <Modal isOpen={isOpen} onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
      }} scrollBehavior={scrollBehavior}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{job.title}</ModalHeader>
              <ModalBody>
                <p className="font-bold">Salary Range: <span className="font-normal">{job.salary}</span></p>
                <p className="font-bold">Company: <span className="font-normal">{job.company}</span></p>
                <p className="font-bold">Description: <span className="font-normal">{job.description}</span></p>
                <p className="font-bold">Location: <span className="font-normal">{job.location}</span></p>
                <p className="font-bold">Experience Level: <span className="font-normal">{job.xpLevel}</span></p>
                <p className="font-bold">Keywords: <span className="font-normal">{job.keywords}</span></p>
                <p className="font-bold">Contact Email: <span className="font-normal">{job.contact}</span></p>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={() => handleApprove(job._id)} className={`${
    job.status === 'approved' 
      ? 'hidden' : 'inline'
  }`}>
                  Approve
                </Button>
                <Button color="primary"  onClick={() => handleDelete(job._id)}>
                  Delete
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