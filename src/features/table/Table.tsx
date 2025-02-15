import { useAppDispatch } from "@app/hooks";
import { useGetStudentDataQuery } from "./tableApi"
import { useSelector } from "react-redux";
import { initializeTable, selectStudentData } from "./tableSlice";
import { useEffect } from "react";


function Table() {
  const dispatch = useAppDispatch();
  const studentData = useSelector(selectStudentData);
  const { data: unfilteredStudentData, error, isLoading } = useGetStudentDataQuery();

  useEffect(() => {
    if (unfilteredStudentData) {
      dispatch(initializeTable(unfilteredStudentData));
    }
  }, [unfilteredStudentData, dispatch]);

  return (
    <section className="">
      <div className="scrollbar max-h-[30rem] overflow-y-scroll pr-3">
        <table 
          className="
            border-collapse w-full capitalize
            bg-white text-gray-primary
            [&_th,&_td]:p-3 [&_td]:bg-white
            [&_td:first-child,&_td:nth-of-type(4)]:text-center 
            [&_tr:not(:last-of-type)]:border-b [&_tr]:border-[#ECECEC]
            sm:[&_th:last-child,&_td:last-child]:sticky sm:[&_th:last-child,&_td:last-child]:right-0
          "
        >
          <thead className="bg-[#F9F9FA] [&_th]:bg-[#F9F9FA] sticky top-0 z-10">
            <tr>
              <th>S/N</th>
              <th>Surname</th>
              <th>First&nbsp;Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Level</th>
              <th>State</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              error ? (
                <tr className=""><td colSpan={8}>Error</td></tr>
              ) : isLoading ? (
                <tr className=""><td colSpan={8}>Loading data...</td></tr>
              ) 
              : studentData ? studentData.map(
                row => (
                  <tr key={`${row.id}-${row.surname}-${row.firstname}`}>
                    <td>{row.id}</td>
                    <td>{row.surname}</td>
                    <td>{row.firstname}</td>
                    <td>{row.age}</td>
                    <td>{row.gender}</td>
                    <td>{row.level}</td>
                    <td>{row.state} {row.state != "Abuja" ? "State" : ""}</td>
                    <td><button className="btn">Download Result</button></td>
                  </tr>
                )
              ) : null
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Table