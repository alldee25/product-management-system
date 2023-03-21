import React from "react";
import Swal from "sweetalert2";
import { Form } from "antd";
import ProductFormLayout from "./productFormLayout/productFormLayout";
import { ProductColorInterface } from "../../../components/form/product/Product";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function Product({ open, setOpen }: Props) {
  const [form] = Form.useForm();
  const [productColors, setProductColors] = React.useState<
    ProductColorInterface[]
  >([
    {
      color: "",
      fileList: [],
    },
  ]);

  async function onFinish(values: any) {
    try {
      const res = await addDoc(collection(db, "product"), {
        name: values.name,
        price: values.price,
      });
      Swal.fire({
        title: "Success!",
        text: "Product is added",
        icon: "success",
      });
      setOpen(false);
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <ProductFormLayout
      form={form}
      formName="addProduct"
      onFinish={onFinish}
      setProductColors={setProductColors}
      productColors={productColors}
      setOpen={setOpen}
      open={open}
    />
  );
}

export default Product;
