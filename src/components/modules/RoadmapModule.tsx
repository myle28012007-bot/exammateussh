import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Lock, 
  ArrowRight, 
  FileText, 
  Download, 
  Eye, 
  BookOpen, 
  Sparkles, 
  Check, 
  Clock, 
  Play, 
  ChevronRight,
  Share2,
  FileSpreadsheet
} from 'lucide-react';
import { RoadmapStep, DocumentItem, ActiveModule } from '../../types';

interface RoadmapModuleProps {
  steps: RoadmapStep[];
  documents: DocumentItem[];
  selectedStepId: number;
  onSelectStep: (stepId: number) => void;
  onNavigate: (module: ActiveModule) => void;
}

export function RoadmapModule({
  steps,
  documents,
  selectedStepId,
  onSelectStep,
  onNavigate,
}: RoadmapModuleProps) {
  const [selectedDocForPreview, setSelectedDocForPreview] = useState<DocumentItem | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2]);

  const activeStep = steps.find((s) => s.id === selectedStepId) || steps[2];
  const stepDocs = documents.filter((d) => d.stepId === activeStep.id);

  const toggleStepCompleted = (id: number) => {
    if (completedSteps.includes(id)) {
      setCompletedSteps(completedSteps.filter((s) => s !== id));
    } else {
      setCompletedSteps([...completedSteps, id]);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Subject Header & Overview */}
      <div className="rounded-2xl bg-white border border-[#E2D9CC] p-6 shadow-card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-crimson-100 text-crimson-800 uppercase tracking-wider">
                Môn học Bắt buộc • 3 Tín chỉ
              </span>
              <span className="text-xs text-neutral-400 font-mono">Mã HP: PHI1006</span>
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 font-display">
              Lộ trình Ôn tập Cá nhân hóa: Triết học Mác - Lênin
            </h1>
            <p className="text-xs md:text-sm text-neutral-600">
              Được AI hiệu chỉnh tối ưu dựa trên đề thi 5 năm gần nhất tại Trường ĐH KHXH&amp;NV (ĐHQG).
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-[#FAF7F2] border border-[#E2D9CC] rounded-xl px-4 py-2 text-right">
              <span className="text-[11px] text-neutral-500 font-medium block">
                Mục tiêu cá nhân
              </span>
              <span className="text-sm font-bold text-crimson-800">
                Điểm A (9.0+)
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('oral-exam')}
              className="px-4 py-2.5 bg-crimson-800 text-white rounded-xl text-xs font-semibold hover:bg-crimson-900 transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Vào thi vấn đáp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Milestone Progress Bar */}
        <div className="mt-5 pt-4 border-t border-neutral-100">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-neutral-700">
              Tiến độ hoàn thành lộ trình (2 / 5 bước)
            </span>
            <span className="font-mono font-bold text-crimson-800">50%</span>
          </div>
          <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-crimson-800 rounded-full transition-all duration-500"
              style={{ width: `${(completedSteps.length / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Roadmap Split: Timeline (Left) + Contextual Documents (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Vertical Milestone Timeline (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-white border border-[#E2D9CC] p-6 shadow-card">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100">
            <h2 className="font-bold text-base text-neutral-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-crimson-800" />
              <span>5 Bước Chinh phục Kỳ thi</span>
            </h2>
            <span className="text-xs text-neutral-500">
              Nhấp vào bước để xem tài liệu đính kèm
            </span>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E2D9CC]">
            {steps.map((step) => {
              const isSelected = selectedStepId === step.id;
              const isCompleted = completedSteps.includes(step.id);
              const isLocked = step.status === 'locked' && !isCompleted;
              const isActive = step.id === 3;

              return (
                <div
                  key={step.id}
                  onClick={() => !isLocked && onSelectStep(step.id)}
                  className={`relative p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-crimson-800 bg-crimson-50/40 shadow-sm ring-1 ring-crimson-800'
                      : isLocked
                      ? 'border-neutral-200 bg-neutral-50/70 opacity-70 cursor-not-allowed'
                      : 'border-[#E8E1D5] bg-white hover:border-neutral-400'
                  }`}
                >
                  {/* Timeline Node Badge */}
                  <div
                    className={`absolute -left-[37px] top-5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isActive
                        ? 'bg-crimson-800 text-white ring-4 ring-crimson-100'
                        : isLocked
                        ? 'bg-neutral-300 text-neutral-600'
                        : 'bg-white border-2 border-neutral-400 text-neutral-700'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : isLocked ? (
                      <Lock className="w-3 h-3" />
                    ) : (
                      step.id
                    )}
                  </div>

                  {/* Header info */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                          Bước {step.id}
                        </span>
                        {isCompleted && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            Đã hoàn thành {step.score ? `• ${step.score}` : ''}
                          </span>
                        )}
                        {isActive && !isCompleted && (
                          <span className="text-[10px] font-bold text-crimson-800 bg-crimson-100 px-2 py-0.5 rounded-full">
                            Đang ôn tập trọng tâm
                          </span>
                        )}
                        {isLocked && (
                          <span className="text-[10px] font-bold text-neutral-500 bg-neutral-200 px-2 py-0.5 rounded-full">
                            Đang khóa 🔒
                          </span>
                        )}
                      </div>

                      <h3
                        className={`text-base font-bold leading-snug ${
                          isSelected ? 'text-crimson-900' : 'text-neutral-900'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-0.5">{step.subtitle}</p>
                    </div>

                    <span className="text-[11px] text-neutral-400 font-mono shrink-0">
                      {step.duration}
                    </span>
                  </div>

                  {/* Description & Key points */}
                  <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-neutral-100/80">
                    <div className="text-[11px] font-semibold text-neutral-700 mb-1.5">
                      Nội dung cốt lõi:
                    </div>
                    <ul className="space-y-1">
                      {step.keyPoints.map((pt, i) => (
                        <li key={i} className="text-xs text-neutral-600 flex items-start gap-1.5">
                          <span className="text-crimson-800 font-bold shrink-0">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Active Step Actions */}
                  {isActive && (
                    <div className="mt-4 pt-3 border-t border-crimson-200 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStepCompleted(step.id);
                        }}
                        className="text-xs font-semibold text-neutral-600 hover:text-crimson-800 cursor-pointer flex items-center gap-1.5"
                      >
                        <CheckCircle2
                          className={`w-4 h-4 ${
                            isCompleted ? 'text-emerald-600' : 'text-neutral-400'
                          }`}
                        />
                        <span>{isCompleted ? 'Đánh dấu chưa xong' : 'Đánh dấu hoàn thành'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Bắt đầu làm bài tập phân tích tình huống thực tế!');
                        }}
                        className="px-4 py-2 bg-crimson-800 text-white rounded-xl text-xs font-semibold hover:bg-crimson-900 shadow-xs cursor-pointer flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Bắt đầu bài học</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Contextual Document Panel (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-[#E2D9CC] p-6 shadow-card sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-crimson-800">
                Tài liệu theo ngữ cảnh
              </div>
              <h3 className="font-bold text-base text-neutral-900">
                Bước {activeStep.id}: {activeStep.title}
              </h3>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-neutral-100 rounded text-neutral-600">
              {stepDocs.length} tệp
            </span>
          </div>

          <p className="text-xs text-neutral-500 mb-4">
            Các tài liệu chính thống được giảng viên Khoa Lý luận Chính trị phê duyệt cho bước ôn tập này:
          </p>

          <div className="space-y-3">
            {stepDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-3.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] hover:bg-white hover:border-crimson-400 transition-all group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-crimson-50 border border-crimson-200 flex items-center justify-center text-crimson-800 shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 leading-snug group-hover:text-crimson-900">
                        {doc.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-1 font-mono">
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>Ngày tải: {doc.dateAdded}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-600 mt-2 line-clamp-2">
                  {doc.previewSummary}
                </p>

                <div className="mt-2.5 pt-2 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedDocForPreview(doc)}
                    className="text-crimson-800 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Xem tóm tắt AI</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => alert(`Tải xuống ${doc.name} thành công!`)}
                    className="text-neutral-500 hover:text-neutral-900 flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải về</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick study tip box */}
          <div className="mt-5 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Gợi ý học tập của Trợ giảng USSH</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-800">
              Khi làm bài tập ở Bước 3, đừng quên dẫn chứng thực tế từ các chiến dịch truyền thông cộng đồng gần đây để đạt điểm tối đa ở phần liên hệ thực tiễn!
            </p>
          </div>
        </div>
      </div>

      {/* Document AI Preview Modal */}
      {selectedDocForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E2D9CC] relative animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <div className="flex items-center gap-2 text-crimson-800">
                <FileText className="w-5 h-5" />
                <span className="font-bold text-sm truncate max-w-xs text-neutral-900">
                  {selectedDocForPreview.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDocForPreview(null)}
                className="text-neutral-400 hover:text-neutral-700 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="font-bold text-neutral-800 block mb-1">Tóm tắt nội dung chính:</span>
                <p className="text-neutral-600 leading-relaxed">
                  {selectedDocForPreview.previewSummary}
                </p>
              </div>

              <div className="p-3 bg-crimson-50 rounded-xl border border-crimson-100">
                <span className="font-bold text-crimson-900 block mb-1">Các câu hỏi trắc nghiệm hay trích xuất từ file này:</span>
                <ul className="list-disc pl-4 space-y-1 text-neutral-700">
                  <li>Xác định phạm trù trung tâm của quy luật phủ định của phủ định?</li>
                  <li>Mối quan hệ biện chứng giữa truyền thông truyền thống và truyền thông số?</li>
                </ul>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedDocForPreview(null)}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Đang mở toàn văn: ${selectedDocForPreview.name}`);
                  setSelectedDocForPreview(null);
                }}
                className="px-4 py-2 bg-crimson-800 text-white rounded-xl text-xs font-semibold hover:bg-crimson-900 cursor-pointer"
              >
                Mở tài liệu đầy đủ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
