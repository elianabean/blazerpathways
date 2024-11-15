import dbConnect from '../../lib/dbConnect';
import JobPosting from '../../models/jobPostings';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]"


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const session = await getServerSession(req, res, authOptions);

      await dbConnect();

      const { title, company, description, location, applicationLink, employerId } = req.body;

      const newJobPosting = new JobPosting({
        title,
        company,
        description,
        location,
        applicationLink,
        employerId,
        status: 'pending',
      });

      await newJobPosting.save();

      return res.status(201).json(newJobPosting);  
    } catch (error) {
      console.error('Error while submitting job:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}