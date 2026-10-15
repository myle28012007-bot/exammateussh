import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Clock, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  BrainCircuit, 
  CreditCard, 
  HelpCircle, 
  Mic2,
  Calendar,
  Award,
  ChevronRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { StudentProfile, RoadmapStep, ActiveModule } from '../../types';
import { MascotBadge } from '../ui/MascotBadge';

interface DashboardModuleProps {
  student: StudentProfile;
  currentRoadmapStep: RoadmapStep;
  onNavigate: (module: ActiveModule) => void;
  onSelectStep?: (stepId: number) => void;
}

export function DashboardModule({
  student,
  currentRoadmapStep,
  onNavigate,
  onSelectStep,
}: DashboardModuleProps) {
  // Real-time Countdown timer for Philosophy Exam (7 days from now)
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  const [activeQuickTool, setActiveQuickTool] = useState<
    'mindmap' | 'flashcard' | 'mcq' | null
  >(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const streakDays = [
    { day: 'T2', active: true, isToday: false },
    { day: 'T3', active: true, isToday: false },
    { day: 'T4', active: true, isToday: false },
    { day: 'T5', active: true, isToday: false },
    { day: 'T6', active: true, isToday: true },
    { day: 'T7', active: false, isToday: false },
    { day: 'CN', active: false, isToday: false },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 1. Hero Greeting Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-[#E2D9CC] p-6 shadow-card transition-all hover:shadow-card-hover">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-crimson-50 text-crimson-800 rounded-full font-bold uppercase tracking-wider">
              <span style={{ fontSize: '12px' }} className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-crimson-800" />
              </span>
              <span style={{ fontSize: '13px' }}>Kỳ thi Kết thúc Học phần II • ĐHQG</span>
            </div>
            <h1 
              style={{ fontFamily: 'Be Vietnam Pro' }}
              className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight font-['Be_Vietnam_Pro'] font-sans"
            >
              Xin chào, {student.name}! 👋 Cùng ExamMate chinh phục mục tiêu của bạn nhé!
            </h1>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Bạn đang làm rất tốt! Hôm nay hãy tập trung hoàn thành{' '}
              <strong className="text-crimson-800 font-semibold">
                Bước 3: {currentRoadmapStep.title}
              </strong>{' '}
              để duy trì chuỗi tiến độ 100% trước kỳ thi Triết học.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="flex flex-col text-right hidden sm:flex">
              <span style={{ fontSize: '14px' }} className="text-neutral-500 font-medium">Học kỳ II</span>
              <span style={{ fontSize: '16px' }} className="font-bold text-crimson-800 font-mono">2025 - 2026</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('roadmap')}
              className="px-4 py-2 rounded-xl bg-crimson-800 text-white font-bold hover:bg-crimson-900 transition-colors shadow-sm cursor-pointer flex items-center gap-2"
            >
              <span style={{ fontSize: '19px' }}>Học ngay</span>
            </button>
            <MascotBadge />
          </div>
        </div>
      </div>

      {/* 2. Dual Status Bar (Study Streak + Exam Countdown Clock) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Streak Tracker Card */}
        <div className="rounded-2xl bg-white border border-[#E2D9CC] p-5 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
                <Flame className="w-5 h-5 fill-orange-500 text-orange-500 animate-bounce" />
              </div>
              <div>
                <h2 className="flex items-center gap-2 m-0 p-0 font-normal">
                  <span style={{ fontSize: '18px' }} className="font-bold text-neutral-900">
                    Chuỗi {student.currentStreakDays} ngày học tập
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-orange-100 text-orange-800 rounded-full">
                    Đang bùng cháy 🔥
                  </span>
                </h2>
                <p className="text-xs text-neutral-500">
                  Học thêm 2 ngày nữa để nhận huy hiệu &ldquo;Học bá Nhân văn&rdquo;
                </p>
              </div>
            </div>
            <Award className="w-6 h-6 text-amber-500 shrink-0" />
          </div>

          {/* Streak Days Dots */}
          <div className="grid grid-cols-7 gap-2 pt-2 border-t border-neutral-100">
            {streakDays.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center py-2 rounded-xl text-center transition-all ${
                  item.isToday
                    ? 'bg-crimson-800 text-white font-bold shadow-xs'
                    : item.active
                    ? 'bg-amber-100 text-amber-900 font-semibold'
                    : 'bg-neutral-100 text-neutral-400'
                }`}
              >
                <span className="text-[11px] mb-1">{item.day}</span>
                <span className="text-xs">
                  {item.active ? '🔥' : '•'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Countdown Clock Card */}
        <div className="rounded-2xl bg-white border border-[#E2D9CC] p-5 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div style={{ fontSize: '13px' }} className="w-10 h-10 rounded-xl bg-crimson-50 border border-crimson-200 flex items-center justify-center text-crimson-800">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-neutral-900">
                    Kỳ thi Triết học Mác - Lênin
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-crimson-100 text-crimson-800 rounded-full">
                    Quan trọng
                  </span>
                </div>
                <p className="text-xs text-neutral-500">
                  Phòng thi: <span className="font-semibold text-neutral-700">D.201</span> • Ca: 08:00 Sáng • Tự luận &amp; Vấn đáp
                </p>
              </div>
            </div>
            <Calendar className="w-5 h-5 text-neutral-400 shrink-0" />
          </div>

          {/* Digital Flip Clock Counter */}
          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-neutral-100 font-mono">
            <div className="bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl p-2 text-center">
              <span className="block text-2xl font-bold text-crimson-900 tabular-nums">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-sans font-semibold text-neutral-500">
                Ngày
              </span>
            </div>
            <div className="bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl p-2 text-center">
              <span className="block text-2xl font-bold text-crimson-900 tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-sans font-semibold text-neutral-500">
                Giờ
              </span>
            </div>
            <div className="bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl p-2 text-center">
              <span className="block text-2xl font-bold text-crimson-900 tabular-nums">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-sans font-semibold text-neutral-500">
                Phút
              </span>
            </div>
            <div className="bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl p-2 text-center">
              <span className="block text-2xl font-bold text-crimson-900 tabular-nums text-crimson-800">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-sans font-semibold text-neutral-500">
                Giây
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Today's Focus Card (Trọng tâm hôm nay) */}
      <div className="rounded-2xl bg-gradient-to-r from-crimson-800 via-crimson-900 to-[#5E0000] text-white p-6 md:p-7 shadow-xl relative overflow-hidden">
        {/* Subtle decorative watermark rings */}
        <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute right-12 bottom-0 translate-y-1/2 w-64 h-64 rounded-full border border-white/10 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold text-amber-200">
              <Layers className="w-3.5 h-3.5" />
              <span>Trọng tâm hôm nay • Bước 3 / 5</span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-snug">
              Phân tích 3 quy luật biện chứng duy vật &amp; ví dụ liên hệ truyền thông đại chúng
            </h2>

            <p className="text-xs md:text-sm text-neutral-200 leading-relaxed">
              Vận dụng nguyên lý lượng - chất và quy luật phủ định của phủ định vào sự phát triển của báo chí đa nền tảng tại Việt Nam.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-300 pt-1">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-300" /> Thời lượng: 45 phút
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-amber-300" /> Đã mở 3 tài liệu &amp; slide
              </span>
            </div>
          </div>

          {/* Progress Ring & Primary CTA */}
          <div className="flex items-center gap-6 shrink-0 self-stretch lg:self-auto justify-between lg:justify-end bg-black/20 p-4 rounded-2xl border border-white/10">
            {/* Circular Progress Ring (68%) */}
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/20"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-400 transition-all duration-1000 ease-out"
                  strokeDasharray="68, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-base font-extrabold text-white font-mono leading-none">
                  68%
                </span>
                <span className="text-[9px] text-amber-200 uppercase font-semibold">
                  Tiến độ
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  onNavigate('roadmap');
                  if (onSelectStep) onSelectStep(3);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-crimson-900 hover:bg-neutral-100 font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-102 active:scale-98 cursor-pointer"
              >
                <span>Bắt đầu ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('roadmap')}
                className="text-[11px] text-neutral-300 hover:text-white transition-colors text-center underline underline-offset-4 cursor-pointer"
              >
                Xem toàn bộ lộ trình
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Analytics Grid & Quick Actions Toolbar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Semester Overall Progress (42%) */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-[#E2D9CC] p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-neutral-900">
                  Tiến độ ôn tập kỳ thi
                </h3>
                <p className="text-xs text-neutral-500">
                  Mục tiêu đạt điểm A (9.0+) toàn khóa
                </p>
              </div>
              <span className="px-2.5 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-bold font-mono">
                GPA: 3.82
              </span>
            </div>

            {/* Circular Chart & Mini breakdown */}
            <div className="flex items-center gap-6 my-2">
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-neutral-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-crimson-800"
                    strokeDasharray="42, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-extrabold text-neutral-900 font-mono">
                    42%
                  </span>
                  <span className="text-[10px] text-neutral-500 font-medium">
                    Tổng quan
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 flex-1 text-xs">
                <div>
                  <div className="flex justify-between text-neutral-600 mb-1">
                    <span>Lý thuyết trọng tâm</span>
                    <span className="font-mono font-bold text-neutral-900">85%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-neutral-600 mb-1">
                    <span>Luyện trắc nghiệm</span>
                    <span className="font-mono font-bold text-neutral-900">65%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-neutral-600 mb-1">
                    <span>Phỏng vấn vấn đáp</span>
                    <span className="font-mono font-bold text-neutral-900">30%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-crimson-800 rounded-full" style={{ width: '30%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" /> +14% so với tuần trước
            </span>
            <span>Đã hoàn thành 2/5 chặng</span>
          </div>
        </div>

        {/* Quick Actions Toolbar */}
        <div className="lg:col-span-7 rounded-2xl bg-white border border-[#E2D9CC] p-5 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-neutral-900">
                Công cụ hỗ trợ học tập nhanh
              </h3>
              <p className="text-xs text-neutral-500">
                Kích hoạt các mô hình AI tối ưu cho sinh viên USSH
              </p>
            </div>
            <span className="text-xs text-crimson-800 font-semibold">
              4 Tiện ích
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* 1. Tạo sơ đồ tư duy */}
            <button
              type="button"
              onClick={() => setActiveQuickTool('mindmap')}
              className="p-3.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] hover:bg-crimson-50 hover:border-crimson-300 text-left transition-all group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-white border border-[#E2D9CC] flex items-center justify-center text-crimson-800 group-hover:scale-110 transition-transform mb-2.5 shadow-xs">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <span className="block font-bold text-xs text-neutral-900 group-hover:text-crimson-900">
                Tạo sơ đồ tư duy
              </span>
              <span className="text-[11px] text-neutral-500 line-clamp-1">
                Visual hóa 3 quy luật &amp; 6 phạm trù
              </span>
            </button>

            {/* 2. Tạo Flashcard */}
            <button
              type="button"
              onClick={() => setActiveQuickTool('flashcard')}
              className="p-3.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] hover:bg-amber-50 hover:border-amber-300 text-left transition-all group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-white border border-[#E2D9CC] flex items-center justify-center text-amber-700 group-hover:scale-110 transition-transform mb-2.5 shadow-xs">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="block font-bold text-xs text-neutral-900 group-hover:text-amber-900">
                Tạo Flashcard
              </span>
              <span className="text-[11px] text-neutral-500 line-clamp-1">
                Ghi nhớ thuật ngữ triết luận
              </span>
            </button>

            {/* 3. Luyện trắc nghiệm */}
            <button
              type="button"
              onClick={() => setActiveQuickTool('mcq')}
              className="p-3.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] hover:bg-emerald-50 hover:border-emerald-300 text-left transition-all group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-white border border-[#E2D9CC] flex items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform mb-2.5 shadow-xs">
                <HelpCircle className="w-5 h-5" />
              </div>
              <span className="block font-bold text-xs text-neutral-900 group-hover:text-emerald-900">
                Luyện trắc nghiệm
              </span>
              <span className="text-[11px] text-neutral-500 line-clamp-1">
                40 câu ngân hàng đề USSH
              </span>
            </button>

            {/* 4. Thi vấn đáp */}
            <button
              type="button"
              onClick={() => onNavigate('oral-exam')}
              className="p-3.5 rounded-xl border-2 border-crimson-800 bg-crimson-50/50 hover:bg-crimson-100 text-left transition-all group cursor-pointer relative"
            >
              <div className="w-9 h-9 rounded-lg bg-crimson-800 text-white flex items-center justify-center group-hover:scale-110 transition-transform mb-2.5 shadow-sm">
                <Mic2 className="w-5 h-5" />
              </div>
              <span className="block font-bold text-xs text-crimson-900">
                Thi vấn đáp AI
              </span>
              <span className="text-[11px] text-crimson-800/80 line-clamp-1 font-medium">
                Giả lập cùng Giảng viên
              </span>
              <span className="absolute top-2 right-2 text-[10px] font-bold bg-crimson-800 text-white px-1.5 py-0.2 rounded-full">
                HOT
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Quick Tool Preview Drawer / Modal */}
      {activeQuickTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E2D9CC] relative animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <h3 className="font-bold text-base text-neutral-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-crimson-800" />
                {activeQuickTool === 'mindmap' && 'Sơ đồ tư duy AI: Phép Biện chứng Duy vật'}
                {activeQuickTool === 'flashcard' && 'Bộ thẻ Flashcard: Thuật ngữ Triết học'}
                {activeQuickTool === 'mcq' && 'Bài tập trắc nghiệm nhanh (5 câu ôn tập)'}
              </h3>
              <button
                type="button"
                onClick={() => setActiveQuickTool(null)}
                className="text-neutral-400 hover:text-neutral-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {activeQuickTool === 'mindmap' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-crimson-50 border border-crimson-200 rounded-xl">
                  <div className="font-bold text-crimson-900 mb-1">
                    🌿 Gốc: Phép biện chứng duy vật (Mác - Lênin)
                  </div>
                  <div className="pl-4 border-l-2 border-crimson-300 space-y-1 text-neutral-700 mt-2">
                    <div>├─ 2 Nguyên lý: Liên hệ phổ biến &amp; Sự phát triển</div>
                    <div>├─ 3 Quy luật: Lượng - Chất, Mâu thuẫn, Phủ định của phủ định</div>
                    <div>└─ 6 Cặp phạm trù: Cái riêng/Cái chung, Bản chất/Hiện tượng...</div>
                  </div>
                </div>
                <p className="text-[11px] text-neutral-500">
                  Đã tạo sơ đồ trực quan kết nối với ví dụ ngành Truyền thông.
                </p>
              </div>
            )}

            {activeQuickTool === 'flashcard' && (
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
                    Thẻ 01 / 15 • Mặt trước
                  </span>
                  <div className="text-sm font-bold text-neutral-900 my-2">
                    &ldquo;Độ&rdquo; và &ldquo;Điểm nút&rdquo; là gì?
                  </div>
                  <div className="text-xs text-neutral-600 border-t border-amber-200 pt-2 mt-2">
                    <strong>Độ:</strong> Giới hạn mà trong đó sự thay đổi về lượng chưa làm thay đổi căn bản về chất.
                    <br />
                    <strong>Điểm nút:</strong> Thời điểm mà tại đó lượng đổi dẫn đến chất đổi.
                  </div>
                </div>
              </div>
            )}

            {activeQuickTool === 'mcq' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl">
                  <p className="font-semibold text-neutral-900 mb-2">
                    Câu 1: Hình thức nào sau đây KHÔNG PHẢI là phủ định biện chứng?
                  </p>
                  <div className="space-y-1.5 pl-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="mcq" />
                      <span>A. Hạt thóc nảy mầm thành cây lúa</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="mcq" defaultChecked />
                      <span className="text-crimson-800 font-semibold">
                        B. Dẫm nát hạt thóc làm nó mất khả năng sinh trưởng (Đáp án đúng)
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="mcq" />
                      <span>C. Tằm nhả tơ rồi hóa bướm</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveQuickTool(null)}
                className="px-4 py-2 bg-crimson-800 text-white rounded-xl text-xs font-semibold hover:bg-crimson-900 cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
