'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ApplicationsPage() {
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/api/auth/signin');
      return;
    }

    fetch(`/api/userApplications/${session.user.id}`)
      .then((response) => response.json())
      .then((data) => setApplications(data))
      .catch((error) => console.error('Error fetching applications:', error));
  }, [session, status, router]);

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div>
      <h1>Your Applications</h1>
      <ul>
        {applications.map((application) => (
          <li key={application._id}>
            <h3>{application.jobId.title}</h3> {/* Display job title */}
            <p>Status: {application.status}</p> {/* Display application status */}
          </li>
        ))}
      </ul>
    </div>
  );
}
