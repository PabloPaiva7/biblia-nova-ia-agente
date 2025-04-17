
import { useState } from "react";
import { Book, Award, Star, Bookmark } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type MemorizationVerse = {
  id: string;
  reference: string;
  text: string;
  progress: number; // 0-100
  lastPracticed?: Date;
};

type Quiz = {
  id: string;
  verseId: string;
  type: "fillBlank" | "arrange" | "multipleChoice";
  question: string;
  options?: string[];
  correctAnswer: string | string[];
};

const EXAMPLE_VERSES: MemorizationVerse[] = [
  {
    id: "verse1",
    reference: "João 3:16",
    text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    progress: 80,
    lastPracticed: new Date(2025, 3, 15)
  },
  {
    id: "verse2",
    reference: "Salmos 23:1",
    text: "O Senhor é o meu pastor, nada me faltará.",
    progress: 60,
    lastPracticed: new Date(2025, 3, 10)
  },
  {
    id: "verse3",
    reference: "Filipenses 4:13",
    text: "Posso todas as coisas naquele que me fortalece.",
    progress: 40,
    lastPracticed: new Date(2025, 3, 5)
  },
];

const EXAMPLE_QUIZZES: Quiz[] = [
  {
    id: "quiz1",
    verseId: "verse1",
    type: "fillBlank",
    question: "Porque Deus amou o mundo de tal maneira que deu o seu _____ unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    correctAnswer: "Filho"
  },
  {
    id: "quiz2",
    verseId: "verse1",
    type: "multipleChoice",
    question: "Complete a frase: 'Porque Deus amou o mundo de tal maneira que...'",
    options: [
      "deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
      "enviou seu único Filho, para que todos tenham salvação.",
      "entregou seu Filho amado, para que os pecadores sejam salvos.",
      "mandou seu Filho, para que todos sejam redimidos."
    ],
    correctAnswer: "deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna."
  },
  {
    id: "quiz3",
    verseId: "verse2",
    type: "arrange",
    question: "Arrange as palavras na ordem correta:",
    options: ["nada", "O", "pastor,", "é", "me", "faltará.", "Senhor", "o", "meu"],
    correctAnswer: ["O", "Senhor", "é", "o", "meu", "pastor,", "nada", "me", "faltará."]
  },
];

export function ScriptureMemorization() {
  const [verses, setVerses] = useState<MemorizationVerse[]>(EXAMPLE_VERSES);
  const [selectedVerse, setSelectedVerse] = useState<MemorizationVerse | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<{correct: boolean; message: string} | null>(null);
  const [arrangeWords, setArrangeWords] = useState<{word: string; selected: boolean}[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  
  const getRandomQuiz = (verseId: string): Quiz | null => {
    const versesQuizzes = EXAMPLE_QUIZZES.filter(q => q.verseId === verseId);
    if (versesQuizzes.length === 0) return null;
    return versesQuizzes[Math.floor(Math.random() * versesQuizzes.length)];
  };
  
  const startQuiz = (verse: MemorizationVerse) => {
    setSelectedVerse(verse);
    const quiz = getRandomQuiz(verse.id);
    setCurrentQuiz(quiz);
    
    if (quiz && quiz.type === "arrange") {
      const shuffledWords = [...quiz.options as string[]].sort(() => Math.random() - 0.5);
      setArrangeWords(shuffledWords.map(word => ({ word, selected: false })));
      setSelectedWords([]);
    } else {
      setUserAnswer("");
    }
    
    setFeedback(null);
    setQuizOpen(true);
  };
  
  const checkAnswer = () => {
    if (!currentQuiz) return;
    
    let isCorrect = false;
    let message = "";
    
    if (currentQuiz.type === "fillBlank" || currentQuiz.type === "multipleChoice") {
      isCorrect = userAnswer.toLowerCase() === (currentQuiz.correctAnswer as string).toLowerCase();
      message = isCorrect ? "Correto! Muito bem!" : "Não foi dessa vez. Tente novamente!";
    } else if (currentQuiz.type === "arrange") {
      const correctAnswerString = (currentQuiz.correctAnswer as string[]).join(" ");
      const userAnswerString = selectedWords.join(" ");
      isCorrect = correctAnswerString === userAnswerString;
      message = isCorrect ? "Sequência correta! Parabéns!" : "Sequência incorreta. Tente outra vez!";
    }
    
    setFeedback({ correct: isCorrect, message });
    
    if (isCorrect) {
      // Update verse progress
      setVerses(verses.map(v => 
        v.id === selectedVerse?.id 
          ? { 
              ...v, 
              progress: Math.min(100, v.progress + 10),
              lastPracticed: new Date()
            } 
          : v
      ));
    }
  };
  
  const selectWord = (index: number) => {
    if (!arrangeWords[index].selected) {
      setSelectedWords([...selectedWords, arrangeWords[index].word]);
      setArrangeWords(arrangeWords.map((item, i) => 
        i === index ? { ...item, selected: true } : item
      ));
    }
  };
  
  const removeSelectedWord = (index: number) => {
    const word = selectedWords[index];
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
    
    setArrangeWords(arrangeWords.map(item => 
      item.word === word && item.selected ? { ...item, selected: false } : item
    ));
  };
  
  const resetQuiz = () => {
    setUserAnswer("");
    setFeedback(null);
    
    if (currentQuiz?.type === "arrange") {
      const shuffledWords = [...currentQuiz.options as string[]].sort(() => Math.random() - 0.5);
      setArrangeWords(shuffledWords.map(word => ({ word, selected: false })));
      setSelectedWords([]);
    }
  };
  
  // Get user level based on average progress
  const getUserLevel = () => {
    const avgProgress = verses.reduce((sum, verse) => sum + verse.progress, 0) / verses.length;
    if (avgProgress >= 90) return "Mestre da Palavra";
    if (avgProgress >= 70) return "Avançado";
    if (avgProgress >= 50) return "Intermediário";
    if (avgProgress >= 30) return "Aprendiz";
    return "Iniciante";
  };
  
  const getTotalPoints = () => {
    return verses.reduce((sum, verse) => sum + verse.progress, 0);
  };

  return (
    <Card id="scripture-memorization" className="mb-8">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100">
        <div className="flex items-center gap-2">
          <Bookmark className="h-6 w-6 text-amber-600" />
          <CardTitle>Memorização de Versículos</CardTitle>
        </div>
        <CardDescription>
          Aprenda versículos através de mini jogos e desafios para fixar as escrituras na mente e no coração
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="bg-amber-50 rounded-lg p-4 flex-1 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-amber-500" />
              <h3 className="font-medium">Seu nível</h3>
            </div>
            <p className="text-xl font-semibold text-amber-700">{getUserLevel()}</p>
            <div className="mt-2 flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span className="text-sm">{getTotalPoints()} pontos</span>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 flex-1 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Book className="h-5 w-5 text-blue-500" />
              <h3 className="font-medium">Resumo</h3>
            </div>
            <p className="text-sm">Versículos em progresso: <span className="font-medium">{verses.length}</span></p>
            <p className="text-sm mt-1">Último praticado: <span className="font-medium">
              {verses.length > 0 ? 
                new Date(Math.max(...verses.map(v => v.lastPracticed?.getTime() || 0)))
                  .toLocaleDateString('pt-BR') : 
                'Nenhum'}
            </span></p>
          </div>
        </div>
        
        <h3 className="font-medium text-lg mb-3">Seus versículos</h3>
        <div className="space-y-3">
          {verses.map((verse) => (
            <div key={verse.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{verse.reference}</h4>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => startQuiz(verse)}
                  className="text-xs"
                >
                  Praticar
                </Button>
              </div>
              <p className="verse-text text-gray-700 text-sm mb-4">"{verse.text}"</p>
              <div className="flex items-center gap-2">
                <div className="h-2 bg-gray-200 rounded-full flex-grow">
                  <div 
                    className="h-2 bg-amber-500 rounded-full"
                    style={{ width: `${verse.progress}%` }}
                  />
                </div>
                <span className="text-xs font-medium">{verse.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <Button variant="outline">Adicionar novo versículo</Button>
      </CardFooter>
      
      {/* Quiz Dialog */}
      {selectedVerse && currentQuiz && (
        <Dialog open={quizOpen} onOpenChange={setQuizOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Quiz: {selectedVerse.reference}</DialogTitle>
              <DialogDescription>Teste seus conhecimentos sobre o versículo</DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              {currentQuiz.type === "fillBlank" && (
                <div>
                  <p className="mb-4">Complete a lacuna:</p>
                  <p className="mb-6 verse-text">{currentQuiz.question}</p>
                  
                  <Input
                    placeholder="Digite a palavra que falta"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    disabled={!!feedback}
                  />
                </div>
              )}
              
              {currentQuiz.type === "multipleChoice" && (
                <div>
                  <p className="mb-4">{currentQuiz.question}</p>
                  <div className="space-y-2">
                    {currentQuiz.options?.map((option, index) => (
                      <div 
                        key={index}
                        className={`p-3 border rounded-md cursor-pointer transition ${
                          userAnswer === option ? 'bg-blue-50 border-blue-300' : ''
                        } ${feedback ? 'pointer-events-none' : 'hover:bg-gray-50'}`}
                        onClick={() => setUserAnswer(option)}
                      >
                        <p>{option}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {currentQuiz.type === "arrange" && (
                <div>
                  <p className="mb-4">{currentQuiz.question}</p>
                  
                  <div className="p-4 bg-gray-50 rounded-md min-h-[60px] mb-4 flex flex-wrap gap-2">
                    {selectedWords.map((word, index) => (
                      <div 
                        key={index}
                        className="bg-blue-100 px-3 py-1 rounded cursor-pointer"
                        onClick={() => !feedback && removeSelectedWord(index)}
                      >
                        {word}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {arrangeWords.map((item, index) => (
                      <div 
                        key={index}
                        className={`px-3 py-1 rounded cursor-pointer ${
                          item.selected ? 'bg-gray-200 opacity-50' : 'bg-gray-100'
                        }`}
                        onClick={() => !item.selected && !feedback && selectWord(index)}
                      >
                        {item.word}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {feedback && (
                <div className={`mt-6 p-3 rounded-md ${
                  feedback.correct ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  <p className="font-medium">{feedback.message}</p>
                  {!feedback.correct && (
                    <p className="text-sm mt-1">
                      {currentQuiz.type === "arrange" ? 
                        `Ordem correta: ${(currentQuiz.correctAnswer as string[]).join(" ")}` : 
                        `Resposta correta: ${currentQuiz.correctAnswer}`}
                    </p>
                  )}
                </div>
              )}
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              {!feedback ? (
                <Button 
                  onClick={checkAnswer} 
                  disabled={
                    (currentQuiz.type !== "arrange" && !userAnswer) || 
                    (currentQuiz.type === "arrange" && selectedWords.length === 0)
                  }
                >
                  Verificar resposta
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={resetQuiz}>
                    Tentar novamente
                  </Button>
                  <Button onClick={() => setQuizOpen(false)}>
                    {feedback.correct ? 'Concluir' : 'Fechar'}
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
