import {
  Handshake,
  Search,
  ClipboardList,
  ShieldHalf,
  Scale,
  Compass,
  Footprints,
  SearchCheck,
  Blocks,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

// Registry for icon names referenced from content (mission themes, badges).
export const iconRegistry: Record<string, LucideIcon> = {
  Handshake,
  Search,
  ClipboardList,
  ShieldHalf,
  Scale,
  Compass,
  Footprints,
  SearchCheck,
  Blocks,
  ShieldCheck,
};

export function getIcon(name: string): LucideIcon {
  return iconRegistry[name] ?? Compass;
}
