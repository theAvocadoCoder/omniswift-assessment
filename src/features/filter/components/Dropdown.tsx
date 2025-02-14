import { FilterState, setFilter } from "@features/filter/filterSlice";
import { useGetFilterOptionsQuery } from "../filtersApi";
import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { RootState } from "@app/store";

export type DropdownProps = {
  type: keyof FilterState
}

function Dropdown({type}: DropdownProps) {
  const { data: options, error, isLoading } = useGetFilterOptionsQuery(type);
  const selectedOption = useAppSelector((state: RootState) => state.filter[type]);
  const dispatch = useAppDispatch();

  function toggleSelect(event: ChangeEvent<HTMLSelectElement>) {
    dispatch(setFilter({ key: type, value: event.target.value}));
  }

  return (
    <div className="relative w-[min(100%,19.5rem)] [&::after]:[content:url(@assets/caret-down.svg)] [&::after]:[position:absolute] [&::after]:[top:40%] [&::after]:[right:1em] [&::after]:[pointer-events:none]">
      <label className="capitalize bg-white absolute left-4 top-1 px-1.5" htmlFor={`${type}-select`}>{type}</label>
      <select id={`${type}-select`} value={selectedOption} onChange={toggleSelect} className={`w-full h-[3.0625rem] mt-4 px-4 border border-gray-light rounded cursor-pointer appearance-none capitalize ${selectedOption ? "text-black" : "text-gray-light"}`}>
        {error ? (
          <option value="" disabled>Error</option>
        ) : isLoading ? (
          <option value="" disabled>Loading...</option>
        ) : options ? (
          <>
            <option value="" disabled>Select {type}</option>
            {options.map(option => (
              <option key={`${type}-${option.id}`} value={type === "state" ? option.name : option[type]} className="text-black capitalize">{type === "state" ? option.name : option[type]}</option>
            ))}
          </>
        ) : null}
      </select>
    </div>
  )
}

export default Dropdown