'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface ReportButtonProps {
  pageType: 'result' | 'element' | 'post';
  elementSymbol?: string;
  elementName?: string;
  postSlug?: string;
  postTitle?: string;
}

export default function ReportButton({
  pageType,
  elementSymbol,
  elementName,
  postSlug,
  postTitle,
}: ReportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const contextLabel = postTitle
    ? `${elementSymbol} ${elementName} > ${postTitle}`
    : elementSymbol
      ? `${elementSymbol} ${elementName}`
      : '테스트 결과';

  const handleSubmit = async () => {
    if (!content.trim()) return;

    if (!supabase) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      const { error } = await supabase.from('feedback').insert({
        page_type: pageType,
        element_symbol: elementSymbol || null,
        post_slug: postSlug || null,
        content: content.trim(),
        page_url: window.location.href,
      });

      if (error) throw error;
      setStatus('success');
      setContent('');
      setTimeout(() => {
        setIsOpen(false);
        setStatus('idle');
      }, 2000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-orange-500 transition-colors mt-6 mx-auto"
      >
        <span className="text-base">&#9888;</span>
        잘못된 정보가 있나요?
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
              setStatus('idle');
            }
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-orange-100 p-6 animate-fadeIn">
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              &#9888;&#65039; 정보 오류 제보
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              {contextLabel}
            </p>

            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">&#10003;</div>
                <p className="text-gray-700 font-medium">제보해 주셔서 감사합니다!</p>
                <p className="text-gray-400 text-sm mt-1">확인 후 수정하겠습니다.</p>
              </div>
            ) : (
              <>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="어떤 정보가 잘못되었는지 알려주세요. 올바른 정보를 함께 적어주시면 더 빠르게 수정할 수 있어요."
                  className="w-full h-32 px-4 py-3 rounded-xl bg-orange-50/50 border border-orange-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-300 focus:bg-white resize-none text-sm leading-relaxed transition-all"
                  maxLength={1000}
                  disabled={status === 'loading'}
                />
                <div className="flex justify-between items-center mt-1 mb-4">
                  <span className="text-xs text-gray-300">{content.length}/1000</span>
                  {status === 'error' && (
                    <span className="text-xs text-red-400">전송에 실패했습니다. 다시 시도해주세요.</span>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setStatus('idle');
                      setContent('');
                    }}
                    className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!content.trim() || status === 'loading'}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-400 to-rose-400 text-white font-medium hover:from-orange-500 hover:to-rose-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? '전송 중...' : '제보하기'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
