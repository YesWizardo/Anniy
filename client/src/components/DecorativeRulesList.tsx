import React from "react";

export const DecorativeRulesList: React.FC<{ passwordValue: string }> = ({ passwordValue }) => {
  const rules = [
    { label: "Must contain at least 8 characters", valid: passwordValue.length >= 8 },
    { label: "Must contain a sad emoji (e.g. 😭, 😢, 🥀)", valid: /[\u{1F622}\u{1F62D}\u{1F97A}\u{1F940}]/u.test(passwordValue) },
    { label: "Must contain a rhyme or poetic cadence", valid: passwordValue.length > 10 },
    { label: "Must not be your real bank password", valid: true },
    { label: "Must contain the initial of someone you let down", valid: /[A-Z]/.test(passwordValue) }
  ];

  return (
    <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 my-2 text-[11px] font-mono space-y-1">
      <div className="font-bold text-yellow-900 mb-1 flex items-center gap-1">
        <span>📜 SECURITY MANDATES (Strictly Enforced):</span>
      </div>
      {rules.map((rule, idx) => (
        <div key={idx} className="flex items-center gap-1.5 text-gray-700">
          <span>{rule.valid ? "✅" : "❌"}</span>
          <span className={rule.valid ? "line-through opacity-70" : ""}>
            {rule.label}
          </span>
        </div>
      ))}
    </div>
  );
};
