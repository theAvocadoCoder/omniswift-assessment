import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import App from "../App";
import { Provider } from "react-redux";
import store from "@app/store";

describe ("App component", () => {

  beforeEach(() => {
    render(<Provider store={store}><App /></Provider>);
  });

  it("renders the main heading", () => {
    const heading1 = screen.getByTestId("heading1");
    expect(heading1).toBeInTheDocument();
    expect(heading1).toHaveTextContent(/student data table/i);
    expect(heading1.tagName).toBe("H1");
  })

  it("renders the Filter component", () => {
    const filterheading = screen.getByTestId("filterheading");
    expect(filterheading).toBeInTheDocument();
    expect(filterheading).toHaveTextContent(/filter student table by:/i);
  })
})
