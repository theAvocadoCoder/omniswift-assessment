import { useRef } from "react"

function Result() {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
        <button className="self-end absolute right-0 top-0 w-7 h-7 flex justify-center items-center text-2xl/[1] font-bold rounded-full bg-gray-100/30" aria-label="Close dialog" onClick={closeDialog}>&times;</button>

        <div className="bg-white w-[80dvw] aspect-[210/297] max-w-[35rem] flex items-center justify-center">
          {/* TODO: Implement the result template */}
          <p>Result</p>
        </div>

        <button className="btn rounded fixed bottom-5" autoFocus>Download</button>
      </dialog>
    </>
  )
}

export default Result