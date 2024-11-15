import dbConnect from '../../../lib/dbConnect';
import JobPosting from '../../../models/jobPostings';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const approvedJobs = await JobPosting.find({ status: 'approved' });
      res.status(200).json(approvedJobs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch approved job postings' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
