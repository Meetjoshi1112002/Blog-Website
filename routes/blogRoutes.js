import express from "express";
const router = express.Router();

import {
  handleGetRoute,
  handleGetViewRoute,
  handleEditRequestRoute,
  handleGetNewPostRoute,
  handleDeleteRoute,
  handleUpdateRoute,
  handleCreateNewPostRoute
} from "../Controller/blogController.js";

router.get("/", handleGetRoute);
router.get("/view/:id", handleGetViewRoute);
router.get("/edit/:id", handleEditRequestRoute);
router.get("/createPost", handleGetNewPostRoute);
router.post("/delete", handleDeleteRoute);
router.post("/update", handleUpdateRoute);
router.post("/create/save", handleCreateNewPostRoute);

export  {router};