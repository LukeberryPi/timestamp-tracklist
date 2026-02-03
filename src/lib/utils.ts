import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

interface Track {
  trackPosition: number;
  artist: string;
  songname: string;
  timestamp: string;
}

interface TracksData {
  data: Track[];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert .cue timestamp (HH:MM:SS) to total seconds
 */
function cueTimestampToSeconds(cueTimestamp: string): number {
  const parts = cueTimestamp.split(':');
  const hours = parseInt(parts[0]);
  const minutes = parseInt(parts[1]);
  const seconds = parseInt(parts[2]);

  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Convert seconds to YouTube-compatible timestamp
 * Returns mm:ss if < 1 hour, h:mm:ss if >= 1 hour
 */
function secondsToTimestamp(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  // Format seconds with leading zero
  const secStr = seconds.toString().padStart(2, '0');

  if (hours > 0) {
    // h:mm:ss format (e.g., "1:05:32")
    const minStr = minutes.toString().padStart(2, '0');
    return `${hours}:${minStr}:${secStr}`;
  } else {
    // mm:ss format (e.g., "05:32" or "45:12")
    const minStr = minutes.toString().padStart(2, '0');
    return `${minStr}:${secStr}`;
  }
}

export function jsonToMultilineString(jsonData: TracksData, offsetSeconds: number = 0, showSongNumber: boolean = true) {
  return jsonData.data
    .map((track, index) => {
      // Convert cue timestamp to seconds
      const trackSeconds = cueTimestampToSeconds(track.timestamp);

      // Apply offset
      const adjustedSeconds = trackSeconds + offsetSeconds;

      // Convert to YouTube format
      const timestamp = secondsToTimestamp(adjustedSeconds);

      // Format: <timestamp> <artist> - <songname>
      // If no artist, just use songname
      const trackInfo = track.artist
        ? `${track.artist} - ${track.songname}`
        : track.songname;

      const prefix = showSongNumber ? `${index + 1}) ` : '';
      return `${prefix}${timestamp} ${trackInfo}`;
    })
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
      currentTrack = { trackPosition, artist: "", songname: "", timestamp: "" };
    }
    // Parse PERFORMER field for artist
    else if (line.startsWith("PERFORMER") && currentTrack) {
      currentTrack.artist = line.substring(
        line.indexOf('"') + 1,
        line.lastIndexOf('"')
      );
    }
    else if (line.startsWith("TITLE") && currentTrack) {
      const title = line.substring(
        line.indexOf('"') + 1,
        line.lastIndexOf('"')
      );

      // If artist not set from PERFORMER, try splitting TITLE on ' - '
      if (!currentTrack.artist && title.includes(' - ')) {
        const parts = title.split(' - ');
        currentTrack.artist = parts[0].trim();
        currentTrack.songname = parts.slice(1).join(' - ').trim();
      } else {
        currentTrack.songname = title;
      }
    }
    else if (line.startsWith("INDEX 01") && currentTrack) {
      currentTrack.timestamp = line.split(" ")[2];
    }
  }

  if (currentTrack) {
    tracks.push(currentTrack);
  }

  return { data: tracks };
}
