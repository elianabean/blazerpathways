import dbConnect from '../../../../lib/dbConnect';
import JobApplication from '../../../../models/jobApplications';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default async function handler(req, res) {
  const { method } = req;
  const { id: jobId } = req.query;

  await dbConnect();

  if (method === 'GET') {
    try {
      const session = await getServerSession(req, res, authOptions);
      
      if (!session || session.user.role !== 'employer' ) {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      // the applications for the jobs posted by this employer
      const applications = await JobApplication.find({ jobId }).populate('jobId', 'title company')
      .exec();;

      console.log(applications)
      
      return res.status(200).json(applications);
    } catch (error) {
      console.log('Error fetching applications:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  } else if (method === 'PUT') {
    try {
      const session = await getServerSession(req, res, authOptions);

      // find the application by ID
      const application = await JobApplication.findById(jobId);
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }

      const { status } = req.body;
      if (!['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      application.status = status;
      await application.save();

      return res.status(200).json(application);
    } catch (error) {
      console.log('Error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}