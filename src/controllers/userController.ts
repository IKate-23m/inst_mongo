import { Request, Response } from "express";
import { User } from "../models/User"; // Импортируйте модель User

// Создать пользователя
export const createUser = async (req: Request, res: Response) => {
  console.log("Received body:", req.body);
  try {
    const { email, username, role } = req.body;

    // Проверка обязательных полей
    if (!email || !username || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = new User({ email, username, role });
    await user.save();

    res.status(201).json(user);
  } catch (error: any) {
    console.error("Error creating user:", error);

    // Ошибка уникальности email или username
    if (error.code === 11000) { // Код ошибки Mongoose для уникальности
      return res.status(400).json({ error: "Email or username already exists" });
    }

    res.status(500).json({ error: "Failed to create user", details: error });
  }
};

// Получить всех пользователей
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Получить пользователя по ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Обновить пользователя
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, username, role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { email, username, role }, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error: any) {
    console.error("Error updating user:", error);
    
    // Ошибка уникальности email или username
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email or username already exists" });
    }
    
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Удалить пользователя
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
