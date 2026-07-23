import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Send, Paperclip, Clock } from "lucide-react";
import { messages } from "@/lib/demoDataEn";

export default function MessagesEn() {
  const [msgs, setMsgs] = useState(messages);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMsgs([...msgs, { id: `msg${Date.now()}`, from: "patient", text: input, time: new Date().toLocaleString("en-US") }]);
    setInput("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Messages</h1>
        <p className="text-slate-500 mt-1">Secure messaging with Dr. Aistė Kazlauskienė</p>
      </div>

      <Card className="p-3 rounded-2xl bg-amber-50/30 border-amber-100">
        <div className="flex items-center gap-2 px-2">
          <Clock className="w-4 h-4 text-amber-600" />
          <p className="text-sm text-slate-600">Expected response time: within 24 hours. The messaging system is not an emergency channel.</p>
        </div>
      </Card>

      <Card className="rounded-2xl border-slate-100 overflow-hidden flex flex-col h-[60vh]">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {msgs.map(m => (
            <div key={m.id} className={`flex ${m.from === "patient" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] p-3 rounded-2xl ${m.from === "patient" ? "bg-sky-600 text-white rounded-tr-sm" : "bg-slate-100 text-slate-800 rounded-tl-sm"}`}>
                <p className="text-sm">{m.text}</p>
                <p className={`text-xs mt-1 ${m.from === "patient" ? "text-sky-100" : "text-slate-400"}`}>{m.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-slate-100 flex gap-2">
          <Button variant="outline" size="icon"><Paperclip className="w-4 h-4" /></Button>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" />
          <Button onClick={send} className="bg-sky-600 hover:bg-sky-700" size="icon"><Send className="w-4 h-4" /></Button>
        </div>
      </Card>
    </div>
  );
}