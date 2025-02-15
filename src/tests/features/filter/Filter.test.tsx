import { beforeEach, describe, expect, it } from "vitest";
import Filter from "@features/filter/Filter";
import { renderWithProviders } from "@utils/test-utils";
import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

describe("Filter section", () => {
  beforeEach(() => {
    renderWithProviders(<Filter />);
  })

  it("renders the dropdowns and search button", () => {
    expect(screen.getByText(/age/i)).toBeInTheDocument();
    expect(screen.getByText(/gender/i)).toBeInTheDocument();
    expect(screen.getByText(/state/i)).toBeInTheDocument();
    expect(screen.getByText(/level/i)).toBeInTheDocument();

    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });

  it("updates information when the active filters change", async () => {

    expect(screen.getByText(/no active filters/i)).toBeInTheDocument();

    await screen.findByText(/abuja/i);

    userEvent.selectOptions(
      screen.getByTestId("stateDropdown"),
      "Abuja"
    );

    await waitFor(() => {
      expect((screen.getByTestId("stateDropdown") as HTMLSelectElement).value).toBe("Abuja")
      expect(screen.getByText(/state: abuja/i)).toBeInTheDocument();
    })
  })
})
