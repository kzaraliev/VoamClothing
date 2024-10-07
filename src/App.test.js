import App from "./App";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react";

// Test if the navigation component is rendering
test("Renders Navigation component", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  const navigation = screen.getByRole("navigation");
  expect(navigation).toBeInTheDocument();
});

// Test that the Footer component is rendering
test("Renders Footer component", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  const footer = screen.getByRole("contentinfo");
  expect(footer).toBeInTheDocument();
});