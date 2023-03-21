import { Form } from "antd";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React from "react";
import Swal from "sweetalert2";
import { ProductColorInterface } from "../../../components/form/product/Product";
import { db } from "../../../firebase";
import ProductFormLayout from "./productFormLayout/productFormLayout";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}
function EditProduct({ open, setOpen, id }: Props) {
  const [form] = Form.useForm();
  const [productColors, setProductColors] = React.useState<
    ProductColorInterface[]
  >([
    {
      color: "",
      fileList: [],
    },
  ]);
  const [loading, setLoading] = React.useState(true);
  async function getProductApi(id: string) {
    try {
      const docRef = doc(db, "product", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("docSnap", docSnap.data());
        form.setFieldsValue({ ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function onFinish(values: any) {
    try {
      const washingtonRef = doc(db, "product", id);
      await updateDoc(washingtonRef, {
        name: values.name,
        price: values.price,
      });
      setOpen(false);
      Swal.fire({
        title: "success!",
        text: "product is updated",
        icon: "success",
      });
    } catch (error) {
      console.log("error", error);
    }
  }
  React.useEffect(() => {
    getProductApi(id);
  }, [open]);
  return (
    <ProductFormLayout
      form={form}
      onFinish={onFinish}
      formName="editProduct"
      setProductColors={setProductColors}
      productColors={productColors}
      setOpen={setOpen}
      open={open}
    />
  );
}

export default EditProduct;
