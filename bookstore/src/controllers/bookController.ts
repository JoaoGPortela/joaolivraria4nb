import { Request, Response } from "express";
import { BookRepository } from "../repositories/bookRepository";
import {
  isValidBookTitle,
  isValidAuthor,
  isValidPrice,
} from "../helpers/validationHelper";

const bookRepository = new BookRepository();

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookRepository.getAllBooks();
    res.status(200).json(books);
  } catch (err) {
    console.error("Erro ao obter livros:", err);
    res.status(500).json({ error: "Erro ao obter livros." });
  }
};

export const addBook = async (req: Request, res: Response) => {
  const { title, author, price } = req.body;

  if (!isValidBookTitle(title)) {
    res
      .status(400)
      .json({ error: "O título deve ter pelo menos 3 caracteres." });
    return;
  }

  if (!isValidAuthor(author)) {
    res
      .status(400)
      .json({ error: "O autor é obrigatório e deve ser uma string válida." });
    return;
  }

  if (!isValidPrice(price)) {
    res.status(400).json({ error: "O preço deve ser um número positivo." });
    return;
  }

  try {
    const book = await bookRepository.addBook(title, author, price);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: "Erro ao adicionar o livro." });
  }
};
