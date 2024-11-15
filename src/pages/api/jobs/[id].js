import dbConnect from '../../../lib/dbConnect';
import JobPosting from '../../../models/jobPostings'; 
import JobApplication from "../../../models/jobApplications";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  if (method === 'PUT') {
    try {
      const session = await getServerSession(req, res, authOptions);

      if (!session || session.user.role !== 'admin') {
        console.log('Unauthorized access attempt');
        return res.status(403).json({ message: 'Unauthorized' });
      }

      // find the job posting by ID
      const job = await JobPosting.findById(id);

      if (!job) {
        console.log('Job not found');
        return res.status(404).json({ message: 'Job not found' });
      }

      // Update the job status to 'approved'
      const updatedJob = await JobPosting.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
      console.log('Updated job:', updatedJob);

      if (!updatedJob) {
        console.log('Failed to update job');
        return res.status(500).json({ message: 'Failed to update job' });
      }

      return res.status(200).json(updatedJob);
    } catch (error) {
       console.log('Error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  else if (method === 'DELETE') {
    try {
      const session = await getServerSession(req, res, authOptions);

      if (!session || session.user.role !== 'admin') {
        console.log('Unauthorized access attempt');
        return res.status(403).json({ message: 'Unauthorized' });
      }

      // find the job posting by ID and delete it
      const deletedJob = await JobPosting.findByIdAndDelete(id);

      if (!deletedJob) {
        console.log('Job not found for deletion');
        return res.status(404).json({ message: 'Job not found' });
      }

      return res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
       console.log('Error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  else if (req.method === 'POST') {
    // handle application submission for a specific job
    const { name, email, resumeLink } = req.body;

    try {
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const userId = session.user.id;
        
      const job = await JobPosting.findById(id);
      if (!job) return res.status(404).json({ error: 'Job not found' });

      const application = await JobApplication.create({
        jobId: id,
        name,
        email,
        resumeLink,
        appliedAt: new Date(),
        status: 'pending',
        userId,
      });

      return res.status(201).json(application);
    } catch (error) {
         console.log('Error handling application submission:', error);
      return res.status(500).json({ error: 'Failed to submit application' });
    }
  }

  else if (method === 'GET') {
    console.log('hello')
    try {
      const job = await JobPosting.findById(id);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
      return res.status(200).json(job);
    } catch (error) {
       console.log('Error fetching job:', error);
      return res.status(500).json({ message: 'Error fetching job' });
    }
  }
  
  return res.status(405).json({ message: 'Method Not Allowed' });
}
