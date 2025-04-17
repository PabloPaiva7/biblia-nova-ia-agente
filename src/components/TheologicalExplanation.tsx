
import { useState } from "react";
import { BookText, BookOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type TheologicalTopic = {
  id: string;
  name: string;
  description: string;
  multipleViews?: { title: string; description: string }[];
};

export function TheologicalExplanation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<TheologicalTopic | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  
  const theologicalTopics: TheologicalTopic[] = [
    {
      id: "grace",
      name: "Graça",
      description: "A graça é o favor imerecido de Deus para com a humanidade. Em Efésios 2:8-9, Paulo escreve: 'Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie.' A graça é um conceito fundamental no cristianismo, representando o amor e a misericórdia de Deus oferecidos livremente, não com base em mérito humano.",
    },
    {
      id: "faith",
      name: "Fé",
      description: "A fé é descrita em Hebreus 11:1 como 'o firme fundamento das coisas que se esperam e a prova das coisas que não se veem'. É a confiança em Deus e em Suas promessas, mesmo quando não podemos ver ou entender completamente. A fé não é simplesmente conhecimento intelectual, mas confiança ativa que resulta em obediência.",
    },
    {
      id: "sin",
      name: "Pecado",
      description: "O pecado é definido como a transgressão da lei de Deus (1 João 3:4) e a falha em viver segundo o padrão divino (Romanos 3:23). O pecado entrou no mundo através de Adão e Eva (Gênesis 3) e afeta toda a humanidade (Romanos 5:12). A Bíblia ensina que o pecado separa as pessoas de Deus, mas através de Cristo, há redenção e reconciliação.",
    },
    {
      id: "salvation",
      name: "Salvação",
      description: "A salvação refere-se à libertação do pecado e suas consequências através da obra redentora de Jesus Cristo. Inclui justificação (ser declarado justo diante de Deus), santificação (processo de crescimento na semelhança com Cristo) e glorificação (estado final de perfeição com Deus). A salvação é pela graça, mediante a fé em Cristo (Efésios 2:8-9).",
      multipleViews: [
        { 
          title: "Visão Arminiana", 
          description: "Enfatiza o livre-arbítrio humano na aceitação da salvação. Sustenta que a graça de Deus pode ser resistida e que a salvação pode ser perdida se a pessoa se afastar da fé." 
        },
        { 
          title: "Visão Calvinista", 
          description: "Enfatiza a soberania de Deus na eleição. Sustenta que Deus predestina quem será salvo, e que a graça é irresistível para os eleitos. A salvação, uma vez recebida, não pode ser perdida." 
        }
      ]
    },
    {
      id: "eschatology",
      name: "Escatologia",
      description: "Escatologia é o estudo das últimas coisas, incluindo a segunda vinda de Cristo, ressurreição, julgamento final e o estado eterno. As profecias sobre estes eventos são encontradas em vários livros bíblicos, incluindo Daniel, os evangelhos e Apocalipse.",
      multipleViews: [
        { 
          title: "Pré-Milenismo", 
          description: "Cristo retornará antes do milênio (período de mil anos de seu reinado na Terra). O arrebatamento da igreja ocorrerá antes da grande tribulação." 
        },
        { 
          title: "Pós-Milenismo", 
          description: "Cristo retornará após o milênio, que é visto como um período de prosperidade e domínio cristão gradual no mundo." 
        },
        { 
          title: "Amilenismo", 
          description: "O milênio é simbólico, representando o reino atual de Cristo na igreja. Não haverá um reinado literal de mil anos na Terra." 
        }
      ]
    }
  ];

  const filteredTopics = theologicalTopics.filter(topic => 
    topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectTopic = (topic: TheologicalTopic) => {
    setSelectedTopic(topic);
    setShowSearch(false);
  };

  return (
    <section id="theological-explanation" className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <BookText size={24} className="text-amber-700" />
        <h2 className="text-2xl font-bold text-blue-900">Explicação Teológica</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Explore conceitos teológicos como graça, fé, pecado, escatologia e outros temas, 
        com explicações bíblicas e diferentes perspectivas quando aplicável.
      </p>

      {!showSearch && !selectedTopic && (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Button 
            onClick={() => setShowSearch(true)}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <Search className="mr-2 h-4 w-4" /> Pesquisar por conceito
          </Button>
          <div className="flex-1 grid grid-cols-2 gap-2">
            {theologicalTopics.slice(0, 4).map(topic => (
              <Button 
                key={topic.id}
                variant="outline" 
                className="justify-start"
                onClick={() => handleSelectTopic(topic)}
              >
                <BookOpen className="mr-2 h-4 w-4" /> {topic.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {showSearch && (
        <div className="mb-6">
          <Command className="rounded-lg border shadow-md">
            <CommandInput 
              placeholder="Pesquisar conceito teológico..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>Nenhum conceito encontrado.</CommandEmpty>
              <CommandGroup heading="Conceitos Teológicos">
                {filteredTopics.map(topic => (
                  <CommandItem 
                    key={topic.id}
                    onSelect={() => handleSelectTopic(topic)}
                    className="cursor-pointer"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    {topic.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <div className="mt-2 text-right">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowSearch(false)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {selectedTopic && (
        <div className="mt-6">
          <Alert className="bg-blue-50 border-blue-200 mb-4">
            <BookText className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-blue-900">{selectedTopic.name}</AlertTitle>
            <AlertDescription className="mt-2 text-gray-700">
              {selectedTopic.description}
            </AlertDescription>
          </Alert>

          {selectedTopic.multipleViews && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 text-blue-800">Diferentes perspectivas:</h3>
              <div className="space-y-3">
                {selectedTopic.multipleViews.map((view, index) => (
                  <Alert key={index} className="bg-amber-50 border-amber-200">
                    <AlertTitle className="text-amber-900">{view.title}</AlertTitle>
                    <AlertDescription className="mt-1 text-gray-700">
                      {view.description}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <Button 
              variant="outline"
              onClick={() => setSelectedTopic(null)}
            >
              Voltar aos conceitos
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
