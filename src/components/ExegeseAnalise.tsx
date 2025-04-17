
import { useState } from "react";
import { BookText, Search, History, Globe, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export function ExegeseAnalise() {
  const [reference, setReference] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    original?: { text: string; translation: string };
    historical?: string;
    theological?: string;
    application?: string;
  } | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reference.trim()) return;
    
    setIsLoading(true);
    
    // Simular resposta da API
    setTimeout(() => {
      // Exemplos de análises
      const exampleResults = {
        "João 3:16": {
          original: {
            text: "Οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον, ὥστε τὸν υἱὸν τὸν μονογενῆ ἔδωκεν, ἵνα πᾶς ὁ πιστεύων εἰς αὐτὸν μὴ ἀπόληται ἀλλ' ἔχῃ ζωὴν αἰώνιον.",
            translation: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna."
          },
          historical: "Este versículo se encontra no contexto da conversa de Jesus com Nicodemos, um líder religioso judeu que visitou Jesus à noite. No contexto do primeiro século, a ideia de um Messias que morreria pelos pecados do mundo era revolucionária e contrária às expectativas messiânicas judaicas da época.",
          theological: "A palavra grega 'ἠγάπησεν' (ēgapēsen) indica um amor sacrificial, não simplesmente emocional. O termo 'μονογενῆ' (monogenē) significa 'único' ou 'um de um tipo', enfatizando a singularidade de Jesus. O conceito de 'vida eterna' (ζωὴν αἰώνιον) não se refere apenas à duração infinita, mas à qualidade divina de vida.",
          application: "Este versículo é central para a compreensão do evangelho cristão e revela o caráter amoroso de Deus. A resposta apropriada é a fé (πιστεύων - 'crer' no sentido de confiar plenamente) em Cristo, resultando em salvação da destruição espiritual e obtenção da vida eterna."
        },
        "Romanos 8:28": {
          original: {
            text: "οἴδαμεν δὲ ὅτι τοῖς ἀγαπῶσιν τὸν θεὸν πάντα συνεργεῖ εἰς ἀγαθόν, τοῖς κατὰ πρόθεσιν κλητοῖς οὖσιν.",
            translation: "Sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito."
          },
          historical: "Paulo escreveu esta carta aos cristãos em Roma por volta de 57 d.C., em um período de crescente perseguição. Muitos cristãos enfrentavam dificuldades e questionavam o propósito de Deus em meio ao sofrimento.",
          theological: "O verbo 'συνεργεῖ' (synergei) significa 'trabalhar junto' e está no presente contínuo, indicando uma ação divina constante. A expressão 'κατὰ πρόθεσιν' (kata prothesin) refere-se ao propósito soberano e predeterminado de Deus.",
          application: "Este versículo oferece conforto aos crentes em tempos de tribulação, assegurando que Deus está no controle mesmo nas circunstâncias adversas. Não promete ausência de dificuldades, mas garante que Deus pode usar todas as situações para realizar seus propósitos de bem na vida dos que o amam."
        }
      };
      
      // Encontrar correspondência ou usar um exemplo padrão
      const matchedReference = Object.keys(exampleResults).find(
        key => reference.toLowerCase().includes(key.toLowerCase())
      );
      
      if (matchedReference) {
        setResult(exampleResults[matchedReference as keyof typeof exampleResults]);
      } else {
        // Resposta padrão
        setResult({
          original: {
            text: "[Texto original aparecerá aqui]",
            translation: "[Tradução aparecerá aqui]"
          },
          historical: "Para receber análise histórica detalhada, por favor especifique uma referência bíblica válida.",
          theological: "Para receber análise teológica detalhada, por favor especifique uma referência bíblica válida.",
          application: "Para receber aplicações práticas detalhadas, por favor especifique uma referência bíblica válida."
        });
        
        toast({
          title: "Referência não encontrada",
          description: "Por favor, insira uma referência bíblica específica como 'João 3:16' ou 'Romanos 8:28'.",
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const exampleReferences = ["João 3:16", "Romanos 8:28", "Salmos 23:1"];

  return (
    <section id="exegese-analise" className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FileText size={24} className="text-blue-800" />
        <h2 className="text-2xl font-bold text-blue-900">Exegese e Análise Profunda</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Análise do texto original (grego/hebraico), contexto histórico e interpretação teológica.
        Ideal para formação teológica e preparação de estudos bíblicos.
      </p>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <Textarea
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Digite uma referência bíblica para análise (ex: João 3:16)"
              className="min-h-[80px]"
            />
          </div>
          <div className="flex items-end">
            <Button 
              type="submit" 
              className="bg-blue-700 hover:bg-blue-800 w-full md:w-auto"
              disabled={isLoading || !reference.trim()}
            >
              {isLoading ? "Analisando..." : "Analisar"}
              <Search size={16} className="ml-2" />
            </Button>
          </div>
        </div>
        
        <div className="mt-2 text-sm text-gray-500">
          Exemplos: {exampleReferences.map((ex, idx) => (
            <button 
              type="button" 
              key={idx} 
              onClick={() => setReference(ex)}
              className="text-blue-600 hover:underline mx-1"
            >
              {ex}
            </button>
          ))}
        </div>
      </form>

      {result && (
        <div className="mt-6">
          <Tabs defaultValue="original">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="original">Texto Original</TabsTrigger>
              <TabsTrigger value="historical">Contexto Histórico</TabsTrigger>
              <TabsTrigger value="theological">Análise Teológica</TabsTrigger>
              <TabsTrigger value="application">Aplicação</TabsTrigger>
            </TabsList>
            
            <TabsContent value="original" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Texto Original e Tradução</CardTitle>
                  <CardDescription>Análise do texto em sua língua original</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="bg-amber-50 border-amber-200">
                    <Globe className="h-5 w-5 text-amber-700" />
                    <AlertTitle>Texto Original</AlertTitle>
                    <AlertDescription className="font-serif text-lg">
                      {result.original?.text}
                    </AlertDescription>
                  </Alert>
                  
                  <Alert>
                    <AlertTitle>Tradução</AlertTitle>
                    <AlertDescription>
                      {result.original?.translation}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="historical" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contexto Histórico</CardTitle>
                  <CardDescription>Compreensão do cenário e circunstâncias da época</CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert className="bg-blue-50 border-blue-200">
                    <History className="h-5 w-5 text-blue-700" />
                    <AlertDescription className="mt-2">
                      {result.historical}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="theological" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Análise Teológica</CardTitle>
                  <CardDescription>Interpretação do significado e implicações teológicas</CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert className="bg-green-50 border-green-200">
                    <BookText className="h-5 w-5 text-green-700" />
                    <AlertDescription className="mt-2">
                      {result.theological}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="application" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Aplicação Prática</CardTitle>
                  <CardDescription>Como aplicar este texto na vida cristã hoje</CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert className="bg-purple-50 border-purple-200">
                    <AlertDescription className="mt-2">
                      {result.application}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </section>
  );
}
