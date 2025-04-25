import React from "react";
import {
  HStack,
  Container,
  Flex,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import { IoIosSunny, IoIosMoon } from "react-icons/io";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <Container maxW={"1140px"} px={4}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={{ base: "column", sm: "row" }}
        >
          <Text
            bgGradient="linear(to-l,rgba(45, 183, 82, 0.78),rgb(74, 93, 55) )"
            bgClip="text"
            fontSize="3xl"
            fontWeight="extrabold"
          >
            <Link to={"/"}>Product store</Link>
          </Text>

          <HStack spacing={2} alignItems={"center"}>
            <Link to={"/create"}>
              <Button variant="outline">
                <FaPlusSquare fontSize={30} />
              </Button>
            </Link>
            <Button variant="outline" onClick={toggleColorMode}>
              {colorMode === "light" ? (
                <IoIosSunny fontSize={30} />
              ) : (
                <IoIosMoon fontSize={30} />
              )}
            </Button>
          </HStack>
        </Flex>
      </Container>
    </div>
  );
};

export default Navbar;
