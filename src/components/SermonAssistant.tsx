
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, MessageSquare, ListChecks, ChevronDown, ChevronUp } from "lucide-react";

export function SermonAssistant() {
  const [theme, setTheme] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sermonOutline, setSermonOutline] = useState<null | {
    title: string;
    introduction: string;
    mainPoints: { title: string; verses: string; application: string }[];
    conclusion: string;
  }>(null);
  
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    introduction: true,
    points: true,
    conclusion: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleGenerateSermon = () => {
    if (!theme.trim()) return;
    
    setIsGenerating(true);
    
    // Simulando uma resposta da API após 1.5 segundo
    setTimeout(() => {
      setSermonOutline({
        title: `${theme}: Caminhando na Verdade`,
        introduction: "Vivemos em um mundo onde a verdade é frequentemente relativizada. As escrituras nos chamam a viver de acordo com a verdade de Deus, que é imutável e eterna. Hoje vamos explorar como podemos entender e aplicar esta verdade em nossas vidas diárias.",
        mainPoints: [
          {
            title: "Conhecendo a Verdade",
            verses: "João 8:32 - 'E conhecereis a verdade, e a verdade vos libertará.'",
            application: "A verdade de Deus nos liberta das mentiras que nos prendem. Precisamos estudar as escrituras diariamente para conhecer esta verdade."
          },
          {
            title: "Vivendo na Verdade",
            verses: "Efésios 4:25 - 'Por isso, deixai a mentira e falai a verdade cada um com o seu próximo, porque somos membros uns dos outros.'",
            application: "Viver na verdade significa ser honesto em todas as áreas de nossa vida, reconhecendo que somos parte de um corpo e nossas ações afetam uns aos outros."
          },
          {
            title: "Defendendo a Verdade",
            verses: "1 Pedro 3:15 - 'Antes, santificai a Cristo como Senhor em vossos corações; e estai sempre preparados para responder com mansidão e temor a todo aquele que vos pedir a razão da esperança que há em vós.'",
            application: "Devemos estar prontos para defender a verdade com amor e respeito, sempre preparados para explicar no que cremos e por quê."
          }
        ],
        conclusion: "A verdade de Deus não é apenas um conjunto de fatos para acreditarmos, mas um caminho para seguirmos. Ao conhecer, viver e defender a verdade, nos tornamos testemunhas eficazes do evangelho em um mundo confuso. Que possamos ser pessoas comprometidas com a verdade em tudo o que fazemos."
      });
      
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="bg-gradient-to-r from-amber-700 to-amber-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare size={24} className="text-white" />
          Assistente de Sermão
        </CardTitle>
        <CardDescription className="text-amber-100">
          Estruture mensagens com tema, versículos e aplicações práticas
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        {!sermonOutline ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="sermon-theme" className="block text-sm font-medium mb-1 text-gray-700">
                Tema ou Título do Sermão
              </label>
              <Input
                id="sermon-theme"
                placeholder="Ex: Verdade, Fé, Amor ao próximo..."
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Digite um tema ou conceito para gerar uma estrutura de sermão completa
              </p>
            </div>
            
            <div className="flex flex-col space-y-2 text-sm py-2">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-amber-600" />
                <span>Introdução contextualizada</span>
              </div>
              <div className="flex items-center gap-2">
                <ListChecks size={16} className="text-amber-600" />
                <span>Pontos principais com versículos</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-amber-600" />
                <span>Aplicações práticas para a congregação</span>
              </div>
            </div>
            
            <Button 
              onClick={handleGenerateSermon} 
              disabled={!theme.trim() || isGenerating}
              className="w-full bg-amber-600 hover:bg-amber-700"
            >
              {isGenerating ? "Gerando estrutura..." : "Gerar Estrutura de Sermão"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="text-center">
              <h3 className="text-xl font-bold text-amber-800">{sermonOutline.title}</h3>
              <p className="text-sm text-gray-500">Estrutura gerada baseada no tema: {theme}</p>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <div 
                className="flex items-center justify-between p-3 bg-amber-50 border-b cursor-pointer"
                onClick={() => toggleSection('introduction')}
              >
                <h4 className="font-medium text-amber-800">Introdução</h4>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  {expandedSections.introduction ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Button>
              </div>
              
              {expandedSections.introduction && (
                <div className="p-3 bg-white">
                  <p className="text-gray-700">{sermonOutline.introduction}</p>
                </div>
              )}
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <div 
                className="flex items-center justify-between p-3 bg-amber-50 border-b cursor-pointer"
                onClick={() => toggleSection('points')}
              >
                <h4 className="font-medium text-amber-800">Pontos Principais</h4>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  {expandedSections.points ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Button>
              </div>
              
              {expandedSections.points && (
                <div className="bg-white divide-y">
                  {sermonOutline.mainPoints.map((point, index) => (
                    <div key={index} className="p-3">
                      <h5 className="font-medium text-amber-700">
                        {index + 1}. {point.title}
                      </h5>
                      <div className="mt-2 pl-4 border-l-2 border-amber-200">
                        <p className="text-blue-800 italic verse-text">{point.verses}</p>
                      </div>
                      <p className="mt-2 text-gray-700">{point.application}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <div 
                className="flex items-center justify-between p-3 bg-amber-50 border-b cursor-pointer"
                onClick={() => toggleSection('conclusion')}
              >
                <h4 className="font-medium text-amber-800">Conclusão</h4>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  {expandedSections.conclusion ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Button>
              </div>
              
              {expandedSections.conclusion && (
                <div className="p-3 bg-white">
                  <p className="text-gray-700">{sermonOutline.conclusion}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-between pt-2">
              <Button 
                variant="outline"
                className="text-amber-700 border-amber-300"
                onClick={() => {
                  setSermonOutline(null);
                  setTheme("");
                }}
              >
                Criar Novo
              </Button>
              
              <Button className="bg-amber-600 hover:bg-amber-700">
                <FileText size={16} className="mr-1" />
                Salvar Esboço
              </Button>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="bg-amber-50 border-t text-sm text-gray-600">
        Dica: Use as escrituras como fundamento principal de cada ponto da mensagem
      </CardFooter>
    </Card>
  );
}
