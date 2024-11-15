import mongoose from 'mongoose';

const JobPostingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  applicationLink: { type: String, required: true },
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.JobPosting || mongoose.model('JobPosting', JobPostingSchema);
