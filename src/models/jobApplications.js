import mongoose from 'mongoose';

const JobApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPosting', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  resumeLink: { type: String, required: true },
  appliedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', required: true},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
});

export default mongoose.models.JobApplication || mongoose.model('JobApplication', JobApplicationSchema);
