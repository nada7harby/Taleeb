import { AccentKey } from "./types";

/**
 * The single locked brand palette, expressed as a semantic game-HUD system.
 * Every accent class the UI can use lives here as a complete literal string so
 * Tailwind's scanner generates it. Components never build accent classes by
 * string concatenation from data.
 */
export interface Accent {
  hex: string;
  rgb: string;
  text: string;
  bgSoft: string;
  border: string;
  borderStrong: string;
  hoverBorder: string; // full `hover:` literal so Tailwind scans it
  solid: string; // solid fill + readable foreground
  dot: string; // bg fill for bars/dots
  glow: string; // tinted drop shadow
}

export const accents: Record<AccentKey, Accent> = {
  yellow: {
    hex: "#ecdb33",
    rgb: "236,219,51",
    text: "text-[#ecdb33]",
    bgSoft: "bg-[#ecdb33]/10",
    border: "border-[#ecdb33]/25",
    borderStrong: "border-[#ecdb33]/50",
    hoverBorder: "hover:border-[#ecdb33]/50",
    solid: "bg-[#ecdb33] text-black",
    dot: "bg-[#ecdb33]",
    glow: "shadow-[0_0_45px_-12px_rgba(236,219,51,0.55)]",
  },
  cyan: {
    hex: "#40ccd0",
    rgb: "64,204,208",
    text: "text-[#40ccd0]",
    bgSoft: "bg-[#40ccd0]/10",
    border: "border-[#40ccd0]/25",
    borderStrong: "border-[#40ccd0]/50",
    hoverBorder: "hover:border-[#40ccd0]/50",
    solid: "bg-[#40ccd0] text-black",
    dot: "bg-[#40ccd0]",
    glow: "shadow-[0_0_45px_-12px_rgba(64,204,208,0.55)]",
  },
  green: {
    hex: "#3cdb4e",
    rgb: "60,219,78",
    text: "text-[#3cdb4e]",
    bgSoft: "bg-[#3cdb4e]/10",
    border: "border-[#3cdb4e]/25",
    borderStrong: "border-[#3cdb4e]/50",
    hoverBorder: "hover:border-[#3cdb4e]/50",
    solid: "bg-[#3cdb4e] text-black",
    dot: "bg-[#3cdb4e]",
    glow: "shadow-[0_0_45px_-12px_rgba(60,219,78,0.55)]",
  },
  red: {
    hex: "#d04242",
    rgb: "208,66,66",
    text: "text-[#d04242]",
    bgSoft: "bg-[#d04242]/10",
    border: "border-[#d04242]/25",
    borderStrong: "border-[#d04242]/50",
    hoverBorder: "hover:border-[#d04242]/50",
    solid: "bg-[#d04242] text-white",
    dot: "bg-[#d04242]",
    glow: "shadow-[0_0_45px_-12px_rgba(208,66,66,0.55)]",
  },
};

/** Shared motion easing — the premium "out-expo" curve used site-wide. */
export const EASE = [0.16, 1, 0.3, 1] as const;
