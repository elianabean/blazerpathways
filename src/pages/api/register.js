import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect();
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).end();
  }
}
