const express = require('express');
const router = express.Router();
const { getSubjects, createSubject, deleteSubject } = require('../controllers/subjectController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected 🔐
router.get('/', protect, getSubjects);
router.post('/', protect, createSubject);
router.delete('/:id', protect, deleteSubject);

module.exports = router;