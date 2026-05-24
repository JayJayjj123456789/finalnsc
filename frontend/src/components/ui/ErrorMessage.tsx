import React from "react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="max-w-lg mx-auto text-center py-16 px-6">
      <div className="glass-panel rounded-2xl p-8 space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center">
          <span className="material-symbols-outlined text-red-500 text-3xl">error</span>
        </div>
        <h3 className="text-lg font-semibold text-on-surface">เกิดข้อผิดพลาด</h3>
        <p className="text-on-surface-variant text-sm">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="glass-button-primary px-6 py-2 rounded-lg">
            ลองใหม่อีกครั้ง
          </button>
        )}
      </div>
    </div>
  );
}