import type { ReactNode } from "react";

interface EmptyStateProps {
  emoji?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ emoji = "🐾", title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <span className="mb-4 text-5xl">{emoji}</span>
      <h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
      {description && <p className="mb-6 text-sm text-gray-500">{description}</p>}
      {action}
    </div>
  );
}
