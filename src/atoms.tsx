import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}
export interface IToDoState {
  [key: string]: IToDo[];
}

// localStorage
const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    // setSelf 함수: 연결된 atom의 값을 초기화한다.
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    // onSet 함수: 해당하는 atom의 값이 변경이 되었을 때 실행되는 함수.
    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const toDoState = atom<IToDoState>({
  key: "toDoList",
  default: {
    "TO DO": [],
    Doing: [],
    Done: [],
  },
  effects: [localStorageEffect("toDos")],
});
