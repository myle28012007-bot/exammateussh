import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  Sparkles, 
  Plus, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Bookmark, 
  Share2, 
  CheckCircle2, 
  Table,
  HelpCircle,
  Tag
} from 'lucide-react';
import { CommunityQuestion } from '../../types';

interface CommunityModuleProps {
  questions: CommunityQuestion[];
  onOpenNewQuestion: () => void;
}

export function CommunityModule({
  questions: initialQuestions,
  onOpenNewQuestion,
}: CommunityModuleProps) {
  const [questions, setQuestions] = useState<CommunityQuestion[]>(initialQuestions);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('Tất cả');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedAiAnswerId, setExpandedAiAnswerId] = useState<string | null>('cq-1');

  const subjectTags = [
    'Tất cả',
    'Cơ sở lý luận truyền thông',
    'Triết học Mác - Lênin',
    'Tâm lý học đại cương',
    'Xã hội học',
    'Lịch sử văn minh thế giới',
  ];

  const statusOptions = [
    { id: 'Tất cả', label: 'Tất cả trạng thái' },
    { id: 'pending', label: 'Chưa giải đáp' },
    { id: 'ai-answered', label: 'Đã có đáp án AI' },
    { id: 'resolved', label: 'Đã giải đáp bởi GV/Trợ giảng' },
  ];

  const handleUpvote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q))
    );
  };

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, isBookmarked: !q.isBookmarked } : q
      )
    );
  };

  const filteredQuestions = questions.filter((q) => {
    const matchesSubject =
      selectedSubjectFilter === 'Tất cả' || q.subject === selectedSubjectFilter;
    const matchesStatus =
      selectedStatusFilter === 'Tất cả' || q.status === selectedStatusFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="rounded-2xl bg-white border border-[#E2D9CC] p-6 shadow-card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 uppercase tracking-wider">
                Diễn đàn Học thuật Nhân văn
              </span>
              <span className="text-xs text-neutral-400 font-mono">Hơn 4,200 sinh viên tham gia</span>
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 font-display">
              Cộng Đồng Giải Đáp Thắc Mắc &amp; Thảo Luận Chuyên Sâu
            </h1>
            <p className="text-xs md:text-sm text-neutral-600">
              Trao đổi đề cương, phản biện câu hỏi hóc búa và tra cứu các bảng so sánh lý thuyết chuẩn hóa được tạo bởi AI.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenNewQuestion}
            className="px-5 py-2.5 rounded-full bg-crimson-800 text-white hover:bg-crimson-900 font-bold text-xs uppercase tracking-wider transition-all shadow-crimson-glow flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Đặt câu hỏi mới</span>
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-6 pt-4 border-t border-neutral-100 space-y-3">
          {/* Search & Status Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm từ khóa câu hỏi, mô hình, lý thuyết..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-neutral-200 text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-crimson-800"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-semibold text-neutral-500 shrink-0">
                Lọc trạng thái:
              </span>
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-neutral-200 text-xs font-medium bg-white text-neutral-800 focus:outline-none focus:border-crimson-800 cursor-pointer shadow-xs"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subject Filter Tags */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-semibold text-neutral-400 shrink-0 mr-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Môn:
            </span>
            {subjectTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedSubjectFilter(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  selectedSubjectFilter === tag
                    ? 'bg-crimson-800 text-white font-bold shadow-xs'
                    : 'bg-[#FAF8F5] text-neutral-600 hover:bg-neutral-200/70 border border-[#E8E1D5]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions Feed */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="rounded-2xl bg-white border border-[#E2D9CC] p-12 text-center text-neutral-400">
            <HelpCircle className="w-12 h-12 mx-auto mb-2 text-neutral-300" />
            <p className="text-sm font-semibold">Không tìm thấy câu hỏi phù hợp.</p>
            <p className="text-xs text-neutral-500 mt-1">
              Hãy thử chọn môn học khác hoặc đặt câu hỏi mới để các bạn cùng trao đổi!
            </p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = expandedAiAnswerId === q.id;

            return (
              <div
                key={q.id}
                className="rounded-2xl bg-white border border-[#E2D9CC] p-6 shadow-card transition-all hover:border-neutral-400"
              >
                {/* Author row & Status badge */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={q.authorAvatar}
                      alt={q.authorName}
                      className="w-9 h-9 rounded-full object-cover border border-neutral-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-neutral-900">
                          {q.authorName}
                        </span>
                        <span className="text-[10px] text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                          {q.authorDepartment}
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        Đăng {q.timeAgo}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FAF8F5] text-neutral-700 border border-[#E8E1D5]">
                      {q.subject}
                    </span>
                    {q.status === 'ai-answered' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>Có đáp án AI</span>
                      </span>
                    )}
                    {q.status === 'resolved' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Đã giải đáp</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Content */}
                <h3 className="text-base font-bold text-neutral-900 mb-2 leading-snug">
                  {q.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  {q.content}
                </p>

                {/* Collapsible AI Suggested Answer Drawer with Comparative Table */}
                {q.aiComparisonTable && (
                  <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50/40 overflow-hidden transition-all">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedAiAnswerId(isExpanded ? null : q.id)
                      }
                      className="w-full px-4 py-2.5 bg-amber-100/60 flex items-center justify-between text-xs font-bold text-amber-900 hover:bg-amber-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Table className="w-4 h-4 text-amber-800" />
                        <span>{q.aiComparisonTable.topic}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-800">
                        <span>{isExpanded ? 'Thu gọn bảng' : 'Xem bảng đối sánh'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-4 overflow-x-auto text-xs animate-fadeIn">
                        <table className="w-full border-collapse border border-amber-200 text-left bg-white rounded-lg overflow-hidden">
                          <thead>
                            <tr className="bg-amber-100/80 text-amber-950 font-bold">
                              {q.aiComparisonTable.columns.map((col, idx) => (
                                <th
                                  key={idx}
                                  className="p-2.5 border border-amber-200 text-xs font-bold"
                                >
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {q.aiComparisonTable.rows.map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                className={rIdx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]'}
                              >
                                <td className="p-2.5 border border-amber-200 font-bold text-neutral-900 bg-amber-50/50">
                                  {row.label}
                                </td>
                                {row.values.map((val, vIdx) => (
                                  <td
                                    key={vIdx}
                                    className="p-2.5 border border-amber-200 text-neutral-700 leading-relaxed"
                                  >
                                    {val}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer Actions: Upvote, Replies, Share */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs text-neutral-500">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={(e) => handleUpvote(q.id, e)}
                      className="flex items-center gap-1.5 hover:text-crimson-800 transition-colors font-semibold cursor-pointer"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{q.upvotes} Hữu ích</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{q.repliesCount} Thảo luận</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => handleToggleBookmark(q.id, e)}
                      className={`p-1 rounded hover:bg-neutral-100 transition-colors cursor-pointer ${
                        q.isBookmarked ? 'text-amber-600' : 'text-neutral-400'
                      }`}
                      title="Lưu câu hỏi"
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>

                    <button
                      type="button"
                      onClick={() => alert(`Đã sao chép liên kết câu hỏi: ${q.title}`)}
                      className="p-1 rounded text-neutral-400 hover:text-neutral-800 transition-colors cursor-pointer"
                      title="Chia sẻ"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
