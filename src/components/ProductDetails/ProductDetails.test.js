import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import * as productService from "../../services/productService";
import { CartProvider } from "../../context/cartContext";
import Swal from "sweetalert2";
import { act } from "react";
import { MemoryRouter } from "react-router-dom";

// Mock the service function and the context
jest.mock("../../services/productService");
jest.mock("sweetalert2");

const mockProduct = {
  id: "1",
  name: "Test Product",
  price: 20,
  description: "A test product.",
  images: [{ filePath: "test-image.jpg" }],
  sizes: [{ name: "S" }, { name: "M" }, { name: "L" }],
};

describe("ProductDetails", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    productService.getOne.mockResolvedValue(mockProduct);
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <CartProvider>
          <ProductDetails />
        </CartProvider>
      </MemoryRouter>
    );

  test("renders product details correctly", async () => {
    await act(async () => {
      renderComponent();
    });

    // Wait for the product data to be loaded
    expect(await screen.findByText(mockProduct.name)).toBeInTheDocument();

    expect(screen.getByText(`: ${mockProduct.price} lv.`)).toBeInTheDocument();
    expect(
      screen.getByText(`: ${mockProduct.description}`)
    ).toBeInTheDocument();
  });

  test("shows error when invalid size is selected", async () => {
    await act(async () => {
      renderComponent();
    });

    // Try to submit the form without selecting a size
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText("Amount"), { target: { value: 1 } });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));
    });

    expect(await screen.findByText(/select product size/i)).toBeInTheDocument();
  });

  test("shows error when amount is invalid", async () => {
    await act(async () => {
      renderComponent();
    });

    // Select a size
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "S" } });
    // Try to submit with an invalid amount
    fireEvent.change(screen.getByLabelText("Amount"), { target: { value: 0 } });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));
    });

    expect(await screen.findByText(/can't do this/i)).toBeInTheDocument();
  });

  test("calls addToCart and shows success message on valid submission", async () => {
    await act(async () => {
      renderComponent();
    });

    // Select size and amount
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "S" } });
    fireEvent.change(screen.getByLabelText("Amount"), { target: { value: 1 } });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));
    });

    // Check if Swal.fire is called
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Added to Cart!",
        text: "Your item has been successfully added to the shopping cart. Ready to check out or keep shopping?",
        icon: "success",
      })
    );
  });
});
