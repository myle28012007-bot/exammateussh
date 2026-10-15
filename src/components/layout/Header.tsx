import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  BookOpen, 
  ChevronDown, 
  Check, 
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { StudentProfile, NotificationItem } from '../../types';

interface HeaderProps {
  student: StudentProfile;
  notifications: NotificationItem[];
  onOpenSearch: () => void;
  selectedSubject: string;
  onChangeSubject: (subject: string) => void;
  subjects: string[];
}

export function Header({
  student,
  notifications,
  onOpenSearch,
  selectedSubject,
  onChangeSubject,
  subjects,
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSubjectMenu, setShowSubjectMenu] = useState(false);
  const [localNotifications, setLocalNotifications] = useState(notifications);

  const unreadCount = localNotifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setLocalNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-20 w-full bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E2D9CC] px-6 py-3.5 transition-all">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Global Search Input with "Ctrl + K" */}
        <div className="flex-1 max-w-md">
          <button
            type="button"
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white border border-[#E2D9CC] rounded-xl text-neutral-400 hover:text-neutral-600 hover:border-neutral-400 text-sm transition-all shadow-xs cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-neutral-400 group-hover:text-crimson-800 transition-colors" />
              <span className="text-neutral-500 font-normal">
                Tìm kiếm tài liệu, đề thi, câu hỏi...
              </span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[11px] font-semibold text-neutral-400 bg-[#F5F0E6] px-2 py-0.5 rounded border border-[#E2D9CC]">
              <span>Ctrl</span>
              <span>+</span>
              <span>K</span>
            </div>
          </button>
        </div>

        {/* Center: Current Academic Subject Switcher */}
        <div className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setShowSubjectMenu(!showSubjectMenu)}
            className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E2D9CC] rounded-xl text-xs font-semibold text-neutral-800 hover:border-crimson-800 transition-colors shadow-xs cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-crimson-800" />
            <span className="max-w-[180px] truncate">{selectedSubject}</span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          {showSubjectMenu && (
            <div className="absolute top-full mt-2 left-0 w-72 bg-white rounded-xl border border-[#E2D9CC] shadow-xl p-2 z-50">
              <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-2 py-1">
                Môn học đang ôn tập
              </div>
              <div className="space-y-1 mt-1">
                {subjects.map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => {
                      onChangeSubject(sub);
                      setShowSubjectMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                      selectedSubject === sub
                        ? 'bg-crimson-50 text-crimson-900 font-semibold'
                        : 'text-neutral-700 hover:bg-[#FAF6F0]'
                    }`}
                  >
                    <span className="truncate">{sub}</span>
                    {selectedSubject === sub && <Check className="w-3.5 h-3.5 text-crimson-800" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Notifications & Student Profile */}
        <div className="flex items-center gap-3.5">
          {/* Notification Bell with interactive dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-xl bg-white border border-[#E2D9CC] text-neutral-600 hover:text-crimson-800 hover:border-crimson-200 transition-colors cursor-pointer shadow-xs"
              aria-label="Thông báo"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-crimson-800 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-white rounded-2xl border border-[#E2D9CC] shadow-2xl p-4 z-50">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-neutral-900">Thông báo học tập</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-crimson-100 text-crimson-800">
                        {unreadCount} mới
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllRead}
                      className="text-xs font-medium text-crimson-800 hover:underline cursor-pointer"
                    >
                      Đánh dấu đã đọc
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2">
                  {localNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 rounded-xl border text-xs transition-colors ${
                        notif.read
                          ? 'bg-neutral-50/70 border-neutral-100 text-neutral-600'
                          : 'bg-crimson-50/50 border-crimson-100 text-neutral-900 font-medium'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-neutral-900">{notif.title}</span>
                        <span className="text-[10px] text-neutral-400 shrink-0 font-mono">
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="mt-1 text-neutral-600 leading-relaxed text-[11px]">
                        {notif.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Bar */}
          <div className="flex items-center gap-3 pl-2 border-l border-[#E2D9CC]">
            <div className="relative">
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-crimson-800 shadow-xs"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
            </div>

            <div className="hidden lg:flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-neutral-900 leading-tight">
                  {student.name}
                </span>
                <span className="text-[10px] font-semibold text-crimson-800 bg-crimson-50 px-1.5 py-0.2 rounded border border-crimson-200">
                  {student.department}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
                <span>MSSV: {student.studentId}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5 text-amber-700 font-semibold font-sans">
                  <GraduationCap className="w-3 h-3" /> GPA: 3.82
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
