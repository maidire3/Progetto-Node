const asyncHandler = require("../utils/async-handler");
const HttpError = require("../utils/http-error");
const parseId = require("../utils/parse-id");
const { isValidDateTime, validatePostPayload } = require("../utils/validation");
const postsService = require("../services/posts.service");

const listPosts = asyncHandler(async (req, res) => {
  const { publishedAt, city, interactionDate } = req.query;

  if (publishedAt && !isValidDateTime(publishedAt)) {
    throw new HttpError(400, "Il filtro publishedAt deve essere una data valida.");
  }

  if (interactionDate && !isValidDateTime(interactionDate)) {
    throw new HttpError(400, "Il filtro interactionDate deve essere una data valida.");
  }

  const posts = await postsService.getPosts({ publishedAt, city, interactionDate });

  res.status(200).json(posts);
});

const getPost = asyncHandler(async (req, res) => {
  const post = await postsService.getPostById(parseId(req.params.id));

  if (!post) {
    throw new HttpError(404, "Post non trovato.");
  }

  res.status(200).json(post);
});

const createPost = asyncHandler(async (req, res) => {
  validatePostPayload(req.body);
  const post = await postsService.createPost(req.body);
  res.status(201).json(post);
});

const updatePost = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  validatePostPayload(req.body);

  const existingPost = await postsService.getPostById(id);
  if (!existingPost) {
    throw new HttpError(404, "Post non trovato.");
  }

  const updatedPost = await postsService.updatePost(id, req.body);
  res.status(200).json(updatedPost);
});

const deletePost = asyncHandler(async (req, res) => {
  const deleted = await postsService.deletePost(parseId(req.params.id));

  if (!deleted) {
    throw new HttpError(404, "Post non trovato.");
  }

  res.status(204).send();
});

module.exports = {
  createPost,
  deletePost,
  getPost,
  listPosts,
  updatePost
};
