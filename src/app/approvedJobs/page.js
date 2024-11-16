"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from "@components/Header2";
import Image from 'next/image';
import {Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input} from "@nextui-org/react";
import React from "react";
import Link from 'next/link';
import {SearchIcon} from "@components/SearchIcon";

export default function ApprovedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedJob, setSelectedJob] = useState(null);
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");

  
  const handleOpen = (job) => {
    setSelectedJob(job);
    onOpen();
  };

  const handleClose = () => {
    setSelectedJob(null);
    onOpenChange(false);
  };

  useEffect(() => {
    async function fetchApprovedJobs() {
      try {
        const response = await fetch('/api/jobs/approved');
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        } else {
          console.error('Failed to fetch approved jobs');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchApprovedJobs();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='h-full w-full'>
      <Header></Header>
      <div className="flex flex-row mt-[60px] mx-[10vw] justify-center items-start">
        <div className="w-[30%] flex flex-col justify-center items-start gap-6">
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

        <div className="w-[70%] flex flex-col items-start justify-start">
            <p className="text-4xl text-text font-bold">Job Postings</p>
            <p className="text-[18px] text-[#AAAAAA] mt-4 mb-4">Explore job postings and apply to opportunities.</p>

            <Input
        isClearable
        variant="bordered"
        radius="lg"
        placeholder="Search..."
        startContent={
          <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      />

            <ul className="w-[100%] mt-[32px]">
            {jobs.map((job) => (
              <li key={job._id} className="w-[100%] mb-10">
                <Button onPress={() => handleOpen(job)} className="h-full w-[100%] bg-white shadow-md rounded-md px-[32px] py-[24px]">
                  <div className="w-[100%] bg-white flex flex-col justify-center items-start">
                    <p className="text-left text-[#BBBBBB]">Deadline: {job.deadline}</p>
                    <p className="text-left font-bold truncate">{job.title}</p>
                    <p className="w-[100%] text-left line-clamp-2 text-wrap">{job.description}</p>
                  </div>
                  
                </Button>
      {selectedJob && selectedJob._id === job._id && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={scrollBehavior}>
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
                <Link href={`/apply/${job._id}`}><Button color="primary">
                  Apply
                </Button></Link>
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
