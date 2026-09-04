import {
  BookOpen,
  Briefcase,
  Building2,
  Cake,
  CalendarDays,
  ClipboardList,
  Clock,
  FileCheck,
  FileText,
  FlaskConical,
  Globe,
  GraduationCap,
  Handshake,
  HeartHandshake,
  History,
  Images,
  Landmark,
  Laptop,
  Layers,
  Leaf,
  Lightbulb,
  Microscope,
  Network,
  Presentation,
  ShieldAlert,
  Sprout,
  Target,
  Trophy,
  UserRound,
  Users,
  Eye,
  FileSignature,
  Home,
  MessageSquare,
  Plane,
  Scale,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Admin paneldan keladigan ikonka nomlari.
 *
 * Backend `page_blocks.icon` maydonida lucide-react komponentining nomini
 * satr sifatida saqlaydi. Bu yerda faqat ruxsat etilgan ikonkalar bor —
 * noma'lum nom kelsa `null` qaytadi va kartochka ikonkasiz chiziladi.
 */
const ICONS: Record<string, LucideIcon> = {
  BookOpen,
  Briefcase,
  Building2,
  Cake,
  CalendarDays,
  ClipboardList,
  Clock,
  FileCheck,
  FileText,
  FlaskConical,
  Globe,
  GraduationCap,
  Handshake,
  HeartHandshake,
  History,
  Images,
  Landmark,
  Laptop,
  Layers,
  Leaf,
  Lightbulb,
  Microscope,
  Network,
  Presentation,
  ShieldAlert,
  Sprout,
  Target,
  Trophy,
  UserRound,
  Users,
  Eye,
  FileSignature,
  Home,
  MessageSquare,
  Plane,
  Scale,
  ShieldCheck,
  Wallet,
};

/** Ikonka nomi bo'yicha komponentni qaytaradi. Topilmasa — `undefined`. */
export function iconFromName(name?: string | null): LucideIcon | undefined {
  if (!name) return undefined;
  return ICONS[name];
}

/** Admin panelda tanlash uchun mavjud ikonka nomlari. */
export const ICON_NAMES = Object.keys(ICONS);
