import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import curriedTransparentize from "polished/lib/color/transparentize";
import { useForm } from "react-hook-form";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;
const AddList = styled.div`
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background: ${(props) => curriedTransparentize(0.5, props.theme.boardColor)};
  border-radius: 5px;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-weight: 600;
  font-size: 18px;
  color: white;
  cursor: pointer;
  &:hover {
    background: ${(props) =>
      curriedTransparentize(0.8, props.theme.boardColor)};
    transition: background-color 0.1s ease-in-out;
  }
`;

interface IForm {
  listTitle: string;
}

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  // add board form
  const onVaild = ({ listTitle }: IForm) => {
    setToDos((allBoards) => {
      return { ...allBoards, [listTitle]: [] };
    });
    setValue("listTitle", "");
  };
  // todolist drag
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement.
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
    if (destination?.droppableId !== source.droppableId) {
      // cross board movement
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
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
          <AddList>
            <h2>+Add another list</h2>
            <form onSubmit={handleSubmit(onVaild)}>
              <input
                {...register("listTitle")}
                type="text"
                placeholder="Enter list title..."
              />
            </form>
          </AddList>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
