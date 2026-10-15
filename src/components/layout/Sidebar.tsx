import React from 'react';
import { 
  Home, 
  Map, 
  Mic2, 
  FileText, 
  Users, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles
} from 'lucide-react';
import { ActiveModule } from '../../types';
import { UsshLogo } from '../ui/UsshLogo';
import { CampusIllustration } from '../ui/CampusIllustration';

interface SidebarProps {
  activeModule: ActiveModule;
  onSelectModule: (module: ActiveModule) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  activeModule,
  onSelectModule,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const navItems = [
    {
      id: 'dashboard' as ActiveModule,
      label: 'Trang chủ',
      icon: Home,
      badge: 'Trọng tâm',
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'roadmap' as ActiveModule,
      label: 'Lộ trình ôn tập',
      icon: Map,
      badge: '5 Bước',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'oral-exam' as ActiveModule,
      label: 'Phòng thi vấn đáp',
      icon: Mic2,
      badge: 'Độc quyền AI',
      badgeColor: 'bg-crimson-100 text-crimson-800 font-bold',
    },
    {
      id: 'essay-assistant' as ActiveModule,
      label: 'Trợ lý tiểu luận',
      icon: FileText,
      badge: 'Chuẩn APA',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'community' as ActiveModule,
      label: 'Cộng đồng Q&A',
      icon: Users,
      badge: '12 mới',
      badgeColor: 'bg-purple-100 text-purple-800',
    },
    {
      id: 'materials' as ActiveModule,
      label: 'Kho tài liệu & Đề thi',
      icon: BookOpen,
      badge: undefined,
      badgeColor: undefined,
    },
  ];

  return (
    <aside
      className={`relative h-screen flex flex-col justify-between bg-white border-r border-[#E2D9CC] transition-all duration-300 ease-in-out select-none z-30 shrink-0 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Header & Brand */}
      <div>
        <div className={`flex items-center p-4 border-b border-[#EFECE6] ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div 
            onClick={() => onSelectModule('dashboard')}
            className="cursor-pointer flex items-center gap-3 overflow-hidden"
          >
            <UsshLogo size={isCollapsed ? 42 : 44} />
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-[17px] text-neutral-900 tracking-tight font-display">
                    Exam<span className="text-crimson-800">Mate</span>
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-crimson-800 text-white rounded uppercase tracking-wider">
                    USSH
                  </span>
                </div>
                <span className="text-[11px] font-medium text-neutral-500 truncate" title="Ôn đúng trọng tâm – Thi vững tự tin!">
                  Ôn đúng trọng tâm – Thi vững tự tin!
                </span>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <button
              type="button"
              onClick={onToggleCollapse}
              className="p-1.5 text-neutral-400 hover:text-crimson-800 hover:bg-crimson-50 rounded-lg transition-colors cursor-pointer"
              title="Thu gọn thanh điều hướng"
              aria-label="Thu gọn sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Collapsed expand button */}
        {isCollapsed && (
          <div className="flex justify-center py-2 border-b border-[#EFECE6]">
            <button
              type="button"
              onClick={onToggleCollapse}
              className="p-1.5 text-neutral-400 hover:text-crimson-800 hover:bg-crimson-50 rounded-lg transition-colors cursor-pointer"
              title="Mở rộng thanh điều hướng"
              aria-label="Mở rộng sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation List */}
        <nav className="p-3 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectModule(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full group relative flex items-center rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
                  isCollapsed ? 'justify-center p-3' : 'px-3.5 py-2.5 gap-3'
                } ${
                  isActive
                    ? 'bg-crimson-800 text-white shadow-sm font-semibold'
                    : 'text-neutral-700 hover:bg-[#F8F5EE] hover:text-crimson-900'
                }`}
              >
                {/* Active Glowing indicator on left */}
                {isActive && (
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-crimson-800 rounded-r-full shadow-crimson-glow" />
                )}

                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-amber-200' : 'text-neutral-500 group-hover:text-crimson-800'
                  }`}
                />

                {!isCollapsed && (
                  <div className="flex items-center justify-between flex-1 min-w-0">
                    <span className="truncate text-left">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 ml-1.5 ${
                          isActive
                            ? 'bg-white/20 text-white border border-white/30'
                            : item.badgeColor
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}

                {/* Tooltip on collapse */}
                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Campus Illustration & Quote */}
      <div className={`p-3 border-t border-[#EFECE6] ${isCollapsed ? 'px-2' : 'px-3'}`}>
        <CampusIllustration collapsed={isCollapsed} />
        
        {!isCollapsed && (
          <div className="mt-3 px-2 flex items-center justify-between text-[11px] text-neutral-400">
            <span className="flex items-center gap-1 font-medium">
              <Sparkles className="w-3 h-3 text-amber-500" /> VNU-USSH v2.4
            </span>
            <span className="font-mono">2026</span>
          </div>
        )}
      </div>
    </aside>
  );
}
