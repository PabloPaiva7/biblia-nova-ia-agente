
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-4 px-4 mt-8 border-t text-center text-sm text-gray-600">
      <div className="flex items-center justify-center gap-1">
        <span>Desenvolvido com</span>
        <Heart size={14} className="text-red-500 fill-red-500" />
        <span>para iluminar sua jornada espiritual</span>
      </div>
      <p className="mt-1">© {new Date().getFullYear()} BIBL.IA - Todos os direitos reservados</p>
    </footer>
  );
}
