'use client'

import { useState, useEffect } from 'react';

export default function ApprovedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div>
      <h1>Approved Job Postings</h1>
      {jobs.length === 0 ? (
        <p>No job postings available.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>
              <h2>{job.title}</h2>
              <p><strong>Company:</strong> {job.company}</p>
              <p>{job.description}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <a href={`/apply/${job._id}`} target="_blank" rel="noopener noreferrer">Apply Here</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
