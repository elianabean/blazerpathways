"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from "@components/Header2";
import {Input, Textarea, Button, Select, SelectItem, DateInput} from "@heroui/react";
import Footer from "@components/Footer"

export default function SubmitJobPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    type: '',
    salary: '',
    company: '',
    description: '',
    location: '',
    xpLevel: '',
    deadline: '',
    keywords: '',
    contact: '',
    employerId: '', 
  });

  useEffect(() => {
    if (status === 'loading') return;
  
    if (!session) {
      router.push('/api/auth/signin'); 
    } else if (session && session.user && session.user.role !== 'employer') {
      router.push('/api/auth/signin');
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        employerId: session.user.id,
      }));
    }
  }, [session, status, router]);  

  if (status === 'loading') return <p>Loading...</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/postJob', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert('Job posting submitted successfully!');
      } else {
        alert('Failed to submit job posting');
      }
    } catch (error) {
      alert('Error submitting job posting');
    }
  };

  const jobTypes = [
    { key: "full_time", label: "Full-Time" },
    { key: "part_time", label: "Part-Time" },
    { key: "internship", label: "Internship" },
    { key: "volunteer", label: "Volunteer" },
  ];
  const xpLevel = [
    { key: "entry_level", label: "Entry-Level" },
    { key: "intermediate", label: "Intermediate" },
    { key: "senior", label: "Senior" },
    { key: "None", label: "None" },
  ];

  return (
    <div className="h-full">
      <Header></Header>
      <div className="flex flex-row mt-[60px] mx-[10vw] justify-center items-center mb-[24px]">
        <div className="w-[60%] ">
          <p className="text-text font-bold leading-[1.1] text-4xl">Submit a Job Posting</p>

          <p className="text-left text-[#777777] text-[16x] mt-[20px] w-[75%]">Enter details for your job below. Once submitted, your posting will be reviewed by administrators for approval before it appears on the Job Board.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-[40px]">
        
          <Input type="text" name="title" variant={'underlined'} label="Job Title" value={form.title} onChange={handleChange} isRequired/>
          <div className="flex flex-row gap-4">
            <Select name="type" variant={'underlined'} label="Job Type" value={form.type} onChange={handleChange} isRequired>
              {jobTypes.map((job) => (
            <SelectItem key={job.key}>
              {job.label}
            </SelectItem>
        ))}
            </Select>
            <Input type="text" name="salary" variant={'underlined'} label="Salary Range" value={form.salary} onChange={handleChange} isRequired/>
          </div>
          <Input type="text" name="company" variant={'underlined'} label="Company" value={form.company} onChange={handleChange} isRequired/>
          <Textarea name="description" variant={'underlined'} label="Description" value={form.description} onChange={handleChange} isRequired/>
          <Input type="text" name="location" variant={'underlined'} label="Location" value={form.location} onChange={handleChange} isRequired/>

          <div className="flex flex-row gap-4">
            <Select name="xpLevel" variant={'underlined'} label="Experience Level" value={form.xpLevel} onChange={handleChange} isRequired>
              {xpLevel.map((job) => (
            <SelectItem key={job.key}>
              {job.label}
            </SelectItem>
        ))}
            </Select>
            <Input type="text" name="deadline" label="Application Deadline" value={form.deadline} variant="underlined" onChange={handleChange} isRequired placeholder="mm/dd/yyyy">
            </Input>
          </div>
          <Input type="text" name="keywords" variant={'underlined'} label="Keywords" value={form.keywords} onChange={handleChange} isRequired/>
          <Input type="email" name="contact" variant={'underlined'} label="Contact Email" value={form.contact} onChange={handleChange} isRequired/>
        <Button type="submit" color="primary" className="mt-4">Submit Job</Button>
      </form>
        </div>

        <div className="w-[40%] flex flex-col justify-center">

        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
