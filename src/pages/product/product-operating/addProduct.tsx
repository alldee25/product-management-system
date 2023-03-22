import React from "react";
import Swal from "sweetalert2";
import { Form } from "antd";
import ProductFormLayout from "./productFormLayout/productFormLayout";
import { ProductColorInterface } from "../../../components/form/product/Product";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function Product({ open, setOpen }: Props) {
  const [loading, setLoading] = React.useState(false);
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
      setLoading(true);
      const productCollectionRef = collection(db, "product");
      const querySnapshot = await getDocs(productCollectionRef);
      const latestProductId =
        querySnapshot.docs.length > 0
          ? querySnapshot.docs[querySnapshot.docs.length - 1].data()[
              "productId"
            ]
          : null;
      const date = new Date();
      const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
      const numericPart = latestProductId
        ? parseInt(latestProductId.substr(2, 3)) + 1
        : 1;
      const newProductId = `PD${numericPart
        .toString()
        .padStart(3, "0")}-${formattedDate}`;
      await addDoc(collection(db, "product"), {
        productId: newProductId,
        name: values.name,
        price: values.price,
      });
      Swal.fire({
        title: "Success!",
        text: "Product is added",
        icon: "success",
      });
      form.resetFields();
      setOpen(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }
  return (
    <ProductFormLayout
      form={form}
      loading={loading}
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
