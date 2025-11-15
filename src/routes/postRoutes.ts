import { Router } from "express";
import { createPost, getPost } from "../controllers/postController";

const router = Router();

router.post("/", createPost);  // Создать пост
router.get("/", getPost);     // Получить все посты (с фильтрацией по тегам)

export default router;
