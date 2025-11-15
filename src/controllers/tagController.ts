import { Request, Response } from "express";
import { Tag } from "../models/Tag"; // Импортируйте модель Tag

// Создать тег
export const createTag = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Tag name is required" });
    }

    const tag = new Tag({ name });
    await tag.save();
    
    res.status(201).json(tag);
  } catch (error) {
    console.error("Error creating tag:", error);
    res.status(500).json({ error: "Failed to create tag", details: error });
  }
};

// Получить все теги
export const getTags = async (_req: Request, res: Response) => {
  try {
    const tags = await Tag.find(); // Получаем все теги из базы данных
    res.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Failed to fetch tags", details: error });
  }
};
