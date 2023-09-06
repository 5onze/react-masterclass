import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  display: flex;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;
const Text = styled.div`
  flex-grow: 1;
`;
const Button = styled.button`
  border: 0;
  cursor: pointer;
`;
interface IDraggableCardProps {
  id: number;
  text: string;
  index: number;
  todosDeleteBtn(id: number): void;
}

function DraggableCard({
  id,
  text,
  index,
  todosDeleteBtn,
}: IDraggableCardProps) {
  return (
    <Draggable key={id + ""} draggableId={id + ""} index={index}>
      {(magic, snapshot) => {
        return (
          <Card
            isDragging={snapshot.isDragging}
            ref={magic.innerRef}
            {...magic.dragHandleProps}
            {...magic.draggableProps}
          >
            <Text>{text}</Text>
            <Button onClick={() => todosDeleteBtn(id)}>X</Button>
          </Card>
        );
      }}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
