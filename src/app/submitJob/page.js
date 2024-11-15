"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SubmitJobPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    applicationLink: '',
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
        setForm({ title: '', company: '', description: '', location: '', applicationLink: '', employerId: session.user.id });
      } else {
        alert('Failed to submit job posting');
      }
    } catch (error) {
      alert('Error submitting job posting');
    }
  };

  return (
    <div>
      <h1>Submit a Job Posting</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Job Title:
          <input type="text" name="title" value={form.title} onChange={handleChange} required />
        </label>
        <label>
          Company:
          <input type="text" name="company" value={form.company} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={form.location} onChange={handleChange} required />
        </label>
        <label>
          Application Link:
          <input type="url" name="applicationLink" value={form.applicationLink} onChange={handleChange} required />
        </label>
        <button type="submit">Submit Job</button>
      </form>
    </div>
  );
}
