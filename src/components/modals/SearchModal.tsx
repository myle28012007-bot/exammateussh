import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Map, Mic2, FileText, ArrowRight, X } from 'lucide-react';
import { ActiveModule } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (module: ActiveModule) => void;
}

export function SearchModal({ isOpen, onClose, onNavigate }: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchableItems = [
    {
      id: 'item-1',
      title: 'Lộ trình Bước 3: Phân tích tình huống thực tế',
      category: 'Lộ trình ôn tập',
      module: 'roadmap' as ActiveModule,
      icon: Map,
    },
    {
      id: 'item-2',
      title: 'Câu hỏi vấn đáp #04: Quy luật phủ định của phủ định',
      category: 'Phòng thi vấn đáp',
      module: 'oral-exam' as ActiveModule,
      icon: Mic2,
    },
    {
      id: 'item-3',
      title: 'Slide_Bai3_QuyLuatBienChung_VNU_USSH.pdf',
      category: 'Kho tài liệu',
      module: 'roadmap' as ActiveModule,
      icon: BookOpen,
    },
    {
      id: 'item-4',
      title: 'Đề cương mẫu: Tác động của mạng xã hội đối với nhận thức chính trị',
      category: 'Trợ lý tiểu luận',
      module: 'essay-assistant' as ActiveModule,
      icon: FileText,
    },
    {
      id: 'item-5',
      title: 'Bảng so sánh: Mô hình Lasswell vs Mô hình Shannon-Weaver',
      category: 'Cộng đồng Q&A',
      module: 'community' as ActiveModule,
      icon: BookOpen,
    },
    {
      id: 'item-6',
      title: 'Bộ tiêu chuẩn căn lề chuẩn văn bản ĐHQG (Pre-submission)',
      category: 'Trợ lý tiểu luận',
      module: 'essay-assistant' as ActiveModule,
      icon: FileText,
    },
  ];

  const results = searchableItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-[#E2D9CC] overflow-hidden">
        {/* Search Input bar */}
        <div className="p-4 border-b border-neutral-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-crimson-800 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm nhanh bài giảng, câu hỏi vấn đáp, tài liệu, đề thi..."
            autoFocus
            className="w-full text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none bg-transparent"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results list */}
        <div className="p-3 max-h-80 overflow-y-auto space-y-1">
          {results.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-400">
              Không tìm thấy kết quả phù hợp với từ khóa &ldquo;{query}&rdquo;
            </div>
          ) : (
            results.map((res) => {
              const Icon = res.icon;
              return (
                <div
                  key={res.id}
                  onClick={() => {
                    onNavigate(res.module);
                    onClose();
                  }}
                  className="p-3 rounded-xl hover:bg-[#FAF6F0] flex items-center justify-between gap-3 cursor-pointer group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-crimson-50 text-crimson-800 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 group-hover:text-crimson-800 transition-colors">
                        {res.title}
                      </h4>
                      <span className="text-[10px] text-neutral-400 font-medium">
                        {res.category}
                      </span>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-crimson-800 transition-colors shrink-0" />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#FAF8F5] border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
          <span>Nhấn <strong>Esc</strong> để đóng</span>
          <span>ExamMate USSH Search v2.4</span>
        </div>
      </div>
    </div>
  );
}
