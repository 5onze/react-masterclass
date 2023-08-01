import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { Categories, categoryState, toDoSelector, toDoState } from "../atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const setToDos = useSetRecoilState(toDoState);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  // 마운트되었을 때 localStorage 데이터 불러오기
  useEffect(() => {
    const localeToDos = localStorage.getItem("todo");
    if (localeToDos) {
      const localeToDosList = JSON.parse(localeToDos);
      setToDos(localeToDosList);
    }
  }, [setToDos]);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
