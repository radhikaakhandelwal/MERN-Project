// import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Box, useColorModeValue } from "@chakra-ui/react";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<ProductPage />} />
      </Routes>
    </Box>
  );
}

export default App;
