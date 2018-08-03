const mongoose = require('mongoose');
const boom = require('boom');
const requireLogin = require('middlewares/requireLogin');

const Lesson = mongoose.model('Lesson');

module.exports = (app) => {
  app.get('/api/lessons/:id', requireLogin, async (req, res) => {
    const lesson = await Lesson.findOne({
      _user: req.user.id,
      _id: req.params.id,
    });

    if (!lesson) res.sendError(boom.notFound('Lesson not found'));

    res.sendSuccess(lesson);
  });

  app.get('/api/lessons', requireLogin, async (req, res) => {
    const lessons = await Lesson.find({ _user: req.user.id });
    res.sendSuccess(lessons);
  });

  app.post('/api/lessons', requireLogin, async (req, res) => {
    const { title, content, imageUrl } = req.body;

    const lesson = new Lesson({
      title,
      content,
      imageUrl,
      _user: req.user.id,
    });

    try {
      await lesson.save();
      res.sendSuccess(lesson);
    } catch (err) {
      res.sendError(boom.badRequest(err));
    }
  });
};
