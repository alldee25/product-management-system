import { Button, Col, Layout, Row } from "antd";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import SidebarItem from "./sidebarItem/sidebarItem";
import { RoutesInterface } from "../../../interface";
import { getAuth, signOut } from "firebase/auth";
import { useAuthContextDispatch } from "../../../context/Auth/store";
const { Sider } = Layout;
interface Props {
  value: RoutesInterface[];
}
const SidebarMenu = ({ value }: Props) => {
  const { pathname } = useLocation();
  const { _signOut } = useAuthContextDispatch();
  const isActiveLink = (path: string) => {
    return pathname.startsWith(path);
  };
  async function logOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        _signOut();
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      width={"200"}
      trigger={null}
      style={{
        padding: "10px",
        backgroundColor: "transparent",
        height: "100vh",
      }}
    >
      <Main justify={"center"} align="stretch">
        <Col md={24} className="side-menu">
          <Row justify={"center"} align="middle" style={{ height: "20vh" }}>
            <div className="sider-header">
              <img
                src={`${require("../../../assets/images/6378220.jpg")}`}
                alt=""
                style={{
                  width: "100%",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>
          </Row>
          <Row
            justify={"center"}
            gutter={[0, 10]}
            style={{ marginTop: "20px" }}
          >
            {value.map((item, index) => (
              <Col md={24} key={index}>
                <SidebarItem isActiveLink={isActiveLink} item={item} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={24} className="side-signout">
          <Row justify={"center"}>
            <Button
              style={{ width: "100%" }}
              shape="round"
              onClick={() => logOut()}
            >
              log out
            </Button>
          </Row>
        </Col>
      </Main>
    </Sider>
  );
};

export default SidebarMenu;
const Main = styled(Row)`
  height: 100%;
  padding: 10px;
  border-radius: 30px;
  display: flex;
  flex-flow: column;
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  .side-menu {
    flex: 1 1 auto;
    .sider-header {
      height: 100%;
      border-radius: 20px;
      overflow: hidden;
    }
  }
  .side-signout {
    flex: 0 1 auto;
  }
`;
