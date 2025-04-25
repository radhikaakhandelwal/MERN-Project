import { useState } from "react";
import {
  Container,
  VStack,
  Heading,
  Box,
  Input,
  useColorModeValue,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";

const ProductPage = () => {
  let [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();
  const { createProducts } = useProductStore();

  async function handleAddProduct() {
    const { success, message } = await createProducts(newProduct);

    if (success) {
      toast({
        title: "Product created",
        description: "Your product has been successfully created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error - Product not created",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setNewProduct({ name: "", price: "", image: "" });
  }

  return (
    <Container maxW={"1140px"} px={8}>
      <VStack spacing={8}>
        <Heading
          as={"h1"}
          size={"xl"}
          textAlign={"center"}
          my={8}
          color={useColorModeValue(
            "rgba(92, 177, 115, 0.78)",
            "rgb(74, 93, 55)"
          )}
        >
          Create New Product
        </Heading>
        <Box
          w={"full"}
          // bg={useColorModeValue("white", "gray.800")}
          p={10}
          rounded={"lg"}
          shadow={"md"}
          bgGradient="linear(to-l,rgba(45, 183, 82, 0.78),rgb(74, 93, 55) )"
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              // borderColor={useColorModeValue("pink.300", "pink.700")}
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
