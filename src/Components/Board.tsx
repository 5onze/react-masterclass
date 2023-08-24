import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TitleContainer = styled.div`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
  display: flex;
  align-items: center;
  span {
    width: 30px;
    height: 30px;
    cursor: pointer;
    display: block;
    background-color: #fff;
    opacity: 0.6;
    line-height: 30px;
    border-radius: 3px;
    font-size: 16px;
    &::after {
      content: "X";
      width: 30px;
      height: 30px;
    }
    &:hover {
      background-color: rgba(68, 84, 111, 0.4);
    }
  }
`;

const Title = styled.h2`
  flex-grow: 1;
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  input {
    font-size: 16px;
    border: 0;
    background-color: white;
    width: 80%;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    margin: 0 auto;
  }
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  // add ToDo
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };

  // remove todo
  const deleteClickHandler = (id: number) => {
    setToDos((all) => {
      const copytodos = toDos.filter((todo) => todo.id !== id);
      return {
        ...all,
        [boardId]: copytodos,
      };
    });
  };

  // remove Board
  const deleteItem = (boardId: string) => {
    setToDos((all) => {
      const copyall = { ...all };
      delete copyall[boardId];
      return { ...copyall };
    });
  };
  return (
    <Wrapper>
      <TitleContainer>
        <Title>{boardId}</Title>
        <span
          onClick={() => {
            deleteItem(boardId);
          }}
        ></span>
      </TitleContainer>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                id={toDo.id}
                text={toDo.text}
                deleteClick={deleteClickHandler}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
