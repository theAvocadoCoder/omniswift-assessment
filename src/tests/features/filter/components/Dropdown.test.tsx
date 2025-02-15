import { describe, it, expect, beforeEach } from "vitest";
import Dropdown from "@features/filter/components/Dropdown";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "@utils/test-utils";
import userEvent from "@testing-library/user-event";

describe("Dropdown component", () => {

  beforeEach(() => {
    renderWithProviders(<Dropdown type="gender" />);
  })

  it("renders a select element with the right label and values", async () => {

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText(/gender/i)).toBeInTheDocument();
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("combobox"));
    expect(await screen.findByText(/female/i)).toBeInTheDocument();
  });

  it("clears the filter", async () => {
    await screen.findByText(/female/i);
    
    expect((screen.getByTestId("genderDropdown") as HTMLSelectElement).value)
    .toBe("");

    userEvent.selectOptions(
      screen.getByTestId("genderDropdown"),
      "female"
    );

    await waitFor(() => {
      expect((screen.getByTestId("genderDropdown") as HTMLSelectElement).value)
      .toBe("female");
    });
    
    fireEvent.click(
      screen.getByTestId("genderClearFilter")
    );
    
    expect((screen.getByTestId("genderDropdown") as HTMLSelectElement).value)
    .toBe("");
  })

})
