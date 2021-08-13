const Post = require("../models/postModel");

exports.getAllPosts = async (req, res, next) => {
  // try {
  //   const posts = await Post.find({});
  //   res.status(200).json({
  //     status: "Succes",
  //     results: post.length,
  //     data: {
  //       posts,
  //     },
  //   });
  // } catch (e) {
  //   res.status(400).json({
  //     status: "Fail"

  //   });
  // }

  Post.find()
    .exec()
    .then((docs) => {
      res.status(200).json({
        status: "Success",
        results: docs.length,
        data: docs,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ status: "Failed", details: err });
    });
};

exports.getOnePost = async (req, res, next) => {
  //   try {
  //     const post = await Post.findById(req.params.id);
  //     res.status(200).json({
  //       status: "Succes",
  //       results: post.length,
  //       data: {
  //         post,
  //       },
  //     });
  //   } catch (e) {
  //     res.status(400).json({
  //       status: "Fail",
  //     });
  //   }
  // };
  Post.findById(req.params.id)
    .exec()
    .then((docs) => {
      res.status(200).json({
        status: "Success",
        results: docs.length,
        data: docs,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ status: "Failed", details: err });
    });
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json({
      status: "Success",
      data: {
        post,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "Fail",
    });
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });
    res.status(200).json({
      status: "Success",
      data: {
        post,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "Fail",
    });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Success",
    });
  } catch (e) {
    res.status(400).json({
      status: "Fail",
    });
  }
};
