import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { UserRepository } from '../repositories/userRepository';
import { hashPassword } from '../helpers/hashHelper';

const authService = new AuthService();
const userRepository = new UserRepository();

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const passwordHash = hashPassword(password);
    const user = await authService.signUp(name, email, passwordHash);
    res.status(201).json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'Erro desconhecido ao registrar usuário.' });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await authService.signIn(email, password);
    res.status(200).json(user); 
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ error: err.message });
    } else {
      res.status(401).json({ error: 'Erro desconhecido ao realizar login.' });
    }
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error('Erro ao obter usuários:', err); 
    res.status(500).json({ error: 'Erro ao obter usuários.' }); 
  }
};
