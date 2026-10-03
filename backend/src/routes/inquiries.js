import express from 'express';
import Inquiry from '../models/Inquiry.js';
import protect from '../middleware/auth.js';
import { sendInquiryNotification } from '../config/mailer.js';

const router = express.Router();

// POST /api/inquiries  (public)
router.post('/', async (req, res) => {
  try {
    const data = { ...req.body };
    if (!data.id) data.id = `inq-${Date.now().toString(36)}`;
    const inquiry = await Inquiry.create(data);

    // Notify staff by email. This is intentionally not awaited so a slow or
    // failing mail server never delays or breaks the customer's submission;
    // the inquiry is already saved above.
    sendInquiryNotification(inquiry.toJSON());

    res.status(201).json(inquiry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/inquiries  (admin)
router.get('/', protect, async (_req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/inquiries/:id/status  (admin)
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const inquiry = await Inquiry.findOneAndUpdate(
      { id: req.params.id },
      { status: req.body.status },
      { returnDocument: 'after' }
    );
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.json(inquiry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/inquiries/:id  (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const inquiry = await Inquiry.findOneAndDelete({ id: req.params.id });
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
