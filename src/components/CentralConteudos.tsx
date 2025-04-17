
import { useState } from "react";
import { BookOpen, Library, FileText, Film, Link, Search, BookMarked, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type ConteudoItem = {
  id: string;
  titulo: string;
  tipo: "artigo" | "reflexao" | "video" | "link";
  descricao: string;
  fonte: string;
  url?: string;
  dataPublicacao: string;
  tags: string[];
};

export function CentralConteudos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todos");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Dados de exemplo para a biblioteca de conteúdos
  const conteudos: ConteudoItem[] = [
    {
      id: "1",
      titulo: "A Interpretação Bíblica através dos Séculos",
      tipo: "artigo",
      descricao: "Uma análise histórica dos métodos de interpretação bíblica desde os pais da igreja até os dias atuais.",
      fonte: "Revista Teológica Brasileira",
      dataPublicacao: "2023-03-15",
      tags: ["hermenêutica", "história", "interpretação"]
    },
    {
      id: "2",
      titulo: "Reflexão sobre Salmos 23",
      tipo: "reflexao",
      descricao: "Uma meditação profunda sobre as metáforas e aplicações do Salmo do Pastor para a vida contemporânea.",
      fonte: "Pastor João Silva",
      dataPublicacao: "2023-05-22",
      tags: ["salmos", "devoção", "conforto"]
    },
    {
      id: "3",
      titulo: "As Parábolas de Jesus - Contexto Histórico",
      tipo: "video",
      descricao: "Série de vídeos explicando o contexto histórico-cultural das parábolas de Jesus e suas implicações.",
      fonte: "Canal Teologia Prática",
      url: "#",
      dataPublicacao: "2023-02-10",
      tags: ["parábolas", "jesus", "novo testamento", "vídeo"]
    },
    {
      id: "4",
      titulo: "Recursos para Estudo do Grego Bíblico",
      tipo: "link",
      descricao: "Compilação de ferramentas online e livros para o estudo do grego koiné do Novo Testamento.",
      fonte: "Seminário Teológico",
      url: "#",
      dataPublicacao: "2023-04-30",
      tags: ["grego", "estudo bíblico", "recursos"]
    },
    {
      id: "5",
      titulo: "A Teologia Paulina da Justificação",
      tipo: "artigo",
      descricao: "Um estudo aprofundado sobre o conceito de justificação nos escritos do apóstolo Paulo.",
      fonte: "Revista Teológica Perspectivas",
      dataPublicacao: "2023-01-18",
      tags: ["paulo", "justificação", "novo testamento", "teologia"]
    }
  ];

  // Extrair todas as tags únicas
  const allTags = Array.from(new Set(conteudos.flatMap(item => item.tags)));
  
  // Filtrar conteúdos com base na pesquisa e filtros
  const filteredConteudos = conteudos.filter(item => {
    // Filtro por texto
    const matchesSearch = 
      searchTerm === "" || 
      item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filtro por tipo
    const matchesType = 
      activeTab === "todos" || 
      item.tipo === activeTab;
    
    // Filtro por tags
    const matchesTags = 
      selectedTags.length === 0 || 
      selectedTags.every(tag => item.tags.includes(tag));
    
    return matchesSearch && matchesType && matchesTags;
  });

  // Manipulador para alternar seleção de tags
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const getIconByType = (tipo: string) => {
    switch (tipo) {
      case 'artigo': return <FileText className="h-5 w-5 text-blue-600" />;
      case 'reflexao': return <BookMarked className="h-5 w-5 text-amber-600" />;
      case 'video': return <Film className="h-5 w-5 text-red-600" />;
      case 'link': return <Link className="h-5 w-5 text-green-600" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <section id="central-conteudos" className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Library size={24} className="text-purple-700" />
        <h2 className="text-2xl font-bold text-blue-900">Central de Conteúdos</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Biblioteca com artigos, reflexões, vídeos e links úteis para seu crescimento espiritual 
        e estudos bíblicos. Conteúdo curado e organizado por temas.
      </p>

      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-3 mb-3">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Pesquisar conteúdos..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Plus size={16} className={showFilters ? "rotate-45 transition-transform" : "transition-transform"} />
            Filtros
          </Button>
        </div>

        <Collapsible open={showFilters} className="mb-4">
          <CollapsibleContent>
            <div className="p-4 border rounded-md bg-gray-50 mt-2">
              <h3 className="font-medium mb-2">Filtrar por tags:</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Button
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleTag(tag)}
                    className={selectedTags.includes(tag) ? "bg-blue-600" : ""}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="artigo">Artigos</TabsTrigger>
            <TabsTrigger value="reflexao">Reflexões</TabsTrigger>
            <TabsTrigger value="video">Vídeos</TabsTrigger>
            <TabsTrigger value="link">Links</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filteredConteudos.length === 0 ? (
        <div className="text-center py-10 border rounded-md">
          <BookOpen className="h-10 w-10 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">Nenhum conteúdo encontrado com os filtros selecionados</p>
          <Button 
            variant="link" 
            onClick={() => {
              setSearchTerm("");
              setActiveTab("todos");
              setSelectedTags([]);
            }}
          >
            Limpar filtros
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredConteudos.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {getIconByType(item.tipo)}
                      <CardTitle className="text-lg">{item.titulo}</CardTitle>
                    </div>
                    <CardDescription>{item.fonte} • {new Date(item.dataPublicacao).toLocaleDateString('pt-BR')}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{item.descricao}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {item.tags.map(tag => (
                    <span key={`${item.id}-${tag}`} className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled={!item.url}>
                  {item.tipo === 'video' ? 'Assistir Vídeo' : 
                   item.tipo === 'link' ? 'Acessar Link' : 
                   'Ler Conteúdo Completo'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-medium mb-3">Estatísticas de Conteúdo</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Quantidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="flex items-center">
                <FileText className="h-4 w-4 text-blue-600 mr-2" />
                Artigos
              </TableCell>
              <TableCell className="text-right">{conteudos.filter(c => c.tipo === 'artigo').length}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center">
                <BookMarked className="h-4 w-4 text-amber-600 mr-2" />
                Reflexões
              </TableCell>
              <TableCell className="text-right">{conteudos.filter(c => c.tipo === 'reflexao').length}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center">
                <Film className="h-4 w-4 text-red-600 mr-2" />
                Vídeos
              </TableCell>
              <TableCell className="text-right">{conteudos.filter(c => c.tipo === 'video').length}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center">
                <Link className="h-4 w-4 text-green-600 mr-2" />
                Links
              </TableCell>
              <TableCell className="text-right">{conteudos.filter(c => c.tipo === 'link').length}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
