
import { useState } from "react";
import { Book, Users, ChevronRight, ChevronDown, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

type Study = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  questions: Question[];
  forGroups: boolean;
};

type Question = {
  id: string;
  text: string;
  reflection: string;
  answered: boolean;
  userAnswer?: string;
};

const EXAMPLE_STUDIES: Study[] = [
  {
    id: "1",
    title: "As Bem-Aventuranças",
    description: "Um estudo sobre Mateus 5 e as bênçãos prometidas por Jesus.",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    forGroups: false,
    questions: [
      {
        id: "q1",
        text: "O que significa ser 'pobre de espírito'?",
        reflection: "Considere como a humildade se relaciona com a vida espiritual.",
        answered: false,
      },
      {
        id: "q2",
        text: "Como podemos ser 'pacificadores' em nosso contexto atual?",
        reflection: "Pense em exemplos práticos para promover a paz em seu círculo de influência.",
        answered: false,
      },
      {
        id: "q3",
        text: "De que maneira as bem-aventuranças contrastam com os valores da sociedade?",
        reflection: "Compare os valores exaltados por Jesus com aqueles celebrados pela cultura contemporânea.",
        answered: false,
      },
    ],
  },
  {
    id: "2",
    title: "Os Frutos do Espírito",
    description: "Explorando Gálatas 5 e as características produzidas pelo Espírito Santo.",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    forGroups: true,
    questions: [
      {
        id: "q1",
        text: "Como o amor é demonstrado como fruto do Espírito em ações práticas?",
        reflection: "Pense em exemplos concretos de como este fruto se manifesta no dia a dia.",
        answered: false,
      },
      {
        id: "q2",
        text: "Qual a diferença entre alegria como fruto do Espírito e felicidade mundana?",
        reflection: "Reflita sobre a natureza permanente da alegria espiritual versus os altos e baixos emocionais.",
        answered: false,
      },
      {
        id: "q3",
        text: "De que maneira o domínio próprio nos ajuda a crescer nos outros frutos?",
        reflection: "Considere como a disciplina espiritual favorece o desenvolvimento do caráter cristão.",
        answered: false,
      },
    ],
  },
];

export function InteractiveBibleStudy() {
  const [studies, setStudies] = useState<Study[]>(EXAMPLE_STUDIES);
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string>("");
  const [isGroupStudy, setIsGroupStudy] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  
  const handleSelectStudy = (study: Study) => {
    setSelectedStudy(study);
    setShowDialog(true);
  };
  
  const handleToggleQuestion = (questionId: string) => {
    if (activeQuestion === questionId) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(questionId);
    }
  };
  
  const handleSubmitAnswer = (questionId: string) => {
    if (!answer.trim()) return;
    
    setStudies(studies.map(study => 
      study.id === selectedStudy?.id 
        ? {
            ...study,
            questions: study.questions.map(q => 
              q.id === questionId 
                ? { ...q, answered: true, userAnswer: answer } 
                : q
            )
          }
        : study
    ));
    
    setAnswer("");
    setActiveQuestion(null);
  };
  
  const calculateProgress = (study: Study) => {
    const answered = study.questions.filter(q => q.answered).length;
    return Math.round((answered / study.questions.length) * 100);
  };
  
  const handleGroupStudyToggle = (checked: boolean) => {
    setIsGroupStudy(checked);
  };
  
  const filteredStudies = isGroupStudy 
    ? studies.filter(s => s.forGroups) 
    : studies;

  return (
    <Card id="interactive-bible-study" className="mb-8">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Book className="h-6 w-6 text-blue-700" />
            <CardTitle>Estudo Bíblico Interativo</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox 
              id="group-study" 
              checked={isGroupStudy}
              onCheckedChange={handleGroupStudyToggle} 
            />
            <label htmlFor="group-study" className="text-sm flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Estudo em grupo
            </label>
          </div>
        </div>
        <CardDescription>
          Aprenda com perguntas e reflexões guiadas para aprofundar seu conhecimento bíblico
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStudies.map((study) => (
            <div 
              key={study.id} 
              className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleSelectStudy(study)}
            >
              <div 
                className="h-36 bg-cover bg-center" 
                style={{ backgroundImage: `url(${study.imageUrl})` }}
              />
              <div className="p-4">
                <h3 className="font-medium text-lg">{study.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{study.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {study.forGroups ? (
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        Estudo em grupo
                      </span>
                    ) : "Estudo individual"}
                  </div>
                  <div className="text-sm font-medium text-blue-600">
                    {calculateProgress(study)}% completo
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <Button variant="outline">Explorar mais estudos</Button>
      </CardFooter>

      {selectedStudy && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedStudy.title}</DialogTitle>
              <DialogDescription>{selectedStudy.description}</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 my-4">
              {selectedStudy.questions.map((question) => (
                <Collapsible
                  key={question.id}
                  open={activeQuestion === question.id}
                  onOpenChange={() => handleToggleQuestion(question.id)}
                  className="border rounded-md"
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-4 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      {question.answered && (
                        <span className="text-green-600">
                          <Check className="h-4 w-4" />
                        </span>
                      )}
                      <span className="font-medium">{question.text}</span>
                    </div>
                    {activeQuestion === question.id ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 border-t bg-gray-50">
                    <p className="text-gray-600 italic mb-4">{question.reflection}</p>
                    {question.answered ? (
                      <div>
                        <p className="font-medium text-sm text-gray-500">Sua resposta:</p>
                        <p className="mt-1">{question.userAnswer}</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Input
                          placeholder="Escreva sua resposta aqui..."
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          className="w-full"
                        />
                        <Button 
                          onClick={() => handleSubmitAnswer(question.id)}
                          disabled={!answer.trim()}
                        >
                          Salvar resposta
                        </Button>
                      </div>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
