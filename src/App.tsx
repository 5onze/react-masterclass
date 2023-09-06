import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import AddBoard from "./Components/AddBoard";
import { useState, useEffect } from "react";

const Wrapper = styled.div``;

const Container = styled.div`
  display: inline-flex;
  /* min-height: 100vh;
  min-width: 100vw; */
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [ordered, setOrdered] = useState(Object.keys(toDos));
  useEffect(() => {
    setOrdered(Object.keys(toDos));
  }, [toDos]);
  // todolist drag
  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    // 시작한 위치와 끝난 위치가 같을때
    if (!destination) return;
    // did not move anywhere
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // board 간의 이동.
    // 보드가 이동할 경우.
    if (type === "BOARD") {
      setOrdered((allBoards) => {
        const nameArray = [...allBoards];
        const [removed] = nameArray.splice(source.index, 1);
        nameArray.splice(destination?.index, 0, removed);
        return [...nameArray];
      });
    }

    // todo task 이동.
    if (type === "TODOS") {
      // same board movement.
      if (destination?.droppableId === source.droppableId) {
        setToDos((allBoards) => {
          const boardCopy = [...allBoards[source.droppableId]];
          const taskObj = boardCopy[source.index];
          boardCopy.splice(source.index, 1); // 1개 지우기
          boardCopy.splice(destination?.index, 0, taskObj); // taskObj: todo의 위치 찾기
          return {
            ...allBoards,
            [source.droppableId]: boardCopy,
          };
        });
      }
      // cross board movement
      if (destination?.droppableId !== source.droppableId) {
        setToDos((allBoards) => {
          const sourceBoard = [...allBoards[source.droppableId]];
          const taskObj = sourceBoard[source.index];
          const destinationBoard = [...allBoards[destination.droppableId]];
          sourceBoard.splice(source.index, 1); // 기존 보드에서 item 삭제
          destinationBoard.splice(destination?.index, 0, taskObj); // 새로운 보드에 item 추가
          return {
            ...allBoards,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destinationBoard,
          };
        });
      }
    }
  };

  return (
    <Wrapper>
      <AddBoard />
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="board" type="BOARD" direction="horizontal">
            {(provided) => (
              <Container ref={provided.innerRef} {...provided.droppableProps}>
                {ordered?.map((boardId, index) => (
                  <Board
                    key={boardId}
                    index={index}
                    boardId={boardId}
                    toDoList={toDos[boardId]}
                  />
                ))}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </Wrapper>
  );
}

export default App;
