
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Calendar, Check, ChevronDown, Clock, ListChecks, Bookmark } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function BibleReadingPlan() {
  const [isOpen, setIsOpen] = useState(false);
  const [planName, setPlanName] = useState("");
  const [planType, setPlanType] = useState<"time" | "theme">("time");
  const [activePlans, setActivePlans] = useState([
    { 
      id: 1, 
      name: "Novo Testamento em 3 meses", 
      progress: 35, 
      type: "time", 
      current: "Mateus 12",
      nextReading: "Mateus 13-14",
      daysCompleted: 15,
      totalDays: 90
    },
    { 
      id: 2, 
      name: "Estudo sobre Graça", 
      progress: 50, 
      type: "theme", 
      current: "Efésios 2",
      nextReading: "Romanos 5-6",
      daysCompleted: 7,
      totalDays: 14
    }
  ]);
  
  const handleAddPlan = () => {
    if (planName.trim()) {
      const newPlan = {
        id: Date.now(),
        name: planName,
        progress: 0,
        type: planType,
        current: planType === "time" ? "Gênesis 1" : "Introdução ao tema",
        nextReading: planType === "time" ? "Gênesis 2-3" : "Versículos principais",
        daysCompleted: 0,
        totalDays: planType === "time" ? 365 : 14
      };
      
      setActivePlans([...activePlans, newPlan]);
      setPlanName("");
      setIsOpen(false);
    }
  };

  const handleMarkAsRead = (id: number) => {
    setActivePlans(activePlans.map(plan => {
      if (plan.id === id) {
        const daysCompleted = plan.daysCompleted + 1;
        const progress = Math.round((daysCompleted / plan.totalDays) * 100);
        return {
          ...plan,
          daysCompleted,
          progress,
          current: plan.nextReading,
          nextReading: plan.type === "time" 
            ? `Próximo capítulo` 
            : `Próximo estudo`
        };
      }
      return plan;
    }));
  };

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-800 to-indigo-800 text-white">
        <CardTitle className="flex items-center gap-2">
          <ListChecks size={24} className="text-amber-400" />
          Plano de Leitura Bíblica
        </CardTitle>
        <CardDescription className="text-blue-100">
          Crie e acompanhe seus planos de leitura por tempo ou tema
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-blue-900">Seus Planos Ativos</h3>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="border-blue-700 text-blue-800 hover:bg-blue-50">
                Novo Plano
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Criar Novo Plano de Leitura</SheetTitle>
                <SheetDescription>
                  Defina um plano por tempo ou tema para sua leitura bíblica
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-6 space-y-4">
                <div>
                  <label htmlFor="plan-name" className="block text-sm font-medium mb-1">
                    Nome do Plano
                  </label>
                  <Input
                    id="plan-name"
                    placeholder="Ex: Novo Testamento em 90 dias"
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                  />
                </div>
                
                <div>
                  <span className="block text-sm font-medium mb-1">Tipo do Plano</span>
                  <div className="flex space-x-2">
                    <Button
                      variant={planType === "time" ? "default" : "outline"}
                      onClick={() => setPlanType("time")}
                      className="flex-1"
                    >
                      <Clock size={16} className="mr-1" />
                      Por Tempo
                    </Button>
                    <Button
                      variant={planType === "theme" ? "default" : "outline"}
                      onClick={() => setPlanType("theme")}
                      className="flex-1"
                    >
                      <Bookmark size={16} className="mr-1" />
                      Por Tema
                    </Button>
                  </div>
                </div>
                
                {planType === "time" && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Duração</label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm">30 dias</Button>
                      <Button variant="outline" size="sm">90 dias</Button>
                      <Button variant="outline" size="sm">1 ano</Button>
                    </div>
                  </div>
                )}
                
                {planType === "theme" && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Temas Sugeridos</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">Fé</Button>
                      <Button variant="outline" size="sm">Graça</Button>
                      <Button variant="outline" size="sm">Perdão</Button>
                      <Button variant="outline" size="sm">Amor</Button>
                    </div>
                  </div>
                )}
                
                <Button 
                  className="w-full mt-4" 
                  onClick={handleAddPlan}
                  disabled={!planName.trim()}
                >
                  Criar Plano de Leitura
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {activePlans.length > 0 ? (
          <div className="space-y-4">
            {activePlans.map((plan) => (
              <Collapsible
                key={plan.id}
                open={isOpen}
                onOpenChange={setIsOpen}
                className="border rounded-md overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 bg-blue-50">
                  <div>
                    <h4 className="font-medium text-blue-900">{plan.name}</h4>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      {plan.type === "time" ? (
                        <Clock size={14} />
                      ) : (
                        <Bookmark size={14} />
                      )}
                      <span>
                        {plan.daysCompleted} de {plan.totalDays} dias concluídos
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-green-500 rounded-full" 
                        style={{ width: `${plan.progress}%` }} 
                      />
                    </div>
                    <span className="text-sm text-gray-600">{plan.progress}%</span>
                    
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                        <ChevronDown size={16} />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                
                <CollapsibleContent>
                  <div className="p-4 bg-white space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Leitura atual:</p>
                      <p className="text-blue-800">{plan.current}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700">Próxima leitura:</p>
                      <p className="text-blue-800">{plan.nextReading}</p>
                    </div>
                    
                    <div className="flex justify-between pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-blue-700"
                      >
                        <Calendar size={16} className="mr-1" />
                        Ver Calendário
                      </Button>
                      
                      <Button 
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleMarkAsRead(plan.id)}
                      >
                        <Check size={16} className="mr-1" />
                        Marcar Como Lido
                      </Button>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Calendar size={48} className="mx-auto text-blue-300 mb-2" />
            <p>Você ainda não tem planos de leitura ativos</p>
            <p className="text-sm">Crie um novo plano para começar sua jornada</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="bg-blue-50 flex justify-between items-center border-t">
        <div className="text-sm text-gray-600">
          Lembre-se: consistência é a chave
        </div>
        <Button variant="ghost" size="sm" className="text-blue-700">
          Configurar Lembretes
        </Button>
      </CardFooter>
    </Card>
  );
}
