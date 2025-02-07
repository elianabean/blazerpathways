import dbConnect from '../../../../lib/dbConnect';
import JobApplication from '../../../../models/jobApplications';
import JobPosting from '@/models/jobPostings';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

       // Fetch the job details to get the job title
       const job = await JobPosting.findById(application.jobId);
       if (!job) {
         return res.status(404).json({ message: 'Job posting not found' });
       }

      const { status } = req.body;
      if (!['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      application.status = status;
      await application.save();

      await sendApprovalEmail(application, job.title);

      return res.status(200).json(application);
    } catch (error) {
      console.log('Error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}

async function sendApprovalEmail(application, jobTitle) {
  const msg = {
    to: application.email,
    from: process.env.EMAIL_FROM,
    subject: `Your Job Application Has Been Approved! 🎉`,
    html: `
      <h2>Congratulations, ${application.name}!</h2>
      <p>Your application for the job <strong>${application.jobId}</strong> has been approved.</p>
      <p>The employer will reach out to you soon.</p>
      <br>
      <p>Best of luck!</p>
    `,
  };

  await sgMail.send(msg);

  console.log("Sent approval email to " + application.email)
}
