'use client';

import { useState } from 'react';

interface ShareButtonProps {
  url: string;
  text: string;
  buttonLabel?: string;
}

export default function ShareButton({ url, text, buttonLabel = '🔗 공유하기' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: text, url });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-block w-full max-w-md py-4 rounded-2xl bg-white/70 hover:bg-white border border-orange-200 hover:border-orange-300 text-gray-600 font-medium transition-all duration-200 mt-3"
    >
      {copied ? '✅ 링크 복사됨!' : buttonLabel}
    </button>
  );
}
