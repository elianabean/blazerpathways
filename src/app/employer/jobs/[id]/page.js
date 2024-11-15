'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'

export default function JobApplicationsPage() {
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState([]);

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
      } else {
         console.log("Failed to update application status");
      }
    } catch (error) {
       console.log("Error updating application status:", error);
    }
  };

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div>
      <h1>Applications for Job Posting {jobId}</h1>
      <ul>
        {applications.map((application) => (
          <li key={application._id}>
            <h3>{application.name}</h3>
            <p>{application.email}</p>
            <a>{application.resume}</a>
            <p>Status: {application.status}</p>
            <button onClick={() => handleStatusUpdate(application._id, 'approved')}>Approve</button>
            <button onClick={() => handleStatusUpdate(application._id, 'rejected')}>Reject</button>

          </li>
        ))}
      </ul>
    </div>
  );
}
