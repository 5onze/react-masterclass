import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import { IToDo } from "../atoms";

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

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface IBoardProps {
  toDoList: IToDo[];
  boardId: string;
  todosDeleteBtn(id: number): void;
}

function CardList({ toDoList, boardId, todosDeleteBtn }: IBoardProps) {
  return (
    <Droppable droppableId={boardId} type="TODOS">
      {(magic, info) => (
        <Area
          isDraggingOver={info.isDraggingOver}
          isDraggingFromThis={Boolean(info.draggingFromThisWith)}
          ref={magic.innerRef}
          {...magic.droppableProps}
        >
          {toDoList?.map((toDo, index) => (
            <DraggableCard
              key={toDo.id}
              index={index}
              id={toDo.id}
              text={toDo.text}
              todosDeleteBtn={todosDeleteBtn}
            />
          ))}
          {magic.placeholder}
        </Area>
      )}
    </Droppable>
  );
}

export default CardList;
