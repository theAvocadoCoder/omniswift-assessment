import { useEffect, useRef } from "react"
import { useGetResultMutation } from "./resultApi";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { createSelectResultById, ResultMeta, setCurrentResult } from "./resultSlice";
import Passport from "@assets/Passport.png";
import Logo from "@assets/Logo.png";

const studentMeta: [(result: ResultMeta) => string, string][] = [
  [result => `${result.surname} ${result.firstname}`, "Name"],
  [result => result.reg_no, "Reg. No."],
  [result => result.level, "Level"],
  [result => result.session, "Session"],
]

export interface ResultProps {
  id: number
}

function Result({ id }: ResultProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const result = useAppSelector(createSelectResultById(id));
  const dispatch = useAppDispatch();
  const [ getResult, { error, isLoading } ] = useGetResultMutation();

  useEffect(() => {
    const fetchResult = async () => {
      const result = await getResult(id);

      if (result.error) console.error(result);
      else dispatch(setCurrentResult(result.data));
    }
    
    fetchResult().catch(console.error);
  }, [getResult, dispatch, id]);

  function closeDialog() {
    dialogRef.current?.close();
  }

  function openDialog() {
    dialogRef.current?.showModal();
  }

  // TODO: Implement the functionality to turn the template into a pdf and download

  return (
    <>
      <button className="btn" onClick={openDialog}>Download Result</button>
      <dialog ref={dialogRef} className="">
        <button className="absolute left-0 top-0 w-7 h-7 flex justify-center items-center text-2xl/[1] font-bold rounded-full bg-gray-100/30 z-10" aria-label="Close dialog" onClick={closeDialog}>&times;</button>

        <div className="bg-white w-[595px] h-[842px] aspect-[595/842] px-4 py-5 flex flex-col gap-7 items-center justify-start text-[calc(16/842*100)%] relative">
          {
            error ? (
              <p className="">Error</p>
            ) : isLoading ? (
              <p className="">Loading result...</p>
            ) : result ? (
              <>
              <header className="w-full flex items-start justify-between text-center">
                <img src={Logo} alt="School logo" width="100" height="100" className="basis-[18%] w-[min(18%,6.25rem)] aspect-square" />
                <div className="">
                  <p className="uppercase text-[1em] font-bold text-gray-secondary">fremont college of education</p>
                  <p className="text-[.75em] text-gray-secondary w-max mx-auto">No. 5 Raymond Osuman Street, PMB 2192 <br /> Maitama, Abuja, Nigeria.</p>
                  <h2 className="text-[1.25em] font-semibold text-gray-tertiary w-max mx-auto">Post Graduate Diploma in Education</h2>
                  <p className="text-[.75em] bold text-gray-tertiary w-max mx-auto">Student First Semester Statement of Result</p>
                </div>
                <img src={Passport} alt="Student's passport photo" width="100" height="100" className="basis-[18%] w-[min(18%,6.25rem)] aspect-square" />
              </header>
              <div className="w-full grid grid-cols-3 grid-rows-2 text-[.75em] mt-12">
              {
                studentMeta.map((detail, index) => (
                  <div key={detail[1]} className={`flex gap-2 ${(index%2) ? "col-span-1" : "col-span-2"}`}>
                    <span className="font-bold">{ detail[1] }:</span>
                    <span className="">{ detail[0](result) }</span>
                  </div>
                ))
              }
              </div>
              <table className="text-[.75em] border-collapse w-full">
                <thead className="font-bold bg-blue text-white text-left">
                  <tr>
                    <th>S/N</th>
                    <th>Course Code</th>
                    <th>Course Title</th>
                    <th>Unit</th>
                    <th>Grade</th>
                    <th>Total Point</th>
                  </tr>
                </thead>
                <tbody className="">
                {
                  result.result.map((course, index) => (
                    <tr className="[&:nth-child(odd)_td]:bg-[#F2F2F2]" key={course.coursecode}>
                      <td>{index+1}.</td>
                      <td>{course.coursecode}</td>
                      <td>{course.title}</td>
                      <td>{course.credit_unit}</td>
                      <td>{course.grade}</td>
                      <td>{course.total_point}</td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
              <table className="text-[.75em] border-collapse self-start">
                <thead className="font-bold bg-blue text-white text-left">
                  <tr>
                  {
                    Object.keys(result.cummulative).slice(0,-1).map(key => (
                      <th className="" key={key}>{key}</th>
                    ))
                  }
                  </tr>
                </thead>
                <tbody className="">
                  <tr className="[&:nth-child(odd)_td]:bg-[#F2F2F2]">
                  {
                    Object.values(result.cummulative).slice(0,-1).map(value => (
                      <td className="" key={value}>{value}</td>
                    ))
                  }
                  </tr>
                </tbody>
              </table>
              <p className={`[&_span:first-child]:font-bold ${Object.values(result.cummulative).slice(-1)[0].match(/fail/i) ? "[&_span:last-child]:text-red-500" : "[&_span:last-child]:text-blue"} capitalize self-start text-[.75em]`}>
              {
                Object.entries(result.cummulative).slice(-1)[0].map((word, index) => (<span>{word}{!index ? ": " : ""}</span>))
              }
              </p>
              <p className="border-t border-t-gray-light pt-2.5 w-1/4 text-[.75em] self-start absolute bottom-5">Registrar</p>
              </>
            ) : null
          }
        </div>

        <button className="btn rounded self-center fixed bottom-5" autoFocus>Download</button>
      </dialog>
    </>
  )
}

export default Result