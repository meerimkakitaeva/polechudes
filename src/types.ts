export interface IQuestion {
  id: string;
  question: string;
  answer: string;
}

export interface IAdmin {
  username: string;
  password: string;
}

export interface IQMutation {
  question: string;
  answer: string;
}

export interface IQList {
  [id: string]: IQMutation;
}
