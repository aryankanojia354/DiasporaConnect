const express = require('express');
const Event = require('../../models/Event');
const Message = require('../../models/Message');

const router = express.Router();

// GET all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find({});
    const eventsWithEditing = events.map(evt => ({ ...evt.toObject(), isEditing: false }));
    res.json(eventsWithEditing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Update an event
router.put('/events/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, date } = req.body;
  try {
    await Event.findByIdAndUpdate(id, { title, description, date }, { new: true });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// GET all messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find({});
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// POST a new message
router.post('/messages', async (req, res) => {
  const { text, timestamp } = req.body;
  try {
    const newMessage = await Message.create({ text, timestamp });
    res.json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

router.post('/events', async (req, res) => {
    const { title, description, date } = req.body;
    try {
      const newEvent = await Event.create({ title, description, date });
      res.json(newEvent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create event' });
    }
  });

  router.delete('/events/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

router.delete('/events/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await Event.findByIdAndDelete(id);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete event' });
    }
  });

module.exports = router;
