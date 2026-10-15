import React, { useState } from 'react';
import { X, Send, Sparkles, Tag, BookOpen } from 'lucide-react';
import { CommunityQuestion } from '../../types';

interface NewQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newQuestion: CommunityQuestion) => void;
}

export function NewQuestionModal({ isOpen, onClose, onSubmit }: NewQuestionModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('Triết học Mác - Lênin');
  const [useAiDraft, setUseAiDraft] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newQ: CommunityQuestion = {
      id: `cq-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      subject,
      authorName: 'Ngân',
      authorDepartment: 'Ngành Quan hệ công chúng - K22',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
      timeAgo: 'Vừa xong',
      status: useAiDraft ? 'ai-answered' : 'pending',
      upvotes: 1,
      repliesCount: 0,
      isBookmarked: false,
    };

    onSubmit(newQ);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-[#E2D9CC] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-crimson-800">
            <BookOpen className="w-5 h-5" />
            <h3 className="font-bold text-base text-neutral-900">
              Đặt câu hỏi thảo luận mới
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Môn học liên quan
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs text-neutral-800 focus:outline-none focus:border-crimson-800 bg-white"
            >
              <option value="Triết học Mác - Lênin">Triết học Mác - Lênin</option>
              <option value="Cơ sở lý luận truyền thông">Cơ sở lý luận truyền thông</option>
              <option value="Tâm lý học đại cương">Tâm lý học đại cương</option>
              <option value="Xã hội học">Xã hội học</option>
              <option value="Lịch sử văn minh thế giới">Lịch sử văn minh thế giới</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Tiêu đề câu hỏi (Ngắn gọn, rõ trọng tâm)
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Cách lấy dẫn chứng thực tế cho câu hỏi về quy luật lượng - chất?"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-800 focus:outline-none focus:border-crimson-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Nội dung chi tiết &amp; Thắc mắc cụ thể
            </label>
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Mô tả cụ thể đề bài, phần bạn đã hiểu và điểm bạn đang băn khoăn để các bạn và AI hỗ trợ chuẩn xác nhất..."
              rows={4}
              className="w-full p-3.5 rounded-xl border border-neutral-200 text-xs text-neutral-800 focus:outline-none focus:border-crimson-800 resize-none leading-relaxed"
            />
          </div>

          {/* AI Assistance Toggle */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <div className="text-xs">
                <span className="font-bold text-neutral-900 block">
                  Kích hoạt AI gợi ý đáp án sơ bộ
                </span>
                <span className="text-neutral-500 text-[11px]">
                  Tự động tra cứu giáo trình và tạo bảng phân tích lý luận
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={useAiDraft}
              onChange={(e) => setUseAiDraft(e.target.checked)}
              className="w-4 h-4 accent-crimson-800 rounded cursor-pointer"
            />
          </div>

          {/* Footer buttons */}
          <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-crimson-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-crimson-900 transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Đăng câu hỏi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
