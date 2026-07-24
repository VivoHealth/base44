import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Send, ShieldAlert, Sparkles } from "lucide-react";

const suggestedQuestions = [
  "Paaiškink mano paskutinį kraujo tyrimą",
  "Rodyk mano kraujospūdžio tendenciją",
  "Kas pasikeitė šį mėnesį?",
  "Paruošk santrauką mano gydytojui",
  "Kurių matavimų trūksta?",
  "Rodyk mano dabartinius vaistus",
];

const aiResponses = {
  "Paaiškink mano paskutinį kraujo tyrimą": {
    explanation: "Jūsų paskutinio kraujo tyrimo rezultatai rodo, kad bendrasis cholesterolis (5.8 mmol/L) yra šiek tiek virš normos (iki 5.0). MTL (bendrasis) cholesterolis taip pat padidėjęs. Vitamino D lygis (28 ng/mL) yra šiek tiek žemiau rekomenduojamos normos. Visi kiti rodikliai – normos ribose.",
    data: "Duomenys iš laboratorinių rezultatų (2026-07-15): 12 rodikliai, 2 virš normos, 1 žemiau normos.",
    trend: "Palyginus su ankstesniu tyrimu, cholesterolis šiek tiek padidėjo, o vitaminas D sumažėjo.",
    next: "Aptarkite su savo gydytoja, ar reikia koreguoti Atorvastatino dozę ar pradėti vartoti vitamino D papildą.",
  },
  "Rodyk mano kraujospūdžio tendenciją": {
    explanation: "Per pastarąsias 30 dienų vidutinis kraujospūdis buvo 132/84 mmHg. Vakariniai matavimai (135/87) yra šiek tiek aukštesni už rytinius (129/82). Aukščiausias matavimas: 142/91 (liepos 20 d.).",
    data: "60 matavimų iš OMRON įrenginio ir rankinių įrašų per 30 dienų.",
    trend: "Pastebima lengva sistolinio kraujospūdžio kilimo tendencija (+3 mmHg per pastarąją savaitę).",
    next: "Tęskite dvigubą matavimą per dieną. Jei aukšti matavimai pasikartos, praneškite savo gydytojai.",
  },
  "Kas pasikeitė šį mėnesį?": {
    explanation: "Šį mėnesį kraujospūdis išlaikė vidutinį lygį su lengva kilimo tendencija. Cholesterolio tyrimas rodė padidėjusias reikšmes. Vaistų vartojimas buvo reguliarus, išskyrus 3 praleistas Atorvastatino dozes.",
    data: "30 dienų matavimai, 1 laboratorinis tyrimas, 2 vaistai, 1 gydytojo peržiūra.",
    trend: "Kraujospūdis +3 mmHg, cholesterolis virš normos, vaistų vartojimas ~90%.",
    next: "Po mėnesio pakartokite lipidogramą. Aptarkite cholesterolio gydymo efektyvumą su gydytoja.",
  },
  "Paruošk santrauką mano gydytojui": {
    explanation: "Santrauka paruošta ir nukreipta Dr. Aistei Kazlauskieni. Apima: kraujospūdžio tendenciją, laboratorinius pokyčius, vaistų vartojimą ir trūkstamus duomenis.",
    data: "Savaitės santrauka pagrįsta 14 dienų matavimais ir naujausiais laboratoriniais rezultatais.",
    trend: "Kraujospūdis šiek tiek pakilo, cholesterolis virš normos, vaistų vartojimas geras.",
    next: "Gydytoja gaus santrauką per artimiausią peržiūrą. Galite pridėti papildomą informaciją žinutėmis.",
  },
  "Kurių matavimų trūksta?": {
    explanation: "Trūksta: svorio matavimų per pastarąją savaitę, fizinio aktyvumo duomenų (nerašoma į Garmin), ir nėra naujų gliukozės matavimų per pastarąjį mėnesį.",
    data: "Palyginta su rekomenduojamu matavimo dažnumu: svoris – kas savaitę, aktyvumas – kasdien, gliukozė – kas mėnesį.",
    trend: "Trūkstamų duomenų kiekis šiek tiek padidėjo per pastarąsias 2 savaites.",
    next: "Įveskite dabartinį svorį ir prijunkite fizinio aktyvumo sekimo įrenginį.",
  },
  "Rodyk mano dabartinius vaistus": {
    explanation: "Šiuo metu vartojate 2 vaistus: Lisinoprilis 10 mg (ryte, kraujospūdžiui) ir Atorvastatinas 20 mg (vakare, cholesteroliui). Abu skyrė Dr. Aistė Kazlauskienė.",
    data: "2 aktyvūs vaistai, pradėti 2026-03-01.",
    trend: "Lisinoprilis vartojamas reguliariai. Atorvastatinas praleistas 3 kartus per mėnesį.",
    next: "Nepamirškite vakarinės Atorvastatino dozės. Aptarkite cholesterolio efektyvumą su gydytoja.",
  },
};

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Sveiki, aš esu jūsų vivo AI asistentas. Galiu padėti tvarkyti ir paaiškinti jūsų sveikatos informaciją, sekti pokyčius ir paruošti santraukas jūsų gydytojui. Negaliu diagnozuoti ligų ar pakeisti medicinos specialisto.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, typing]);

  const sendMessage = (text) => {
    const q = text || input;
    if (!q.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const response = aiResponses[q] || {
        explanation: "Aš galiu padėti su jūsų sveikatos duomenimis – kraujospūdžio matavimais, laboratoriniais rezultatais, vaistais ir santraukomis. Užduokite konkretų klausimą, pvz., „Rodyk mano kraujospūdžio tendenciją“.",
        data: "Prieinami duomenys: 30 dienų kraujospūdis, 12 laboratorinių rodiklių, 2 vaistai.",
        trend: "Duomenys nuolat atnaujinami.",
        next: "Pasirinkite vieną iš siūlomų klausimų žemiau.",
      };
      setMessages(prev => [...prev, { role: "ai", content: response }]);
      setTyping(false);
    }, 1200);
  };

  const renderAIResponse = (r) => {
    if (typeof r === "string") return <p className="text-sm text-slate-700">{r}</p>;
    return (
      <div className="space-y-3">
        <p className="text-sm text-slate-700">{r.explanation}</p>
        <div className="space-y-2">
          <div className="p-3 bg-sky-50/50 rounded-xl">
            <p className="text-xs font-semibold text-sky-700 mb-1">📊 Panaudoti duomenys</p>
            <p className="text-xs text-slate-600">{r.data}</p>
          </div>
          <div className="p-3 bg-emerald-50/50 rounded-xl">
            <p className="text-xs font-semibold text-emerald-700 mb-1">📈 Pastebėta tendencija</p>
            <p className="text-xs text-slate-600">{r.trend}</p>
          </div>
          <div className="p-3 bg-amber-50/50 rounded-xl">
            <p className="text-xs font-semibold text-amber-700 mb-1">💡 Siūlomas kitas žingsnis</p>
            <p className="text-xs text-slate-600">{r.next}</p>
          </div>
        </div>
        <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
          <ShieldAlert className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500">AI sugeneruota informacija yra mokomojo pobūdžio ir neturi būti laikoma diagnoze. Visi medicininiai sprendimai lieka licencijuoto sveikatos priežiūros specialisto kompetencijoje.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">AI Sveikatos Asistentas</h1>
          <p className="text-sm text-slate-500">Jūsų asmeninis sveikatos pagalbininkas</p>
        </div>
      </div>

      <Card className="flex-1 flex flex-col rounded-2xl border-slate-100 overflow-hidden">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "ai" && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center mr-3 flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] ${msg.role === "user" ? "order-2" : ""}`}>
                <div className={`p-4 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-sky-600 text-white rounded-tr-sm"
                    : "bg-slate-50 text-slate-800 rounded-tl-sm"
                }`}>
                  {msg.role === "ai" ? renderAIResponse(msg.content) : <p className="text-sm">{msg.content}</p>}
                </div>
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center mr-3">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested questions */}
        <div className="px-4 py-3 border-t border-slate-100 flex gap-2 overflow-x-auto">
          {suggestedQuestions.map((q, i) => (
            <button key={i} onClick={() => sendMessage(q)} className="flex-shrink-0 px-3 py-1.5 rounded-full bg-sky-50 text-sky-700 text-xs font-medium hover:bg-sky-100 transition-colors whitespace-nowrap">
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-100 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Užduokite klausimą apie savo sveikatą..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
          <Button onClick={() => sendMessage()} className="bg-sky-600 hover:bg-sky-700" size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}