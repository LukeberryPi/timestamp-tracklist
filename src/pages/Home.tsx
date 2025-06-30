import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  cn,
  jsonToMultilineString,
  parseCueFileToJSON,
  isCueFile,
} from "@/lib/utils";
import { toast } from "sonner";
import { Trash2, Upload } from "lucide-react";

export function HomePage() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && isCueFile(droppedFile)) {
      try {
        const rawCueContent = await droppedFile.text();
        const cueJson = parseCueFileToJSON(rawCueContent);
        const formattedTracklistWithTimestamps = jsonToMultilineString(cueJson);
        setFile(droppedFile);
        toast.success("Cue file loaded");
      } catch (err) {
        toast.error(`Error: ${err}`);
      }
    } else {
      toast.error("Invalid file type");
    }
  };

  const handleRemove = () => {
    const sure = confirm("Are you sure? This is irreversible.");
    if (!sure) {
      return;
    }
    setFile(null);
    setText("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("File removed");
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && isCueFile(selectedFile)) {
      try {
        const rawCueContent = await selectedFile.text();
        const cueJson = parseCueFileToJSON(rawCueContent);
        const formattedTracklistWithTimestamps = jsonToMultilineString(cueJson);
        setText(formattedTracklistWithTimestamps);
        setFile(selectedFile);
        toast.success("Cue file loaded");
      } catch (err) {
        toast.error(`Error: ${err}`);
      }
    } else {
      toast.error("Invalid file");
    }
  };

  return (
    <main className="selection:bg-blue-500 selection:text-white">
      <div className="relative">
        {isDragging && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            <div className="absolute inset-2 border-4 border-dashed border-blue-500 bg-blue-500/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-blue-500 text-white px-4 py-2 text-center ring ring-black">
                <p className="text-3xl font-bold">Drop your file anywhere!</p>
              </div>
            </div>
          </div>
        )}

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          data-has-file={!!file}
          className="group min-h-screen p-8 space-y-8"
        >
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">Upload your .cue file!</h1>
              <div
                className={cn(
                  "p-4 border-2 border-dashed border-blue-500 text-center",
                  {
                    "border-emerald-500 border-solid bg-emerald-500/10": !!file,
                  },
                )}
              >
                {file ? (
                  <div className="space-y-2">
                    <p className="text-black">
                      File loaded:{" "}
                      <span className="font-bold">{file.name}</span>
                    </p>
                    <Button variant="destructive" onClick={handleRemove}>
                      <Trash2 />
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-black">
                      Drag and drop your .cue file anywhere, or click below to
                      upload it
                    </p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileInput}
                      accept=".cue"
                      className="hidden"
                    />
                    <Button
                      variant="default"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload />
                      Upload
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
