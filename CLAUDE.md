# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript application that processes Rekordbox DJ recording .cue files to generate timestamped tracklists. The app allows users to upload .cue files (drag & drop or file picker), apply time offsets for video intros, and export formatted tracklists with timestamps.

## Development Commands

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint on all files
- `npm run preview` - Preview production build locally

## Architecture & Tech Stack

**Frontend Framework**: React 19 with TypeScript
**Build Tool**: Vite with React plugin
**Styling**: Tailwind CSS v4 with shadcn/ui components
**State Management**: React hooks (useState, useRef)
**UI Components**: shadcn/ui (Radix UI primitives)
**Icons**: Lucide React
**Notifications**: Sonner (toast notifications)
**Theming**: next-themes for theme support

## Key Application Flow

1. **File Upload**: Users drop/select .cue files which are validated by file extension
2. **Parsing**: `parseCueFileToJSON()` in `src/lib/utils.ts:27` extracts track data from cue format
3. **Processing**: Track data is formatted into readable tracklist with `jsonToMultilineString()` 
4. **Offset Application**: Users can apply time offset for video intros (0-60 seconds)
5. **Export**: Formatted tracklist can be copied to clipboard

## File Structure

- `src/App.tsx` - Main application component with file handling, drag/drop, and UI
- `src/lib/utils.ts` - Core utilities for cue file parsing and data transformation
- `src/components/ui/` - shadcn/ui component library (Button, Input, Textarea, etc.)
- Path alias `@/` maps to `./src/` directory

## Code Conventions

- Uses TypeScript with strict typing
- Functional components with hooks
- Tailwind CSS for styling with `cn()` utility for conditional classes
- shadcn/ui component patterns (variants, slots, etc.)
- ESLint with React hooks and TypeScript rules
- Error handling with user-friendly toast notifications

## Development Notes

- The app specifically targets .cue files from Rekordbox DJ software
- Drag & drop is implemented with visual feedback overlay
- File validation ensures only .cue files are processed
- Clipboard API is used for copying tracklist output
- Uses confirm() for destructive actions (file removal)