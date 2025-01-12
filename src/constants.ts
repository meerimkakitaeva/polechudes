import { IAdmin, IQuestion } from "./types";

export const questions: IQuestion[] = [
  {
    id: "1",
    question: "Что использовали в Китае для глажки белья вместо утюга?",
    answer: "Сковорода",
  },
  {
    id: "2",
    question:
      "Животное, которое по своей зоркости может конкурировать с человеком, совой, кошкой?",
    answer: "Осьминог",
  },
  {
    id: "3",
    question: "Как раньше в Костромской области называли любое лекарство?",
    answer: "Лечила",
  },
];

export const adminLogin: IAdmin = {
  username: "admin",
  password: "123",
};
