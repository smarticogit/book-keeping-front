import { File, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Input } from "./input";
import { cn } from "../../utils/cn";

type Preview = string | ArrayBuffer | null;
export type FileDropzoneProps = {
  defaultPreview?: Preview;
  error: unknown;
  onSuccess: (value: string) => void;
  onFailure?: (error: unknown) => void;
};

export function FileDropzone({
  defaultPreview = null,
  error,
  onSuccess,
  onFailure,
}: FileDropzoneProps) {
  const [preview, setPreview] = useState<Preview>(defaultPreview);
  const [fileName, setFileName] = useState<string>("");

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const reader = new FileReader();
      try {
        const file = acceptedFiles[0];
        setFileName(file.name);
        reader.readAsDataURL(acceptedFiles[0]);
        reader.onload = () => {
          if (typeof reader.result !== "string") return;
          setPreview(reader.result);
          onSuccess(reader.result);
        };
      } catch (error) {
        const errorCode = fileRejections[0].errors[0].code;
        if (errorCode === "file-too-large") {
          toast.error("A image deve ser menor que 1MB.");
        }
        if (errorCode === "file-invalid-type") {
          toast.error("A imagem deve ser do formato PNG, JPG, JPEG ou PDF.");
        }
        setPreview(null);
        onFailure && onFailure(error);
      }
    },
    [onSuccess, onFailure]
  );

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 1000000, // 1MB
    accept: {
      "image/png": [],
      "image/jpg": [],
      "image/jpeg": [],
      "application/pdf": [],
    },
  });

  const isErrored = fileRejections.length > 0 || !!error;

  const handleRemoveFile = () => {
    setPreview(null);
    setFileName("");
  };

  return (
    <div
      {...getRootProps()}
      className="w-full gap-3 flex flex-col items-center"
    >
      <Input {...getInputProps()} type="file" />
      <div
        className={cn(
          "w-full flex flex-col items-center rounded-lg border border-mimoo-purple-200",
          isErrored && "border-red-500"
        )}
      >
        <div className="w-[90%] mt-10">
          <h2 className="text-xl text-left top-10 left-12">Nota fiscal</h2>
        </div>

        {preview && (
          <div className="w-[90%] flex flex-col items-center h-60 ">
            <span className="w-full flex justify-between items-center text-sm text-center border border-mimoo-purple-200 rounded-lg py-4 px-7 mt-10">
              <div className="flex items-center">
                <File className="mr-2 h-4 w-4" /> {fileName}
              </div>
              <div className="flex items-center gap-4">
                <h2 className="text-mimoo-purple-200 text-xl">{`|`}</h2>
                {`Adicionado em ${new Date().toLocaleDateString()}`}
                <h2 className="text-mimoo-purple-200 text-xl">{`|`}</h2>
                <Trash2
                  className="h-4 w-4 cursor-pointer"
                  onClick={handleRemoveFile}
                />
              </div>
            </span>
            <div className="flex flex-col items-center p-7">
              <p className="flex items-center text-sm text-center border border-mimoo-purple-200 rounded-lg py-2 px-3">
                <File className="mr-2 h-4 w-4" /> Arraste o arquivo aqui ou
                clique para selecionar
              </p>
              <small className="text-xs text-muted-foreground mt-2">
                Somente arquivos: pdf, png ou jpeg
              </small>
            </div>
          </div>
        )}
        {!preview && (
          <div className="flex justify-center flex-col items-center p-4">
            <p className="flex items-center text-sm text-center border border-mimoo-purple-200 rounded-lg py-2 px-3">
              <File className="mr-2 h-4 w-4" /> Arraste o arquivo aqui ou clique
              para selecionar
            </p>
            <small className="text-xs text-muted-foreground mt-2">
              Somente arquivos: pdf, png ou jpeg
            </small>
          </div>
        )}
      </div>
    </div>
  );
}
