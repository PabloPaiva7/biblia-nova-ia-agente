
import { BookOpen, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn("w-full py-6 px-4 flex items-center justify-between bg-gradient-to-r from-blue-900 to-indigo-900 text-white", className)}>
      <div className="flex items-center gap-2">
        <BookOpen size={28} className="text-amber-400" />
        <h1 className="text-2xl font-bold tracking-tight">BIBL.IA</h1>
      </div>
      <div className="flex items-center gap-1">
        <Sun size={20} className="text-amber-300" />
        <span className="text-sm font-medium">Iluminando sua jornada espiritual</span>
      </div>
    </header>
  );
}
