import React from "react";
import { db } from "../../firebase";
import styled from "styled-components";
import { theme } from "../../theme/theme";
import { ColumnsType } from "antd/es/table";
import { Button, Col, Row, Table } from "antd";
import { DeleteOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import AddProduct from "./product-operating/addProduct";
import EditProduct from "./product-operating/editProduct";
import { TableRowSelection } from "antd/es/table/interface";
import { ProductListInterface } from "../../interface/pages/product";
import Search from "antd/es/input/Search";

function ProductList() {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const [product, setProduct] = React.useState<ProductListInterface[]>([]);
  const [onAddProduct, setOnAddProduct] = React.useState(false);
  const [onEditProduct, setOnEditProduct] = React.useState(false);
  const [id, setId] = React.useState("");
  async function onSearchById(id: string) {
    const docRef = doc(db, "product", id);
    const docSnap = await getDoc(docRef);
    docSnap.data();
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function onSearchByProductName(id: string) {
    const docRef = doc(db, "product", id);
    const docSnap = await getDoc(docRef);
    docSnap.data();
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handelDelete(params: React.Key[]) {
    params.forEach(async (id) => {
      await deleteDoc(doc(db, "product", id.toString()));
    });
    setSelectedRowKeys([]);
  }
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<ProductListInterface> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys: any[]) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  const columns: ColumnsType<ProductListInterface> = [
    {
      title: "Product Id",
      dataIndex: "id",
    },
    {
      title: "Product Name",
      dataIndex: "name",
    },
    {
      title: "Product Price",
      dataIndex: "price",
    },
    {
      title: "Edit",
      render: (reccord) => (
        <Button
          style={{ width: "100%" }}
          onClick={() => {
            setOnEditProduct(true);
            setId(reccord.id);
          }}
        >
          <FormOutlined />
        </Button>
      ),
    },
  ];
  React.useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "product"),
      (snapShot) => {
        let data: any = [];
        snapShot.docs.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setProduct(data);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  return (
    <Main gutter={[0, 10]}>
      <Col md={24}>
        <Row style={{ paddingTop: "20px" }} className="header">
          <Col md={24}>
            <Row justify="space-between" gutter={[10, 20]}>
              <AddProduct open={onAddProduct} setOpen={setOnAddProduct} />
              <EditProduct
                open={onEditProduct}
                setOpen={setOnEditProduct}
                id={id}
              />
              <Col>
                <Row gutter={10}>
                  <Col>
                    <Row>
                      <Button
                        disabled={selectedRowKeys.length === 0}
                        type="primary"
                        danger
                        onClick={() => handelDelete(selectedRowKeys)}
                      >
                        <DeleteOutlined />
                        Delete Product
                      </Button>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Search
                        name="id"
                        placeholder="input id"
                        allowClear
                        enterButton="Search"
                        onSearch={onSearchById}
                      />
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Search
                        name="productName"
                        placeholder="input product name"
                        allowClear
                        enterButton="Search"
                        onSearch={onSearchByProductName}
                      />
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row justify={"end"}>
                  <Button
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                      border: "none",
                      color: `${theme.primaryColor}`,
                      fontWeight: "bold",
                      backgroundColor: "#33b500",
                    }}
                    onClick={() => setOnAddProduct(true)}
                  >
                    <PlusOutlined />
                    Create Product
                  </Button>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col md={24}>
        <Row className="content">
          <Table
            style={{ width: "100%" }}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={product}
            rowKey="id"
          />
        </Row>
      </Col>
    </Main>
  );
}

export default ProductList;
const Main = styled(Row)`
  height: 97vh;
  overflow: hidden;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  .header {
    border-radius: 15px;
  }
  .content {
    overflow-y: auto;
    height: 80vh;
    padding: 3px;
  }
`;
