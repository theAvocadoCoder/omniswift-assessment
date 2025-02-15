import { useAppSelector } from "@app/hooks";
import Dropdown from "./components/Dropdown";
import { FilterState, selectActiveFilters } from "./filterSlice";


function Filter() {
  const filters: (keyof FilterState)[] = ["age", "state", "level", "gender"];
  const activeFilters = useAppSelector(selectActiveFilters);

  // @ts-expect-error: Function will be used after todo is complete
  // eslint-disable-next-line
  function filterData() {
    // TODO: Implement search function to filter data
  }

  return (
    <section>
      <h2 className="text-[#616161] text-2xl" data-testid="filterheading">Filter Student Table By:</h2>

      <div className="flex gap-3 md:gap-5 lg:gap-10 flex-wrap">
        {filters.map(filterType => (
          <Dropdown key={`${filterType}-select-div`} type={filterType} />
        ))}
        <button className="btn rounded w-[min(100%,19.5rem)] h-[3.0625rem] mt-4 border border-transparent">Search</button>
      </div>

      <div className="">
        {
          activeFilters.every(f => !f[1]) ? (
            <div className="pt-9 pb-5 w-fit italic text-gray-500">No active filters</div>
          ) : (
            <span className="flex flex-wrap gap-5 pt-9">
              {
                activeFilters.map(f => (
                  <span key={`${f[0]}-${f[1]}`} className="border border-gray-400 py-2 px-3 uppercase w-[min(fit-content,10rem)]">
                    { f.join(": ") }
                  </span>
                ))
              }
            </span>
          )
        }
      </div>
    </section>
  )
}

export default Filter