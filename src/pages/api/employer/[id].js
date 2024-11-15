import dbConnect from '../../../lib/dbConnect';
import JobPosting from '../../../models/jobPostings';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default async function handler(req, res) {
  const { method } = req;
  const { id: employerId } = req.query;

  await dbConnect();

  if (method === 'GET') {
    try {
      const session = await getServerSession(req, res, authOptions);
      
      if (!session || session.user.role !== 'employer' || session.user.id !== employerId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      
      // find all jobs posted by the employer
      const jobs = await JobPosting.find({ employerId : employerId});
      
      return res.status(200).json(jobs);
    } catch (error) {
      console.error('Error fetching applications:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
