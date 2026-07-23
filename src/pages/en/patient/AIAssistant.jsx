import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Send, ShieldAlert, Sparkles } from "lucide-react";

const suggestedQuestions = [
  "Explain my latest blood test",
  "Show my blood pressure trend",
  "What changed this month?",
  "Prepare a summary for my doctor",
  "Which measurements are missing?",
  "Show my current medications",
];

const aiResponses = {
  "Explain my latest blood test": {
    explanation: "Your latest blood test results show that total cholesterol (5.8 mmol/L) is slightly above the normal range (up to 5.0). LDL cholesterol is also elevated. Vitamin D level (28 ng/mL) is slightly below the recommended range. All other markers are within normal limits.",
    data: "Data from lab results (2026-07-15): 12 markers, 2 above range, 1 below range.",
    trend: "Compared to the previous test, cholesterol slightly increased, and vitamin D decreased.",
    next: "Discuss with your doctor whether to adjust the Atorvastatin dose or start a vitamin D supplement.",
  },
  "Show my blood pressure trend": {
    explanation: "Over the past 30 days, the average blood pressure was 132/84 mmHg. Evening measurements (135/87) are slightly higher than morning ones (129/82). Highest reading: 142/91 (July 20).",
    data: "60 measurements from OMRON device and manual entries over 30 days.",
    trend: "A slight upward trend in systolic blood pressure is observed (+3 mmHg over the past week).",
    next: "Continue twice-daily measurements. If high readings persist, notify your doctor.",
  },
  "What changed this month?": {
    explanation: "This month, blood pressure maintained an average level with a slight upward trend. The cholesterol test showed elevated values. Medication adherence was regular, except for 3 missed Atorvastatin doses.",
    data: "30 days of measurements, 1 lab test, 2 medications, 1 doctor review.",
    trend: "Blood pressure +3 mmHg, cholesterol above range, medication adherence ~90%.",
    next: "Repeat lipid panel in a month. Discuss cholesterol treatment effectiveness with your doctor.",
  },
  "Prepare a summary for my doctor": {
    explanation: "Summary prepared and sent to Dr. Aistė Kazlauskienė. Includes: blood pressure trend, lab changes, medication adherence, and missing data.",
    data: "Weekly summary based on 14 days of measurements and latest lab results.",
    trend: "Blood pressure slightly increased, cholesterol above range, medication adherence good.",
    next: "Your doctor will receive the summary at the next review. You can add additional information via messages.",
  },
  "Which measurements are missing?": {
    explanation: "Missing: weight measurements over the past week, physical activity data (not synced from Garmin), and no new glucose measurements in the past month.",
    data: "Compared to recommended measurement frequency: weight – weekly, activity – daily, glucose – monthly.",
    trend: "The amount of missing data has slightly increased over the past 2 weeks.",
    next: "Enter your current weight and connect a physical activity tracking device.",
  },
  "Show my current medications": {
    explanation: "You are currently taking 2 medications: Lisinopril 10 mg (morning, for blood pressure) and Atorvastatin 20 mg (evening, for cholesterol). Both were prescribed by Dr. Aistė Kazlauskienė.",
    data: "2 active medications, started 2026-03-01.",
    trend: "Lisinopril taken regularly. Atorvastatin missed 3 times this month.",
    next: "Don't forget your evening Atorvastatin dose. Discuss cholesterol effectiveness with your doctor.",
  },
};

export default function AIAssistantEn() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Hello, I'm your MyHealthPilot AI assistant. I can help manage and explain your health information, track changes, and prepare summaries for your doctor. I cannot diagnose conditions or replace a medical professional.",
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
        explanation: "I can help with your health data – blood pressure measurements, lab results, medications, and summaries. Ask a specific question, e.g., \"Show my blood pressure trend\".",
        data: "Available data: 30 days of blood pressure, 12 lab markers, 2 medications.",
        trend: "Data is continuously updated.",
        next: "Choose one of the suggested questions below.",
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
            <p className="text-xs font-semibold text-sky-700 mb-1">📊 Data used</p>
            <p className="text-xs text-slate-600">{r.data}</p>
          </div>
          <div className="p-3 bg-emerald-50/50 rounded-xl">
            <p className="text-xs font-semibold text-emerald-700 mb-1">📈 Trend detected</p>
            <p className="text-xs text-slate-600">{r.trend}</p>
          </div>
          <div className="p-3 bg-amber-50/50 rounded-xl">
            <p className="text-xs font-semibold text-amber-700 mb-1">💡 Suggested next step</p>
            <p className="text-xs text-slate-600">{r.next}</p>
          </div>
        </div>
        <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
          <ShieldAlert className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500">AI-generated information is educational in nature and should not be considered a diagnosis. All medical decisions remain the responsibility of a licensed healthcare professional.</p>
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
          <h1 className="text-xl font-bold text-slate-800">AI Health Assistant</h1>
          <p className="text-sm text-slate-500">Your personal health helper</p>
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
            placeholder="Ask a question about your health..."
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