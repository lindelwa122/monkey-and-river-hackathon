const MonitoredDestination = require('../models/MonitoredDestination');

module.exports = {
  // Create
  create: async (req, res) => {
    const { location, risk_level, hasChecked } = req.body;
    const userId = req.user.id; // assuming JWT middleware added user info to req.user!! We need to come back here

    try {
      const destination = await MonitoredDestination.create({
        location,
        risk_level,
        hasChecked,
        user_id: userId
      });
      res.status(201).json(destination);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create destination', error });
    }
  },

  // Get All for a user
  getAll: async (req, res) => {
    const userId = req.user.id;

    try {
      const destinations = await MonitoredDestination.find({ user_id: userId });
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch destinations', error });
    }
  },

  // Get One by ID
  getById: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
      const destination = await MonitoredDestination.findOne({ _id: id, user_id: userId });
      if (!destination) {
        return res.status(404).json({ message: 'Destination not found' });
      }
      res.json(destination);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch destination', error });
    }
  },

  // Update by ID
  update: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
      const updated = await MonitoredDestination.findOneAndUpdate(
        { _id: id, user_id: userId },
        req.body,
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ message: 'Destination not found or unauthorized' });
      }

      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update destination', error });
    }
  },

  // Delete by ID
  delete: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
      const deleted = await MonitoredDestination.findOneAndDelete({ _id: id, user_id: userId });
      if (!deleted) {
        return res.status(404).json({ message: 'Destination not found or unauthorized' });
      }

      res.json({ message: 'Destination deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete destination', error });
    }
  }
};
