import { useAppDispatch, useAppSelector } from "@app/hooks";
import Dropdown from "./components/Dropdown";
import { FilterState, selectActiveFilters, setFilter } from "./filterSlice";


function Filter() {
  const filters: (keyof FilterState)[] = ["age", "state", "level", "gender"];
  const activeFilters = useAppSelector(selectActiveFilters);
  const dispatch = useAppDispatch();

  // @ts-expect-error: Function will be used after todo is complete
  // eslint-disable-next-line
  function filterData() {
    // TODO: Implement search function to filter data
  }

  function clearFilter(type: keyof FilterState) {
    dispatch(setFilter({ key: type, value: "" }));
  }

  return (
    <section>
      <h2 className="text-[#616161] text-2xl" data-testid="filterheading">Filter Student Table By:</h2>

      <div className="flex gap-3 md:gap-5 lg:gap-10 flex-wrap">
        {filters.map(filterType => (
          <div key={`${filterType}-select-div`} className="relative w-[min(100%,19.5rem)]">
            <Dropdown key={filterType} type={filterType} />
            <button 
              onClick={() => clearFilter(filterType)}
              aria-label={`clear ${filterType} filter`} 
              className={`${activeFilters.map(f=>f[0]).includes(filterType) ? '': 'hidden'} absolute -right-2 top-2 w-6 h-6 bg-red-600 text-white cursor-pointer flex justify-center items-center rounded-full`}
            >
              <span className="[line-height:1] align-middle font-bold text-2xl">&times;</span>
            </button>
          </div>
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