'use client'

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ApplyPage() {
  const params = useParams();

  const id = params?.id as string | undefined;
  
  const [job, setJob] = useState<any>(null);
  const [form, setForm] = useState({ name: '', email: '', resumeLink: '' });

  useEffect(() => {
    if (id) {
      fetch(`/api/jobs/${id}`)
        .then((res) => res.json())
        .then((data) => setJob(data));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    <div>
      <h1>Apply for {job.title}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="resumeLink"
          placeholder="Resume Link"
          value={form.resumeLink}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}
