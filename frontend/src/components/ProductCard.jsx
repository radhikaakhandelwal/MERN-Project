import React from "react";
import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  Button,
  Link,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

import { useProductStore } from "../store/product";
import Popup from "./Popup";

const ProductCard = ({ product }) => {
  console.log("Image:", product.image);
  //set the colors
  let textColor = useColorModeValue(
    "rgba(92, 177, 115, 0.78)",
    "rgb(74, 93, 55)"
  );

  let bg = useColorModeValue("rgb(74, 93, 55)", "rgba(92, 177, 115, 0.78)");

  //   delete the products
  const toast = useToast();
  let { deleteProducts } = useProductStore();

  async function handleDelete(pid) {
    let { success, message } = await deleteProducts(pid);

    if (success) {
      toast({
        title: "Product deleted",
        description: "Your product has been deleted successfully.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error - Product not deleted",
        description: message,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  }

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4} textAlign="center" color={textColor}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontSize="xl" mb={4}>
          ${product.price}
        </Text>
      </Box>

      <HStack spacing={2} alignItems={"center"} p={3}>
        <Link to={"/create"}>
          <Button variant="outline">
            <CiEdit fontSize={30} />
          </Button>
        </Link>

        <Link to={"/create"}>
          <Button variant="outline" onClick={() => handleDelete(product._id)}>
            <MdDeleteForever />
          </Button>
        </Link>
      </HStack>
    </Box>
  );
};

export default ProductCard;
