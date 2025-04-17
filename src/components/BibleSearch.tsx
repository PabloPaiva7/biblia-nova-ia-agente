
import { useState } from "react";
import { Search, BookText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SearchType = "keyword" | "theme" | "question";

interface SearchResult {
  verse: string;
  reference: string;
  context?: string;
  application?: string;
}

export function BibleSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("keyword");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    // Simulated API call (would connect to a real Bible API in production)
    setTimeout(() => {
      // Simulate search results based on search type
      let simulatedResults: SearchResult[] = [];
      
      if (searchType === "keyword" && searchQuery.toLowerCase().includes("amor")) {
        simulatedResults = [
          {
            verse: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
            reference: "João 3:16",
            context: "Jesus falando a Nicodemos sobre a salvação e o novo nascimento.",
            application: "Nos lembra do imenso amor de Deus e o sacrifício que Ele fez por nós."
          },
          {
            verse: "O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha.",
            reference: "1 Coríntios 13:4",
            context: "Paulo descreve as características do amor verdadeiro aos coríntios.",
            application: "Nos ensina como deve ser o amor cristão genuíno em nossas relações."
          }
        ];
      } else if (searchType === "theme" && searchQuery.toLowerCase().includes("paz")) {
        simulatedResults = [
          {
            verse: "Deixo-vos a paz, a minha paz vos dou. Não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.",
            reference: "João 14:27",
            context: "Jesus consola seus discípulos antes de sua crucificação.",
            application: "A paz de Cristo é diferente da paz do mundo e permanece mesmo em tempos difíceis."
          }
        ];
      } else if (searchType === "question" && searchQuery.toLowerCase().includes("perdão")) {
        simulatedResults = [
          {
            verse: "Porque, se perdoardes aos homens as suas ofensas, também vosso Pai celestial vos perdoará.",
            reference: "Mateus 6:14",
            context: "Parte do Sermão do Monte, ensinando sobre a oração.",
            application: "O perdão que oferecemos aos outros está conectado ao perdão que recebemos de Deus."
          }
        ];
      } else {
        // Default result if no matches
        simulatedResults = [
          {
            verse: "Toda Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção, para a educação na justiça.",
            reference: "2 Timóteo 3:16",
            application: "A Bíblia é nossa fonte de verdade e orientação para a vida cristã."
          }
        ];
      }
      
      setResults(simulatedResults);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookText className="h-5 w-5 text-blue-600" />
          Pesquisa Bíblica Inteligente
        </CardTitle>
        <CardDescription>
          Busque versículos por palavra-chave, tema ou pergunta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="keyword" onValueChange={(value) => setSearchType(value as SearchType)}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="keyword">Palavra-chave</TabsTrigger>
            <TabsTrigger value="theme">Tema</TabsTrigger>
            <TabsTrigger value="question">Pergunta</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input 
              placeholder={
                searchType === "keyword" ? "Ex: amor, fé, esperança..." :
                searchType === "theme" ? "Ex: salvação, paz interior..." :
                "Ex: Como perdoar alguém?"
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              {isLoading ? "Buscando..." : "Buscar"}
            </Button>
          </form>
          
          {results.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold text-lg">Resultados da Busca</h3>
              {results.map((result, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-md border border-blue-100">
                  <p className="italic text-blue-800 mb-2">"{result.verse}"</p>
                  <p className="text-right font-semibold text-sm text-blue-700 mb-3">- {result.reference}</p>
                  
                  {result.context && (
                    <div className="mt-2">
                      <span className="font-medium text-sm">Contexto:</span>
                      <p className="text-sm text-gray-700">{result.context}</p>
                    </div>
                  )}
                  
                  {result.application && (
                    <div className="mt-2">
                      <span className="font-medium text-sm">Aplicação:</span>
                      <p className="text-sm text-gray-700">{result.application}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}
