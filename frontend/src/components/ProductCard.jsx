import React, { useState } from "react";
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
  VStack,
  Input,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedProduct, setUpdatedProduct] = useState(product);

  console.log("Image:", product.image);
  //set the colors
  let textColor = useColorModeValue(
    "rgba(92, 177, 115, 0.78)",
    "rgb(74, 93, 55)"
  );

  let bg = useColorModeValue("rgb(74, 93, 55)", "rgba(92, 177, 115, 0.78)");

  //   delete the products
  const toast = useToast();
  let { deleteProducts, updateProducts } = useProductStore();

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

  async function handleUpdate(pid, updatedProduct) {
    await updateProducts(pid, updatedProduct);
    onClose();
  }

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
      w={200}
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

      <Box>
        <HStack spacing={2} alignItems="center" p={8}>
          <Link>
            <Button variant="outline" onClick={() => onOpen()}>
              <CiEdit fontSize={30} />
            </Button>
          </Link>

          <Link>
            <Button variant="outline" onClick={() => handleDelete(product._id)}>
              <MdDeleteForever fontSize={30} />
            </Button>
          </Link>
        </HStack>
      </Box>

      {/* MODAL OVERLAY FOR UPDATING PRODUCTS */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={textColor}>Update Product</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              ></Input>
              <Input
                placeholder="Product Price"
                name="price"
                type="Number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              ></Input>
              <Input
                placeholder="Product Image"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              ></Input>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={() => handleUpdate(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
