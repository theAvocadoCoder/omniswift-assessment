import Table from "@features/table/Table";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@utils/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

describe("Student Data Table section", () => {
  beforeEach(() => {
    renderWithProviders(<Table />);
  })

  it("renders the table with an initial loading state", () => {
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText(/loading data/i)).toBeInTheDocument();
  })

  it("initializes the table with unfiltered student data", async () => {
    await screen.findAllByText(/\d{3} level/i);
    expect(screen.getAllByText(/download result/i)[0]).toBeTruthy();
  })
})
