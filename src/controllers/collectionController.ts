import { Request, Response } from "express";
import { Collection } from "../models/Collection"; // Импортируйте модель Collection

// Создать коллекцию
export const createCollection = async (req: Request, res: Response) => {
  try {
    const { name, ownerId, postIds, description, coverImage } = req.body;

    // Проверяем обязательные поля: name и ownerId
    if (!name || !ownerId) {
      return res.status(400).json({ error: "Missing required fields: name and ownerId" });
    }

    const collection = new Collection({
      name,
      owner: ownerId, // Обязательное поле
      description: description || undefined, // Опциональное
      coverImage: coverImage || undefined,   // Опциональное
      posts: postIds || [], // Связь Many-to-Many с постами
    });

    await collection.save();

    // Включаем информацию о владельце и постах
    await collection.populate('owner posts');

    res.status(201).json(collection);
  } catch (error) {
    console.error("Error creating collection:", error);
    res.status(500).json({ error: "Failed to create collection", details: error });
  }
};
// Получить все коллекции (опционально фильтр по ownerId)
export const getCollections = async (req: Request, res: Response) => {
  try {
    const { ownerId } = req.query;
    const where: any = {};
    
    // Фильтрация по владельцу
    if (ownerId && typeof ownerId === "string") {
      where.owner = ownerId; // Изменено на owner для соответствия модели
    }

    const collections = await Collection.find(where)
      .populate('owner posts'); // Включаем владельца и посты

    res.json(collections);
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ error: "Failed to fetch collections", details: error });
  }
};
