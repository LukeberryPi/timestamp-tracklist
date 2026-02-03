"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { cn, jsonToMultilineString, parseCueFileToJSON } from "@/lib/utils";
import { toast } from "sonner";
import { Check, Copy, Trash2, Upload, Info } from "lucide-react";

export default function SubmitPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [offset, setOffset] = useState(0);
  const [text, setText] = useState("");
  const [showCopied, setShowCopied] = useState(false);
  const [showSongNumber, setShowSongNumber] = useState(true);
  const [parsedData, setParsedData] = useState<ReturnType<typeof parseCueFileToJSON> | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Recalculate tracklist when offset or showSongNumber changes
  useEffect(() => {
    if (parsedData) {
      const formattedTracklistWithTimestamps = jsonToMultilineString(parsedData, offset, showSongNumber);
      setText(formattedTracklistWithTimestamps);
    }
  }, [offset, parsedData, showSongNumber]);

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
        setParsedData(cueJson);
        const formattedTracklistWithTimestamps = jsonToMultilineString(cueJson, offset, showSongNumber);
        setText(formattedTracklistWithTimestamps);
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
    setParsedData(null);
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
        setParsedData(cueJson);
        const formattedTracklistWithTimestamps = jsonToMultilineString(cueJson, offset, showSongNumber);
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

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopied(true);
      setTimeout(() => {
        setShowCopied(false);
      }, 3000);
      toast.success("Copied!");
    } catch (err) {
      toast.error(`Error: ${err}`);
    }
  }

  return (
    <main className="bg-neutral-950 min-h-screen">
      <div className="relative">
        {isDragging && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            <div className="absolute inset-2 border-2 border-accent bg-accent/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-accent text-neutral-950 px-6 py-4 text-center font-semibold">
                <p className="text-2xl">Drop your file anywhere</p>
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
            {/* Upload Section */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-neutral-100">Upload your .cue file</h1>
              <div
                className={cn(
                  "p-8 border transition-all",
                  file
                    ? "border-accent bg-accent/5"
                    : "border-neutral-700 bg-neutral-900 hover:border-accent/50"
                )}
              >
                {file ? (
                  <div className="space-y-3 text-center">
                    <p className="text-sm text-neutral-300">
                      File loaded:{" "}
                      <span className="font-semibold text-neutral-100">{file.name}</span>
                    </p>
                    <Button variant="destructive" size="default" onClick={handleRemove}>
                      <Trash2 />
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 text-center">
                    <p className="text-sm text-neutral-400">
                      Drag and drop your .cue file anywhere, or click below to upload it
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
                      size="default"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload />
                      Upload
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Settings Section */}
            <div className="border border-neutral-700 bg-neutral-900 p-6 space-y-6">
              {/* Offset */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium text-neutral-100">Intro Offset</h2>
                  <div className="group/tooltip relative">
                    <Info className="size-4 text-neutral-500 hover:text-neutral-300 cursor-help" />
                    <div className="absolute right-0 top-6 w-64 p-3 bg-neutral-800 border border-neutral-700 text-xs text-neutral-300 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10">
                      If you made a video where you introduced yourself for 15 seconds and then pressed play, use 15 as the offset value. All timestamps will be adjusted accordingly.
                    </div>
                  </div>
                </div>
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
                  <span className="text-sm text-neutral-500">sec</span>
                </div>
              </div>

              {/* Show Song Number */}
              <div className="flex items-center justify-between">
                <label htmlFor="show-song-number" className="text-sm font-medium text-neutral-100">
                  Show song numbers
                </label>
                <Switch
                  id="show-song-number"
                  checked={showSongNumber}
                  onCheckedChange={setShowSongNumber}
                />
              </div>
            </div>

            {/* Output Section */}
            <div className="border border-neutral-700 bg-neutral-900">
              <div className="flex items-center justify-between p-4 border-b border-neutral-700">
                <h2 className="text-sm font-medium text-neutral-100">
                  Tracklist with Timestamps
                </h2>
                <Button size="default" onClick={handleCopy}>
                  {showCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  {showCopied ? "Copied" : "Copy"}
                </Button>
              </div>
              <div className="p-4">
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[400px] text-sm"
                  placeholder="Your tracklist with timestamps will appear here..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
