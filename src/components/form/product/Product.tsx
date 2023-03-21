import React from "react";
import {
  Col,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  UploadFile,
} from "antd";
interface Props {
  productColors: ProductColorInterface[];

  form: FormInstance;
}
export interface ProductColorInterface {
  color: string;
  fileList: UploadFile[];
}
function ProductForm({ productColors }: Props) {
  React.useEffect(() => {}, [productColors]);
  return (
    <Row gutter={[20, 10]} justify="center">
      <Col md={12}>
        <Form.Item
          name="name"
          label="ชื่อสินค้า"
          rules={[{ required: true, message: "กรุณาป้อนชื่อผลิตภัณฑ์" }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col md={12}>
        <Form.Item name="price" label="ราคา">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default ProductForm;
