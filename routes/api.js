import express from "express";
const router = express.Router();
import * as blogController from "../app/controllers/blogController.js";

// create Route
router.post("/create-blog", blogController.createBlog);

// read Route

router.get("/read-blog", blogController.readBlog);

// update Route

router.put("/update-blog", blogController.updateBlog);

// delete Route

router.delete("/delete-blog", blogController.deleteBlog);

export default router;
