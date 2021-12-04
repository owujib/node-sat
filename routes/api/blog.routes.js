const multer = require('multer');
const path = require('path');
const { authorize, roles } = require('../../controllers/authController');
const Blog = require('../../models/Blog');
const ApiError = require('../../utils/apiError');

const router = require('express').Router();

//TODO: create a controller for your blog routes
//TODO: create update and delete controller for blog
//TODO: add user upload functionality

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/blog-img');
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    callback(null, file.fieldname + '-' + uniqueSuffix + extname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, callback) => {
    let fileType = ['image/jpeg', 'image/png'];
    if (!fileType.includes(file.mimetype)) {
      return callback(
        new Error('file type not supported upload png, jpeg or jpg'),
        false,
      );
    }

    return callback(null, true);
  },
});

router.post(
  '/create',
  authorize,
  roles('user'),
  upload.single('blogImage'),
  async (req, res, next) => {
    try {
      console.log(req.file);
      const blog = new Blog({
        title: req.body.title,
        description: req.body.description,
        image: `blog-img/${req.file.filename}`,
      });

      await blog.save();
      return res.status(201).json({
        status: 'success',
        data: blog,
      });
    } catch (error) {
      return next(error);
    }
  },
);

router.get('/', async (req, res, next) => {
  try {
    const blog = await Blog.find();

    if (blog.length === 0) {
      return next(new ApiError('no post', 404));
    }

    return res.status(200).json({
      status: 'success',
      data: blog,
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById({ _id: req.params.id });

    if (!blog) {
      return next(new ApiError('no post', 404));
    }

    return res.status(200).json({
      status: 'success',
      data: blog,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
