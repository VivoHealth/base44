import React, { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export default function AddMeasurementDialog({ tests, open, onOpenChange, onAdd }) {
  const today = new Date().toISOString().slice(0, 10);
  const [testId, setTestId] = useState("");
  const [date, setDate] = useState(today);
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setTestId("");
    setDate(today);
    setValue("");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!testId) {
      setError("Pasirinkite tyrimą.");
      return;
    }
    const num = parseFloat(value.replace(",", "."));
    if (isNaN(num)) {
      setError("Įveskite skaitinę reikšmę.");
      return;
    }
    if (!date) {
      setError("Pasirinkite datą.");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      onAdd(testId, date, num);
      setSaving(false);
      reset();
      onOpenChange(false);
    }, 500);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) reset();
        onOpenChange(o);
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-slate-800">Pridėti matavimą</DialogTitle>
          <DialogDescription>Įveskite naują laboratorinio tyrimo rezultatą su data.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label>Tyrimas</Label>
            <Select value={testId} onValueChange={setTestId}>
              <SelectTrigger className="h-10"><SelectValue placeholder="Pasirinkite tyrimą" /></SelectTrigger>
              <SelectContent>
                {tests.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name} ({t.refLabel} {t.unit})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lab-date">Data</Label>
            <Input id="lab-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-10" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lab-value">Reikšmė</Label>
            <Input
              id="lab-value"
              type="text"
              inputMode="decimal"
              placeholder="pvz. 5.4"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="h-10"
            />
            {testId && (() => {
              const t = tests.find((tt) => tt.id === testId);
              const ref = t?.refLabel;
              return ref ? (
                <p className="text-xs text-slate-400">
                  Norma: {ref}{t.unit ? ` ${t.unit}` : ""}
                </p>
              ) : (
                <p className="text-xs text-slate-400">Informacinis rodiklis (normos nėra)</p>
              );
            })()}
          </div>

          {error && <p className="text-sm text-rose-600">{error}</p>}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
              Atšaukti
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Išsaugoma...</> : "Išsaugoti"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}