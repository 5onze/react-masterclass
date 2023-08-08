import { useForm } from "react-hook-form";
import styled from "styled-components";
import curriedTransparentize from "polished/lib/color/transparentize";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

const Wrapper = styled.div`
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
const Title = styled.h2`
  margin-bottom: 10px;
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
interface IForm {
  listTitle: string;
}

function AddBoard() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  // add board form
  const onVaild = ({ listTitle }: IForm) => {
    setToDos((allBoards) => {
      return { ...allBoards, [listTitle]: [] };
    });
    setValue("listTitle", "");
  };
  return (
    <Wrapper>
      <Title>+Add another list</Title>
      <Form onSubmit={handleSubmit(onVaild)}>
        <input
          {...register("listTitle", { required: true })}
          type="text"
          placeholder="Enter list title..."
        />
      </Form>
    </Wrapper>
  );
}

export default AddBoard;
