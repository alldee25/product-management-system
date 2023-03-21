import styled, { keyframes } from "styled-components";
import { RoutesInterface } from "../../interface";
import { RenderLayoutRoute } from "../../routes/RenderRoute";

interface Props {
  router: RoutesInterface[];
}

const DefaultLayout = ({ router }: Props) => {
  return (
    <Main>
      <RenderLayoutRoute router={router} />
    </Main>
  );
};
export default DefaultLayout;
const fadeVisible = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;
const Main = styled.div`
  animation: ${fadeVisible} 0.3s;
`;
