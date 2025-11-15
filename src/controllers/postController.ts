import { Request, Response } from "express";
import { Post } from "../models/Post"; // Импортируйте модель Post

// Создать пост
export const createPost = async (req: Request, res: Response) => {
  try {
    const { authorId, mediaURL, caption, tagIds, collectionIds } = req.body;

    if (!authorId || !mediaURL) {
      return res.status(400).json({ error: "Missing required fields: authorId or mediaURL" });
    }

    const post = new Post({
      author: authorId,
      mediaURL,
      caption: caption || undefined,
      tags: tagIds || [],
      collections: collectionIds || [],
    });

    await post.save();

    // Включаем связанные данные для ответа
    await post.populate('author tags collections');

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post", details: error });
  }
};
// Получить все посты с фильтрацией
export const getPost = async (req: Request, res: Response) => {
  try {
    const { tagId, authorId } = req.query;
    const where: any = {};

    // Фильтрация по наличию Tag ID в массиве tags поста
    if (tagId && typeof tagId === "string") {
      where.tags = tagId; // Предполагается, что tags - это массив ObjectId
    }
    
    // Фильтрация по автору
    if (authorId && typeof authorId === "string") {
      where.author = authorId;
    }

    const posts = await Post.find(where)
      .populate('author')       // Информация об авторе
      .populate('tags')         // Все связанные теги
      .populate('collections')   // Все связанные коллекции
      .populate('comments')      // Все связанные комментарии
      .sort({ createdAt: 'desc' }); // Сортируем по дате создания

    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts", details: error });
  }
};
