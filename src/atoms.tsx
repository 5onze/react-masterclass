import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IToDo {
  id: number;
  text: string;
}
export interface IToDoState {
  [key: string]: IToDo[];
}

// localStorage
const { persistAtom } = recoilPersist({
  key: "toDos",
  storage: localStorage,
});

export const toDoState = atom<IToDoState>({
  key: "toDoList",
  default: {
    "TO DO": [],
    Doing: [],
    Done: [],
  },
  effects: [persistAtom],
});
