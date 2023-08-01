import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  // localStorage에 데이터 저장하기
  const saveToDos = () => {
    localStorage.setItem("todo", JSON.stringify(toDos));
  };
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => {
      return [{ text: toDo, id: Date.now(), category: category }, ...oldToDos];
    });
    setValue("toDo", "");
    saveToDos();
  };
  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit(handleValid)}
    >
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
