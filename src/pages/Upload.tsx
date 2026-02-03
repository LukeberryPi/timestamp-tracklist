import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import SubmitPage from "@/pages/SubmitPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "submit",
        element: <SubmitPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

// async function handleCopy() {
//   try {
//     await navigator.clipboard.writeText(text);
//     setShowCopied(true);
//     setTimeout(() => {
//       setShowCopied(false);
//     }, 3000);
//     toast.success("Copied!");
//   } catch (err) {
//     toast.error(`Error: ${err}`);
//   }
// }


{
  /*
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
        "bg-emerald-500 hover:bg-emerald-500": showCopied,
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
</div> */
}
