import { useState } from "react";
import {
  Container,
  VStack,
  Heading,
  Box,
  Input,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";

const ProductPage = () => {
  let [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProducts } = useProductStore();

  async function handleAddProduct() {
    const { success, message } = await createProducts(newProduct);
    console.log("success:", success);
    console.log("message:", message);
  }

  return (
    <Container maxW={"1140px"} px={4}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"xl"} textAlign={"center"} my={8}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            ></Input>
            <Input
              placeholder="Product Price"
              name="price"
              value={newProduct.price}
              type="Number"
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            ></Input>
            <Input
              placeholder="Product Image"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            ></Input>
            <Button onClick={handleAddProduct}></Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default ProductPage;
