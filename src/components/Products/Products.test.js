import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Products from "./Products";
import * as productService from "../../services/productService";
import mockProducts from "../../test/mockProducts";
import { act } from "react";

jest.mock("../../services/productService");

describe("Products Component", () => {
  beforeEach(() => {
    productService.getAll.mockResolvedValue(mockProducts);
  });

  test("renders product cards after loading", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/All Items:/)).toBeInTheDocument();
      expect(screen.getAllByRole("link")).toHaveLength(mockProducts.length); // Ensure all product links are rendered
    });
  });

  test("sorts products by name", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      const dropdownToggle = screen.getByText(/Order by/);
      fireEvent.click(dropdownToggle);
      const nameOption = screen.getByText(/Name/);
      fireEvent.click(nameOption);
    });

    await waitFor(() => {
      // Check if the products are sorted by name
      const productNames = screen
        .getAllByText(/Product/i)
        .map((product) => product.textContent);

      const sortedNames = [...mockProducts]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((product) => product.name);
      expect(productNames).toEqual(sortedNames);
    });
  });
});
