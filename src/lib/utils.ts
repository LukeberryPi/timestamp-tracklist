import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

interface Track {
  trackPosition: number;
  songname: string;
  timestamp: string;
}

interface TracksData {
  data: Track[];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function jsonToMultilineString(jsonData: TracksData) {
  return jsonData.data
    .map(
      (track) =>
        `${track.trackPosition} - ${track.songname} - ${track.timestamp}`
    )
    .join("\n");
}

export function parseCueFileToJSON(cueContent: string) {
  const tracks = [];
  const lines = cueContent.split("\n");

  let currentTrack = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("TRACK")) {
      if (currentTrack) {
        tracks.push(currentTrack);
      }

      const trackPosition = parseInt(line.split(" ")[1]);
      currentTrack = { trackPosition, songname: "", timestamp: "" };
    } else if (line.startsWith("TITLE") && currentTrack) {
      currentTrack.songname = line.substring(
        line.indexOf('"') + 1,
        line.lastIndexOf('"')
      );
    } else if (line.startsWith("INDEX 01") && currentTrack) {
      currentTrack.timestamp = line.split(" ")[2];
    }
  }

  if (currentTrack) {
    tracks.push(currentTrack);
  }

  return { data: tracks };
}
