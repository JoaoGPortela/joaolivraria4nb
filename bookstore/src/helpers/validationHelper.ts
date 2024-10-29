export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPrice = (price: number): boolean => {
  return price > 0;
};

export const isValidBookTitle = (title: string): boolean => {
  return typeof title === 'string' && title.length >= 3;
};

export const isValidAuthor = (author: string): boolean => {
  return typeof author === 'string' && author.trim().length > 0;
};