import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../App";

describe ("App component", () => {
  it("renders hello world", () => {
    render(<App />);
    const helloWorld = screen.getByTestId("helloWorld");
    expect(helloWorld).toBeInTheDocument();
    expect(helloWorld).toHaveTextContent("Hello, world!");
    expect(helloWorld.tagName).toBe("H1");
  })
})
