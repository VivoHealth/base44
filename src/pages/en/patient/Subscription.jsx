import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, Shield, Lock } from "lucide-react";

export default function SubscriptionEn() {
  const [step, setStep] = useState("current");
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "" });
  const [agreed, setAgreed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
    }, 2000);
  };

  if (done) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-8 rounded-3xl border-emerald-100 bg-emerald-50/30 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Payment successful!</h2>
          <p className="text-slate-500 mt-2">Your subscription is activated. The doctor has been added to your profile.</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6 text-left">
            <div className="p-4 rounded-xl bg-white border border-slate-100">
              <p className="text-xs text-slate-500">Doctor</p>
              <p className="font-medium text-slate-800">Dr. Aistė Kazlauskienė</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-100">
              <p className="text-xs text-slate-500">Plan</p>
              <p className="font-medium text-slate-800">Doctor's Care – €39/mo</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-100">
              <p className="text-xs text-slate-500">Next review</p>
              <p className="font-medium text-slate-800">2026-08-19</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-100">
              <p className="text-xs text-slate-500">AI summary</p>
              <p className="font-medium text-slate-800">Ready ✓</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Subscription</h1>
        <p className="text-slate-500 mt-1">Your current plan and billing</p>
      </div>

      {/* Current plan */}
      <Card className="p-6 rounded-2xl border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">Active</Badge>
            <h3 className="font-bold text-slate-800 mt-2">Doctor's Care</h3>
            <p className="text-sm text-slate-500">€39/mo • Next payment: 2026-08-21</p>
          </div>
          <p className="text-3xl font-bold text-slate-800">€39</p>
        </div>
        <div className="space-y-2">
          {["Everything in the AI Health plan", "Chosen supervising doctor", "Monthly doctor review", "Secure messaging", "Important change alerts"].map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
              <Check className="w-4 h-4 text-emerald-500" /> {f}
            </div>
          ))}
        </div>
      </Card>

      {/* Checkout demo */}
      <Card className="p-6 rounded-2xl border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4">Checkout summary (demo)</h3>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm"><span className="text-slate-500">Selected doctor</span><span className="font-medium text-slate-800">Dr. Aistė Kazlauskienė</span></div>
          <div className="flex justify-between text-sm"><span className="text-slate-500">Plan</span><span className="font-medium text-slate-800">Doctor's Care</span></div>
          <div className="flex justify-between text-sm"><span className="text-slate-500">Monthly price</span><span className="font-medium text-slate-800">€39.00</span></div>
          <div className="flex justify-between text-sm"><span className="text-slate-500">Platform fee</span><span className="font-medium text-slate-800">€0.00</span></div>
          <div className="flex justify-between text-base pt-2 border-t border-slate-100"><span className="font-semibold text-slate-700">Total per month</span><span className="font-bold text-slate-800">€39.00</span></div>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <label className="text-xs text-slate-500">Card number</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={card.number} onChange={(e) => setCard({...card, number: e.target.value})} placeholder="4242 4242 4242 4242"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-500">Expiry date</label>
              <input value={card.expiry} onChange={(e) => setCard({...card, expiry: e.target.value})} placeholder="MM/YY"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" />
            </div>
            <div>
              <label className="text-xs text-slate-500">CVC</label>
              <input value={card.cvc} onChange={(e) => setCard({...card, cvc: e.target.value})} placeholder="123"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" />
            </div>
          </div>
        </div>

        <label className="flex items-start gap-2 mb-4 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1" />
          <span className="text-xs text-slate-500">I agree to the auto-renewal terms and service terms. I understand this is not an emergency service.</span>
        </label>

        <Button onClick={handlePay} disabled={!agreed || processing} className="w-full bg-sky-600 hover:bg-sky-700">
          {processing ? "Processing..." : <><Lock className="w-4 h-4 mr-2" /> Pay €39.00/mo</>}
        </Button>
        <p className="text-xs text-slate-400 text-center mt-3 flex items-center justify-center gap-1">
          <Shield className="w-3 h-3" /> Secure Stripe-type payment (simulated)
        </p>
      </Card>
    </div>
  );
}