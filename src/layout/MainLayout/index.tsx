import { Layout } from "antd";
import Sidebar from "./Sidebar/sidebar";
import styled, { keyframes } from "styled-components";
import { RenderLayoutRoute } from "../../routes/RenderRoute";
import { theme } from "../../theme/theme";
import { RoutesInterface } from "../../interface";
interface Props {
  router: RoutesInterface[];
  sidebar: RoutesInterface[];
}
const MainLayout = ({ router, sidebar }: Props) => {
  return (
    <LayoutStyle>
      <Sidebar value={sidebar} />
      <Main
        style={{
          padding: "10px 10px 10px 0px",
        }}
      >
        <RenderLayoutRoute router={router} />
      </Main>
    </LayoutStyle>
  );
};

export default MainLayout;
const fadeVisible = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;
const LayoutStyle = styled(Layout)`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const Main = styled(Layout)`
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  animation: ${fadeVisible} 0.2s;
  .form-section {
    .ant-form-item {
      margin-bottom: 10px;
      .ant-input[disabled] {
        background-color: #f4f4f4;
        border-color: #d9d9d9;
        box-shadow: none;
        cursor: not-allowed;
        color: ${theme.textMainColorBlack};
      }
      .ant-input-affix-wrapper-disabled {
        border: none;
        color: black;
        opacity: 0.8;
        border-bottom-left-radius: 0px;
        border-top-left-radius: 0px;
        background-color: ${theme.inputFilColor};
      }
      .ant-picker.ant-picker-disabled {
        input {
          color: ${theme.textMainColorBlack};
        }
        padding-left: 2px;
        padding-right: 2px;
      }
      .ant-input-prefix {
        margin-right: 4px;
        color: ${theme.textMainColorBlack};
      }
      input {
        background-color: ${theme.inputFilColor};
        border: none;
      }
      label {
        font-weight: 500;
        color: ${theme.textSeccondColorBlack};
      }
      .ant-input[disabled] {
        background-color: #f4f4f4;
        border-color: #d9d9d9;
        box-shadow: none;
        cursor: not-allowed;
        color: ${theme.textMainColorBlack};
        opacity: 0.8;
      }
      .ant-input-status-error:not(.ant-input-disabled):not(
          .ant-input-borderless
        ).ant-input,
      .ant-input-status-error:not(.ant-input-disabled):not(
          .ant-input-borderless
        ).ant-input:hover {
        background: ${theme.inputFilColor};
        border-color: #ff2f32;
      }
      .ant-upload.ant-upload-select {
        width: 100%;
        button {
          border: none;
          background-color: ${theme.inputFilColor};
          width: 100%;
        }
      }
      .ant-input-number-disabled {
        color: ${theme.textMainColorBlack};
        opacity: 0.8;
      }
      .ant-select:not(.ant-select-customize-input) .ant-select-selector {
        position: relative;
        background-color: ${theme.inputFilColor};
        border: none;
        color: ${theme.textMainColorBlack};
        border-radius: 2px;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
    }
  }
`;
