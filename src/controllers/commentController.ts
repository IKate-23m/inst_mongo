import { Request, Response } from "express";
import { Comment } from "../models/Comment"; // Импортируйте модель Comment

// Создать комментарий
export const createComment = async (req: Request, res: Response) => {
  try {
    const { text, authorId, postId } = req.body;

    // Проверяем обязательные поля
    if (!text || !authorId || !postId) {
      return res.status(400).json({ error: "Text, authorId, and postId are required" });
    }

    const comment = new Comment({
      text,
      author: authorId, // Ссылка на автора
      post: postId,     // Ссылка на пост
    });

    await comment.save();

    // Включаем информацию о авторе и посте
    await comment.populate('author post');

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment", details: error });
  }
};
// Получить все комментарии для поста
export const getComments = async (req: Request, res: Response) => {
  try {
    const { postId } = req.query;

    // Проверка обязательного параметра postId
    if (!postId || typeof postId !== "string") {
      return res.status(400).json({ error: "postId is required to fetch comments for a post." });
    }

    const comments = await Comment.find({ post: postId })
      .populate('author post') // Включаем информацию о авторе и посте
      .sort({ createdAt: 'asc' }); // Сортируем по дате создания

    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments", details: error });
  }
};
