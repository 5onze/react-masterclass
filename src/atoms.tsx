import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}
export interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDoList",
  default: {
    "TO DO": [],
    Doing: [],
    Done: [],
  },
});
