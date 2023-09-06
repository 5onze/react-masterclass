import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { IToDo, toDoState } from "../atoms";
import { useRecoilState } from "recoil";
import { useState } from "react";
import CardList from "./CardList";

const Wrapper = styled.div``;

const Container = styled.div`
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

const Header = styled.div<{ isDragging: boolean }>`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #dfe6e9;
  }
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
  toDoList: IToDo[];
  boardId: string;
  index: number;
}

interface IForm {
  toDo: string;
}

function Board({ toDoList, boardId, index }: IBoardProps) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [ordered, setOrdered] = useState(Object.keys(toDos));
  const { register, setValue, handleSubmit } = useForm<IForm>();
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
  const todosDeleteBtn = (id: number) => {
    setToDos((all) => {
      const copytodos = toDoList.filter((todo) => todo.id !== id);
      return {
        ...all,
        [boardId]: copytodos,
      };
    });
  };
  // remove Board
  const boardDeleteBtn = (boardId: string) => {
    //delete 방식
    /* setToDos((all) => {
      const copyall = { ...all };
      delete copyall[boardId];
      return { ...copyall };
    }); */
    // filter 방식
    setToDos((all) => {
      const copyboards = { ...all };
      const filter = Object.entries(copyboards)
        .filter(([key, value]) => key !== boardId)
        .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
      return filter;
    });
    setOrdered((all) => {
      const copyboards = [...all];
      const filter = copyboards.filter((i) => i !== boardId);
      return filter;
    });
  };
  return (
    <Wrapper>
      <Draggable key={boardId} draggableId={boardId} index={index}>
        {(provided, snapshot) => (
          <Container ref={provided.innerRef} {...provided.draggableProps}>
            <Header isDragging={snapshot.isDragging}>
              <Title {...provided.dragHandleProps}>{boardId}</Title>
              <span
                onClick={() => {
                  boardDeleteBtn(boardId);
                }}
              ></span>
            </Header>
            <Form onSubmit={handleSubmit(onValid)}>
              <input
                {...register("toDo", { required: true })}
                type="text"
                placeholder={`Add task on ${boardId}`}
              />
            </Form>
            <CardList
              key={boardId}
              boardId={boardId}
              toDoList={toDoList}
              todosDeleteBtn={todosDeleteBtn}
            />
          </Container>
        )}
      </Draggable>
    </Wrapper>
  );
}

export default Board;
