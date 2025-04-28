import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const Popup = () => {
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
    </>
  );
};

export default Popup;
