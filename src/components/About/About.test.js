import React from "react";
import { render, screen } from "@testing-library/react";
import About from "./About";
import styles from "./About.module.css";

describe("About Component", () => {
  beforeEach(() => {
    render(<About />);
  });

  test("renders the title", () => {
    const titleElement = screen.getByRole("heading", { name: /about voam/i });
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the Our Story section", () => {
    const storySubtitle = screen.getByRole("heading", { name: /our story/i });
    const storyParagraph = screen.getByText(/voam is a clothing brand/i);
    expect(storySubtitle).toBeInTheDocument();
    expect(storyParagraph).toBeInTheDocument();
  });

  test("renders the Our Mission section", () => {
    const missionSubtitle = screen.getByRole("heading", {
      name: /our mission/i,
    });
    const missionParagraph = screen.getByText(
      /voam clothing has established itself/i
    );
    expect(missionSubtitle).toBeInTheDocument();
    expect(missionParagraph).toBeInTheDocument();
  });

  test("renders the images", () => {
    const mouthImage = screen.getByAltText(/voam mouth/i);
    const logoImage = screen.getByAltText(/voam logo/i);
    expect(mouthImage).toBeInTheDocument();
    expect(logoImage).toBeInTheDocument();
  });

  test("renders the correct classes", () => {
    const aboutContainer = screen
      .getByRole("heading", { name: /about voam/i })
      .closest("div");
    expect(aboutContainer).toHaveClass(styles.aboutContainer);

    const sections = screen
      .getAllByText(/our story/i)[0]
      .closest("div").parentNode;
    expect(sections).toHaveClass(styles.sections);
  });
});
