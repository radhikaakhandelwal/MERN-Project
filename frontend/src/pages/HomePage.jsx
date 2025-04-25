import {
  Container,
  VStack,
  Heading,
  SimpleGrid,
  Box,
  Text,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  let { getProducts, products } = useProductStore();
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  console.log(products);

  return (
    <Container>
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
          Current Products
        </Heading>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
            // <Box bg="tomato" height="80px">
            //   {p.name}
            // </Box>
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <>
            <Text
              fontSize="xl"
              textAlign={"Center"}
              fontWeight="bold"
              fontFamily={"sans-serif"}
              color="rgb(130, 154, 105)"
            >
              No Products Found!
            </Text>
            <Link to={"/create"}>
              <Button
                variant="outline"
                color="rgb(130, 154, 105)"
                borderWidth={3}
                borderColor={"rgba(92, 177, 115, 0.78)"}
              >
                Create new product
              </Button>
            </Link>
          </>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
