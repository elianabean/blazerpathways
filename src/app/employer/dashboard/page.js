'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

  console.log("job postings")
  console.log(jobPostings)

  return (
    <div>
      <h1>Employer Dashboard</h1>
      <h2>Your Job Postings</h2>
      <ul>
        {jobPostings.map((job) => (
          <li key={job._id}>
            <h3>{job.title}</h3>
            <button onClick={() => router.push(`/employer/jobs/${job._id}`)}>
              View Applications
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
