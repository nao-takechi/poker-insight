"use client";

import Button from "@/components/Button";
import { Coins, Trophy } from "lucide-react";
import { useNewSessionForm } from "../hooks/useNewSessionForm";

import { FormField } from "./FormField";
import { SessionTypeButton } from "./SessionTypeButton";

type NewSessionFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

export function NewSessionForm({ onSuccess, onCancel }: NewSessionFormProps) {
  const {
    type,
    setType,
    buyIn,
    setBuyIn,
    result,
    setResult,
    otherCost,
    setOtherCost,
    note,
    setNote,
    submit,
  } = useNewSessionForm();

  const handleSubmit = async () => {
    const res = await submit();
    if (!res.ok) {
      alert("入力に誤りがあります");
      return;
    }
    onSuccess();
  };

  return (
    <div className="flex flex-col gap-6 text-secondary">
      {/* セッションタイプ */}
      <div className="flex flex-col gap-2">
        <p className="font-medium">セッションタイプ</p>

        <div className="grid grid-cols-2 gap-4">
          <SessionTypeButton
            label="トーナメント"
            icon={Trophy}
            active={type === "tournament"}
            onClick={() => setType("tournament")}
          />
          <SessionTypeButton
            label="リングゲーム"
            icon={Coins}
            active={type === "ring"}
            onClick={() => setType("ring")}
          />
        </div>
      </div>

      {/* 金額系 */}
      <FormField
        label="バイイン（円）"
        type="number"
        value={buyIn}
        onChange={(v) => setBuyIn(v)}
      />

      <FormField
        label="結果（円）"
        type="number"
        value={result}
        onChange={(v) => setResult(v)}
      />

      <FormField
        label="その他費用（円・任意）"
        type="number"
        value={otherCost}
        onChange={(v) => setOtherCost(v)}
      />

      {/* メモ */}
      <FormField
        label="メモ（任意）"
        type="textarea"
        value={note}
        onChange={(v) => setNote(v)}
        rows={4}
      />

      <div className="flex flex-col gap-4">
        <Button
          onClick={handleSubmit}
          variant="primary"
          className="py-4 rounded-xl"
        >
          セッションを保存
        </Button>

        <Button
          onClick={onCancel}
          variant="secondary"
          className="py-4 rounded-xl"
        >
          キャンセル
        </Button>
      </div>
    </div>
  );
}
