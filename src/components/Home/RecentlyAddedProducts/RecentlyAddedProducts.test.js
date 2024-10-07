import { render, screen, waitFor } from "@testing-library/react";
import RecentlyAddedProducts from "./RecentlyAddedProducts";
import * as productService from "../../../services/productService";
import { MemoryRouter } from "react-router-dom";
import { act } from "react";

jest.mock("../../../services/productService");

describe("RecentlyAddedProducts", () => {
  const mockProducts = [
    {
      id: 1,
      name: "Product 1",
      price: "$10.00",
      images: [{ filePath: "image1.jpg" }],
    },
    {
      id: 2,
      name: "Product 2",
      price: "$20.00",
      images: [{ filePath: "image2.jpg" }],
    },
  ];

  beforeEach(() => {
    productService.getLatest.mockReset();
  });

  test("renders products after loading", async () => {
    productService.getLatest.mockResolvedValueOnce(mockProducts);

    await act(async () => {
      render(
        <MemoryRouter>
          <RecentlyAddedProducts />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Recently added products:")).toBeInTheDocument();
    });

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  test("renders carousel for small screen", async () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 500,
    });

    productService.getLatest.mockResolvedValueOnce(mockProducts);

    await act(async () => {
      render(
        <MemoryRouter>
          <RecentlyAddedProducts />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument(); // Ensure that products are displayed
    });

    const carouselItems = screen.getAllByRole("link"); // Querying by role "link" since products are wrapped in <a>
    expect(carouselItems.length).toBe(mockProducts.length); // Check if the number of links matches mockProducts length
  });

  test("renders grid for large screen", async () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1200,
    });

    productService.getLatest.mockResolvedValueOnce(mockProducts);

    await act(async () => {
      render(
        <MemoryRouter>
          <RecentlyAddedProducts />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });

    // Get all product items directly by their names
    const productItems = mockProducts.map((product) =>
      screen.getByText(product.name)
    );

    expect(productItems.length).toBe(mockProducts.length); // Ensure it matches the mock data length

    // Optionally, you can also check if all products are present in the document
    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });
});
