
import { Header } from "@/components/Header";
import { BibleSearch } from "@/components/BibleSearch";
import { DevotionalGenerator } from "@/components/DevotionalGenerator";
import { Footer } from "@/components/Footer";
import { Book, BookOpen, Bot } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <div className="flex justify-center">
              <Bot size={60} className="text-blue-800" />
            </div>
            <h1 className="text-4xl font-bold mt-4 text-blue-900">Bem-vindo à BIBL.IA</h1>
            <p className="text-xl text-gray-600 mt-2">
              Seu agente virtual para estudos bíblicos e crescimento espiritual
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 text-blue-700">
                <BookOpen size={20} />
                <span>Pesquisa inteligente</span>
              </div>
              <div className="flex items-center gap-2 text-amber-600">
                <Book size={20} />
                <span>Devocionais personalizados</span>
              </div>
            </div>
          </div>
          
          {/* Main Features */}
          <div className="space-y-10">
            <BibleSearch />
            <DevotionalGenerator />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
