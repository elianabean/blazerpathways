"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminPanel() {

  const { data: session, status } = useSession();

  const router = useRouter();



  const [jobPostings, setJobPostings] = useState([]);



  useEffect(() => {

    if (status === 'loading') return;



    if (!session || session.user.role !== 'admin') {

      router.push('/api/auth/signin');

      return;

    }

    const fetchJobPostings = async () => {

      try {

        const response = await fetch('/api/jobs');

        const jobs = await response.json();

        setJobPostings(jobs);

      } catch (error) {

        console.error('Error fetching job postings:', error);

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

    <div>

      <h1>Admin Panel: Manage Job Postings</h1>

      <ul>

        {jobPostings.map((job) => (

          <li key={job._id}>

            <h2>{job.title}</h2>

            <p>{job.description}</p>

            <button onClick={() => handleApprove(job._id)}>Approve</button>

            <button onClick={() => handleDelete(job._id)}>Delete</button>

          </li>

        ))}

      </ul>

    </div>

  );

}