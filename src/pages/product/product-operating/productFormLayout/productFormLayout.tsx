import React from "react";
import { Button, Col, Form, FormInstance, Modal, Row } from "antd";
import styled from "styled-components";
import ProductForm, {
  ProductColorInterface,
} from "../../../../components/form/product/Product";
import { theme } from "../../../../theme/theme";
interface Props {
  form: FormInstance;
  productColors: ProductColorInterface[];
  setProductColors: React.Dispatch<
    React.SetStateAction<ProductColorInterface[]>
  >;
  onFinish: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formName: string;
}

function ProductFormLayout({
  form,
  productColors,
  onFinish,
  open,
  setOpen,
  formName,
}: Props) {
  return (
    <Modal
      title="product form"
      centered
      open={open}
      onCancel={() => setOpen(false)}
      width={1000}
      footer={[
        <Button type="primary" htmlType="submit" form={formName}>
          Save
        </Button>,
      ]}
    >
      <Main justify={"center"}>
        <Col md={24} style={{ height: "90%" }}>
          <Row className="box" gutter={[0, 10]} justify={"center"}>
            <Form
              layout="vertical"
              size="large"
              form={form}
              onFinish={onFinish}
              name={formName}
            >
              <ProductForm form={form} productColors={productColors} />
            </Form>
          </Row>
        </Col>
      </Main>
    </Modal>
  );
}

export default ProductFormLayout;
const Main = styled(Row)`
  height: 100%;
  overflow: hidden;
  .box {
    height: 100%;
    padding: 15px;
    display: flex;
    flex-flow: column;
    .header {
      display: flex;
      flex: 0 1 165px;
      height: 165px;
      align-items: center;
    }
    .content {
      flex: 1 1 auto;
      min-height: 92%;
      .step-box {
        height: 100%;
        border-radius: 20px;
        background-color: white;
        box-shadow: ${theme.boxShadow};
      }
      .form-box {
        height: 100%;
        overflow: hidden;
        border-radius: 20px;
        background-color: white;
        box-shadow: ${theme.boxShadow};
      }
    }
  }
`;
