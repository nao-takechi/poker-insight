"use client";

type Props = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: "text" | "number" | "textarea";
  rows?: number;
};

export function FormField({
  label,
  value,
  onChange,
  type = "text",
  rows = 3,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">{label}</label>

      {type === "textarea" ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border-[0.5px] border-gray-300 px-3 py-2 bg-white"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border-[0.5px] border-gray-300 px-3 py-2 bg-white"
        />
      )}
    </div>
  );
}
