import React from "react";
import { Row, Space } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../../../theme/theme";
import { RoutesInterface } from "../../../../routes/interface/router";
interface Props {
  isActiveLink: (arg: string) => boolean;
  item: RoutesInterface;
}
function SidebarItem({ isActiveLink, item }: Props) {
  return (
    <Main isActive={isActiveLink(item.path)}>
      <Link to={item.path}>
        <Row justify={"center"}>
          {item.icon!! && <img src={item.icon} alt="menu icon" width={22} />}
          <span className="sider-menu-item-text">{item.name}</span>
        </Row>
      </Link>
    </Main>
  );
}

export default SidebarItem;
const Main = styled(Row)`
  padding: 10px;
  border-radius: 15px;
  transition: ease-in 0.2s;
  border: solid 2px transparent;
  background-color: ${({ isActive }: { isActive: boolean }) =>
    isActive ? theme.seccondColor : "transparent"};

  :hover {
    cursor: pointer;
    border: solid 2px ${theme.seccondColor};
  }
  a {
    color: ${({ isActive }: { isActive: boolean }) =>
      isActive ? "white" : theme.seccondColor};
    font-weight: bold;
  }
`;
