import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ShoppingCart from "./ShoppingCart";
import { CartProvider } from "../../context/cartContext";
import * as productService from "../../services/productService";
import { MemoryRouter } from "react-router-dom";

// Mock the product service
jest.mock("../../services/productService");

const renderComponent = (cart) => {
  return render(
    <MemoryRouter>
      <CartProvider value={{ cart }}>
        <ShoppingCart />
      </CartProvider>
    </MemoryRouter>
  );
};

describe("ShoppingCart", () => {
  test("renders empty cart message when there are no items in the cart", async () => {
    renderComponent([]);

    expect(await screen.findByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByText(/go ahead & explore/i)).toBeInTheDocument();
  });
});
