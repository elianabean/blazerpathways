'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@components/Header2';
import {Input, Textarea, Button, Select, SelectItem, DateInput} from "@heroui/react";
import Footer from "@components/Footer"

export default function ApplyPage() {
  const params = useParams();

  const id = params?.id;

  const [job, setJob] = useState(null);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    resumeLink: '',
    portfolio: '',
 });

  useEffect(() => {
    if (id) {
      fetch(`/api/jobs/${id}`)
        .then((res) => res.json())
        .then((data) => setJob(data));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        setForm({ name: '', email: '', resumeLink: '' });
      } else {
        alert('Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="h-full">
      <Header></Header>
      <div className="flex flex-row mt-[60px] mx-[10vw] justify-center items-center mb-[24px]">
        <div className="w-[60%] ">
          <p className="text-text font-bold leading-[1.1] text-4xl">Apply</p>

          <p className="text-left text-[#777777] text-[16x] mt-[20px] w-[75%]">Currently selected: {job.title}</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-[40px]">
        
          
          <div className="flex flex-row gap-4">
            <Input type="text" name="name" variant={'underlined'} label="Full Name" value={form.name} onChange={handleChange} isRequired/>
            <Input type="email" name="email" variant={'underlined'} label="Email" value={form.email} onChange={handleChange} isRequired/>
          </div>
          <div className="flex flex-row gap-4">
            <Input type="text" name="phone" variant={'underlined'} label="Phone Number" value={form.phone} onChange={handleChange} isRequired/>
            
          </div>
          <Input type="text" name="resumeLink" variant={'underlined'} label="Resume Link (Google Drive, One Drive, etc)" value={form.resumeLink} onChange={handleChange} isRequired/>
          <Input type="text" name="portfolio" variant={'underlined'} label="Portfolio Link (LinkedIn, Github, etc)" value={form.portfolio} onChange={handleChange} />
          
        <Button type="submit" color="primary" className="mt-4">Submit Application</Button>
      </form>
        </div>

        <div className="w-[40%] flex flex-col justify-center">
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
