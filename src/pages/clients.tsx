import { FileDropzone } from "../components/ui/file-dropzone";

export function Clients() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Clients</h1>
      <section className=" w-[70%]">
        <FileDropzone error={null} onSuccess={() => {}} />
      </section>
    </div>
  );
}
