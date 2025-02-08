import React from "react";
import { render, screen } from "@testing-library/react";
import Contact from "./Contact";
import { MdEmail } from "react-icons/md";
import { FaTiktok, FaInstagram } from "react-icons/fa";

describe("Contact Component", () => {
  beforeEach(() => {
    render(<Contact />);
  });

  test("renders the title", () => {
    const titleElement = screen.getByRole("heading", { name: /contacts/i });
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the subtitle", () => {
    const subtitleElement = screen.getByText(/feel free to connect with us/i);
    expect(subtitleElement).toBeInTheDocument();
  });

  test("renders the contact methods", () => {
    const emailLink = screen.getAllByRole("link")[0];
    const instagramLink = screen.getAllByRole("link")[1];
    const tiktokLink = screen.getAllByRole("link")[2];

    expect(emailLink).toBeInTheDocument();
    expect(instagramLink).toBeInTheDocument();
    expect(tiktokLink).toBeInTheDocument();
  });

  test("renders the correct email link", () => {
    const emailLink = screen.getAllByRole("link")[0];
    expect(emailLink).toHaveAttribute("href", "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=voaminfo@gmail.com");
  });

  test("renders the correct Instagram link", () => {
    const instagramLink = screen.getAllByRole("link")[1];
    expect(instagramLink).toHaveAttribute("href", "https://www.instagram.com/voamclothing_/");
  });

  test("renders the correct TikTok link", () => {
    const tiktokLink = screen.getAllByRole("link")[2];
    expect(tiktokLink).toHaveAttribute("href", "https://www.tiktok.com/@voamclothing");
  });

  test("renders the FAQ section", () => {
    const faqTitle = screen.getByRole("heading", { name: /frequently asked questions/i });
    expect(faqTitle).toBeInTheDocument();

    const faqs = [
      /how long does delivery take/i,
      /product quality\?/i,
      /can i return a product\?/i,
      /what happens if a product is out of stock\?/i,
    ];

    faqs.forEach((faq) => {
      expect(screen.getByRole("heading", { name: faq })).toBeInTheDocument();
    });
  });

  test("renders accordion body content", () => {
    // Expand the first accordion item
    const deliveryHeader = screen.getByRole("heading", { name: /how long does delivery take/i });
    deliveryHeader.click(); // Simulate user clicking to expand

    const deliveryBody = screen.getByText(/the delivery time depends on your location/i);
    expect(deliveryBody).toBeInTheDocument();

    // Test other accordion items if needed
    const qualityHeader = screen.getByRole("heading", { name: /product quality\?/i });
    qualityHeader.click();
    const qualityBody = screen.getByText(/we are committed to delivering products/i);
    expect(qualityBody).toBeInTheDocument();
  });
});
