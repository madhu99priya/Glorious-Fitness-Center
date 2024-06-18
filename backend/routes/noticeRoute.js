import express from 'express';
import Notice from '../models/noticemodel.js';

const router = express.Router();

// Get all notices
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single notice
router.get('/:id', getNotice, (req, res) => {
  res.json(res.notice);
});

// Create a notice
router.post('/', async (req, res) => {
  const notice = new Notice({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    const newNotice = await notice.save();
    res.status(201).json(newNotice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a notice
router.patch('/:id', getNotice, async (req, res) => {
  if (req.body.title != null) {
    res.notice.title = req.body.title;
  }
  if (req.body.content != null) {
    res.notice.content = req.body.content;
  }
  res.notice.updatedAt = Date.now();

  try {
    const updatedNotice = await res.notice.save();
    res.json(updatedNotice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a notice
// router.delete('/:id', getNotice, async (req, res) => {
//   try {
//     await res.notice.remove();
//     res.json({ message: 'Deleted Notice' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await Notice.findByIdAndDelete(id);
  
      if (!result) {
        return res.status(404).send({ message: 'Notice cannot find' });
      }
  
      return res.status(200).send({ message: 'Notice is deleted successfully' });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });

// Middleware to get notice by id
async function getNotice(req, res, next) {
  try {
    const notice = await Notice.findById(req.params.id);
    if (notice == null) {
      return res.status(404).json({ message: 'Cannot find notice' });
    }
    res.notice = notice;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default router;
