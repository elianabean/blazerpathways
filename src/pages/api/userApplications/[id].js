import dbConnect from '../../../lib/dbConnect';
import JobApplication from '../../../models/jobApplications';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === 'GET') {
    try {
      const session = await getServerSession(req, res, authOptions);

      // fetch all applications for the given userId
      const applications = await JobApplication.find({ userId: session.user.id })
        .populate('jobId', 'title')
        .exec();

      if (!applications.length) {
        return res.status(404).json({ message: 'No applications found' });
      }

      return res.status(200).json(applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
