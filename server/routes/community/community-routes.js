const express = require('express');
const Event = require('../../models/Event');
const Message = require('../../models/Message');

const router = express.Router();

// DELETE a message by ID
router.delete('/messages/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});


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

// POST a new message with username
router.post('/messages', async (req, res) => {
  const { username, text, timestamp } = req.body;

  // Validate input
  if (!username || !text || !timestamp) {
    return res.status(400).json({ error: 'Username, text, and timestamp are required.' });
  }

  try {
    const newMessage = await Message.create({ username, text, timestamp });
    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// POST a new event
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

// DELETE an event by ID
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