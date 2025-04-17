import { useState } from "react";
import { HelpCircle, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

export function ChristianQA() {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<Array<{ question: string; answer: string }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API response
    setTimeout(() => {
      // Example answers based on common faith questions
      const responseText = getSimulatedResponse(question);
      
      setAnswers([...answers, { 
        question: question, 
        answer: responseText 
      }]);
      setQuestion("");
      setIsSubmitting(false);
      
      toast({
        title: "Resposta recebida",
        description: "Sua pergunta foi respondida com base em princípios bíblicos.",
      });
    }, 1500);
  };

  const getSimulatedResponse = (q: string): string => {
    const lowerQ = q.toLowerCase();
    if (lowerQ.includes("perdão") || lowerQ.includes("perdoar")) {
      return "O perdão é um dos ensinamentos centrais do cristianismo. Em Mateus 6:14-15, Jesus diz: 'Porque, se perdoardes aos homens as suas ofensas, também vosso Pai celestial vos perdoará; mas, se não perdoardes aos homens as suas ofensas, tampouco vosso Pai vos perdoará as vossas ofensas.' O perdão não é apenas algo que recebemos de Deus, mas algo que somos chamados a estender aos outros.";
    } else if (lowerQ.includes("oração") || lowerQ.includes("rezar") || lowerQ.includes("orar")) {
      return "A oração é nossa forma de comunicação com Deus. Em 1 Tessalonicenses 5:17, Paulo nos instrui a 'orar sem cessar'. Jesus também ensinou seus discípulos a orar através do Pai Nosso (Mateus 6:9-13). A oração não precisa ser elaborada ou formal, mas sim sincera e vinda do coração.";
    } else if (lowerQ.includes("sofrimento") || lowerQ.includes("dor") || lowerQ.includes("problema")) {
      return "O sofrimento é uma realidade em nossa vida terrena. Romanos 8:18 diz: 'Porque para mim tenho por certo que os sofrimentos do tempo presente não podem ser comparados com a glória que em nós há de ser revelada.' A Bíblia não promete ausência de dor, mas sim a presença de Deus em meio às tribulações. Em João 16:33, Jesus diz: 'No mundo tereis aflições, mas tende bom ânimo; eu venci o mundo.'";
    } else {
      return "Esta é uma questão importante. Embora não tenha uma resposta específica para sua pergunta neste momento, posso encorajá-lo a buscar orientação na Bíblia e em uma comunidade de fé local. 'Pedi, e dar-se-vos-á; buscai e encontrareis; batei, e abrir-se-vos-á.' (Mateus 7:7)";
    }
  };

  const sampleQuestions = [
    "Como posso perdoar alguém que me magoou profundamente?",
    "Como melhorar minha vida de oração?",
    "Por que Deus permite o sofrimento?"
  ];

  return (
    <section id="christian-qa" className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle size={24} className="text-blue-700" />
        <h2 className="text-2xl font-bold text-blue-900">Atendimento Cristão (Q&A)</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Tire suas dúvidas sobre fé, vida cristã e comportamentos com base na Bíblia.
      </p>

      {answers.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-blue-800">Suas perguntas anteriores:</h3>
          <Accordion type="single" collapsible className="w-full">
            {answers.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Textarea 
            placeholder="Digite sua pergunta sobre fé, vida cristã ou comportamento..." 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[100px] w-full"
          />
        </div>
        
        <Button 
          type="submit" 
          className="bg-blue-700 hover:bg-blue-800"
          disabled={!question.trim() || isSubmitting}
        >
          {isSubmitting ? "Processando..." : "Enviar Pergunta"}
          <Send size={16} className="ml-2" />
        </Button>
      </form>

      {!answers.length && (
        <div className="mt-6">
          <Alert>
            <HelpCircle className="h-4 w-4" />
            <AlertDescription>
              <span className="font-medium block mb-2">Exemplos de perguntas:</span>
              <ul className="list-disc pl-5 space-y-1">
                {sampleQuestions.map((q, i) => (
                  <li key={i}>
                    <button 
                      onClick={() => setQuestion(q)}
                      className="text-blue-600 hover:underline text-left"
                    >
                      {q}
                    </button>
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </section>
  );
}
