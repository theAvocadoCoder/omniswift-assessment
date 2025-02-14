import { describe, it, expect } from "vitest";
import Dropdown from "@features/filter/components/Dropdown";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "@utils/test-utils";

describe("Dropdown component", () => {
  it("renders a select element with the right label and values", async () => {
    renderWithProviders(<Dropdown type="gender" />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText(/gender/i)).toBeInTheDocument();
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("combobox"));
    expect(await screen.findByText(/female/i)).toBeInTheDocument();
  })

})
