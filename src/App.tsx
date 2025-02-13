import Filter from "@features/filter/Filter";
import Table from "@features/table/Table";

function App() {

  return (
    <main>
      <h1 data-testid="heading1">Student Data Table</h1>
      <Filter />
      <Table />
    </main>
  )
}

export default App
