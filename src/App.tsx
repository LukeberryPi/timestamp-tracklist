import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn, jsonToMultilineString, parseCueFileToJSON } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { Check, Copy, Trash2, Upload } from "lucide-react";

export default function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [offset, setOffset] = useState(0);
  const [text, setText] = useState("");
  const [showCopied, setShowCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isCueFile = (file: File) => {
    return file.name.toLowerCase().endsWith(".cue");
  };

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
        setText(formattedTracklistWithTimestamps);
        setFile(droppedFile);
        toast("Cue file loaded");
      } catch (err) {
        toast(`Error: ${err}`);
      }
    } else {
      toast("Invalid file");
    }
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
        toast("Cue file added.");
      } catch (err) {
        toast(`Error: ${err}`);
      }
    } else {
      toast("Invalid file");
    }
  };

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopied(true);
      setTimeout(() => {
        setShowCopied(false);
      }, 5000);
      toast("Copied!");
    } catch (err) {
      toast(`Error: ${err}`);
    }
  }

  return (
    <>
      <div className="relative">
        {isDragging && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            <div className="absolute inset-2 border-4 border-dashed border-green-500 bg-green-500/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-green-500 text-white px-6 py-4 rounded-lg text-center">
                <p className="text-2xl font-bold">Drop your file anywhere!</p>
              </div>
            </div>
          </div>
        )}

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className="min-h-screen p-8 space-y-8"
        >
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">Upload your .cue file!</h1>
              <div className="p-8 border-2 border-dashed rounded-lg text-center">
                {file ? (
                  <div className="space-y-2">
                    <p className="text-green-500">File loaded: {file.name}</p>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setFile(null);
                        setText("");
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                    >
                      {<Trash2 />}
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

            <div className="space-y-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Intro Offset</AccordionTrigger>
                  <AccordionContent>
                    If you made a video where you introduced yourself for 15
                    seconds and then pressed play, use 15 as the offset value.
                    The timestamps for all tracks will be adjusted +15 seconds.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Slider
                    value={[offset]}
                    onValueChange={(vals) => setOffset(vals[0])}
                    max={60}
                    step={1}
                  />
                </div>
                <Input
                  type="number"
                  value={offset}
                  onChange={(e) => setOffset(Number(e.target.value))}
                  className="w-20"
                  min={0}
                  max={60}
                />
                <span className="text-sm text-black">seconds</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">
                  Tracklist with Timestamps
                </h2>
                <Button
                  className={cn({
                    "bg-emerald-600 hover:bg-emerald-600": showCopied,
                  })}
                  IconLeft={showCopied ? <Check /> : <Copy />}
                  onClick={handleCopy}
                >
                  {showCopied ? "Copied" : "Copy to Clipboard"}
                </Button>
              </div>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[300px]"
                placeholder="Your tracklist with timestamps will appear here..."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
