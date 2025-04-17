
import { useState } from "react";
import { Sparkles, Send, Mail, MessageSquare, Share2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type UserProfile = "jovem" | "adulto" | "lider" | "casal" | "familia" | "idoso";

interface DevotionalContent {
  title: string;
  verse: string;
  reference: string;
  message: string;
  prayer: string;
  challenge: string;
}

export function DevotionalGenerator() {
  const [profile, setProfile] = useState<UserProfile>("adulto");
  const [isGenerating, setIsGenerating] = useState(false);
  const [devotional, setDevotional] = useState<DevotionalContent | null>(null);
  const [shareEmail, setShareEmail] = useState("");
  const { toast } = useToast();

  const generateDevotional = () => {
    setIsGenerating(true);
    // Simulated generation delay
    setTimeout(() => {
      // Content varies based on selected profile
      const devotionalContent: DevotionalContent = 
        profile === "jovem" ? {
          title: "Encontrando Propósito",
          verse: "Não se deixem influenciar pelo padrão deste mundo, mas deixem que Deus os transforme pela renovação da sua mente.",
          reference: "Romanos 12:2",
          message: "Na era das redes sociais e pressão dos colegas, é fácil se comparar com outros e seguir tendências. Deus te convida a uma transformação mais profunda - a renovação da sua mente. Isso significa desenvolver uma perspectiva baseada nas verdades de Deus, não nas expectativas dos outros. Quando permitimos que Deus renove nossos pensamentos, descobrimos o propósito único que Ele tem para nossas vidas.",
          prayer: "Senhor, ajuda-me a não seguir cegamente o que o mundo diz que devo ser. Renova minha mente para que eu possa discernir Tua vontade e viver no propósito que planejaste para mim. Amém.",
          challenge: "Esta semana, identifique uma área onde você está sendo excessivamente influenciado pelas opiniões dos outros. Tire um tempo para buscar a perspectiva de Deus sobre isso na Bíblia."
        } :
        profile === "lider" ? {
          title: "Liderança Servidora",
          verse: "O maior entre vocês deverá ser servo.",
          reference: "Mateus 23:11",
          message: "A verdadeira grandeza na liderança não está em títulos ou posições, mas na disposição de servir. Jesus virou o modelo de liderança do mundo de cabeça para baixo, ensinando que os maiores líderes são aqueles que servem mais. Como líder, seu impacto é mais profundo quando sua autoridade está alicerçada em humildade e seu foco está em elevar aqueles ao seu redor.",
          prayer: "Pai, guarda-me do orgulho e da autoimportância em minha posição de liderança. Ensina-me a liderar como Jesus, priorizando as necessidades daqueles que lidero antes das minhas próprias. Amém.",
          challenge: "Faça algo prático esta semana para servir alguém que você lidera, algo que normalmente poderia ser considerado 'abaixo' da sua posição."
        } : 
        profile === "casal" ? {
          title: "Crescendo Juntos em Graça",
          verse: "Acima de tudo, amem-se profundamente uns aos outros, pois o amor cobre multidão de pecados.",
          reference: "1 Pedro 4:8",
          message: "No casamento, conhecemos tanto as melhores qualidades quanto as imperfeições um do outro. O amor verdadeiro não é cego a essas falhas, mas escolhe cobri-las com graça. Isto não significa ignorar problemas, mas abordar os desafios com um espírito de paciência e perdão. Quando vocês permitem que o amor supere as ofensas, criam um relacionamento onde ambos podem ser autênticos e crescer juntos.",
          prayer: "Senhor, ajuda-nos a refletir Teu amor perdoador em nosso casamento. Quando nos magoamos, dá-nos a graça para escolher o amor acima do ressentimento. Amém.",
          challenge: "Esta semana, conversem sobre algo que tem causado tensão no relacionamento, com o compromisso de ouvir completamente e responder com graça, não com defesa."
        } :
        {
          title: "Paz nas Tempestades",
          verse: "Deixo-vos a paz, a minha paz vos dou. Não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.",
          reference: "João 14:27",
          message: "A paz que Jesus oferece não depende das circunstâncias externas estarem calmas. É uma paz interior que permanece mesmo quando as tempestades da vida surgem. O mundo busca paz na ausência de problemas, mas Jesus promete paz em meio às dificuldades. Esta paz vem da confiança em que Ele está no controle e que Seu propósito prevalecerá além do que conseguimos enxergar no momento.",
          prayer: "Senhor Jesus, recebo a paz que só Tu podes dar. Quando as circunstâncias ao meu redor parecem caóticas, ajuda-me a ancorar meu coração na Tua presença e nas Tuas promessas. Amém.",
          challenge: "Identifique uma situação que está tirando sua paz atualmente. Escreva três verdades da Palavra de Deus que você pode lembrar quando se sentir ansioso sobre essa situação."
        };
      
      setDevotional(devotionalContent);
      setIsGenerating(false);
    }, 2000);
  };

  const shareDevotional = (method: "whatsapp" | "email" | "other") => {
    if (!devotional) return;
    
    const devotionalText = `
*${devotional.title}*

"${devotional.verse}" - ${devotional.reference}

${devotional.message}

*Oração*: ${devotional.prayer}

*Desafio*: ${devotional.challenge}

-- Enviado por BIBL.IA
    `;
    
    if (method === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(devotionalText)}`);
    } else if (method === "email") {
      window.open(`mailto:?subject=Devocional BIBL.IA: ${devotional.title}&body=${encodeURIComponent(devotionalText)}`);
    } else {
      navigator.clipboard.writeText(devotionalText);
      toast({
        title: "Devocional copiado",
        description: "O texto foi copiado para a área de transferência",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          Devocional Diário Personalizado
        </CardTitle>
        <CardDescription>
          Receba um devocional baseado no seu perfil e necessidades espirituais
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Selecione seu perfil:
          </label>
          <Select value={profile} onValueChange={(value) => setProfile(value as UserProfile)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione seu perfil" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jovem">Jovem</SelectItem>
              <SelectItem value="adulto">Adulto</SelectItem>
              <SelectItem value="lider">Líder</SelectItem>
              <SelectItem value="casal">Casal</SelectItem>
              <SelectItem value="familia">Família</SelectItem>
              <SelectItem value="idoso">Idoso</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={generateDevotional} 
          className="w-full" 
          disabled={isGenerating}
        >
          {isGenerating ? 
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando seu devocional...</> : 
            <><Sparkles className="mr-2 h-4 w-4" /> Gerar Devocional</>}
        </Button>
        
        {devotional && (
          <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">{devotional.title}</h3>
            
            <div className="mb-4 p-3 bg-white/70 rounded border-l-4 border-amber-400">
              <p className="italic">"{devotional.verse}"</p>
              <p className="text-right text-sm font-medium">- {devotional.reference}</p>
            </div>
            
            <div className="mb-4 space-y-2">
              <p className="text-gray-700">{devotional.message}</p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-blue-700">Oração:</h4>
              <p className="text-gray-700 italic">{devotional.prayer}</p>
            </div>
            
            <div className="mb-2">
              <h4 className="font-medium text-blue-700">Desafio:</h4>
              <p className="text-gray-700">{devotional.challenge}</p>
            </div>
          </div>
        )}
      </CardContent>
      
      {devotional && (
        <CardFooter className="flex-col space-y-4">
          <div className="w-full border-t pt-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Share2 className="h-4 w-4" /> 
              Compartilhar Devocional
            </h4>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => shareDevotional("whatsapp")}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => shareDevotional("email")}
              >
                <Mail className="h-4 w-4 mr-2" />
                E-mail
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => shareDevotional("other")}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Copiar
              </Button>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
