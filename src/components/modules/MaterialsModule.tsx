import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  Download, 
  Eye, 
  Search, 
  Filter, 
  Folder, 
  Sparkles, 
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';
import { CONTEXTUAL_DOCUMENTS } from '../../data/mockData';

export function MaterialsModule() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  const categories = ['Tất cả', 'Slide bài giảng', 'Đề cương ôn tập', 'Ngân hàng câu hỏi', 'Ghi chú sinh viên'];

  const allMaterials = [
    ...CONTEXTUAL_DOCUMENTS,
    {
      id: 'doc-6',
      name: 'DeThi_HetMon_TrietHoc_2024_2025_Dot1.pdf',
      type: 'pdf' as const,
      size: '4.7 MB',
      dateAdded: '15/09/2026',
      stepId: 4,
      previewSummary: 'Đề thi chính thức đợt 1 năm học 2024-2025: Gồm 2 câu lý thuyết tự luận và 1 câu hỏi liên hệ thực tế truyền thông.',
    },
    {
      id: 'doc-7',
      name: 'BangDoiSanh_CacHeThong_TrietHoc_TayPhuong.xlsx',
      type: 'docx' as const,
      size: '1.2 MB',
      dateAdded: '20/09/2026',
      stepId: 1,
      previewSummary: 'Bảng đối sánh các trường phái triết học từ Hy Lạp cổ đại đến Khai sáng và Mác-Lênin.',
    },
    {
      id: 'doc-8',
      name: 'TongHop_CacBaiBao_NghienCuu_QuanHeCongChung.pdf',
      type: 'pdf' as const,
      size: '8.9 MB',
      dateAdded: '25/09/2026',
      stepId: 3,
      previewSummary: 'Tuyển tập 12 bài báo khoa học của giảng viên USSH về chiến lược truyền thông số và quản trị khủng hoảng trong Ngành Quan hệ công chúng.',
    },
  ];

  const filtered = allMaterials.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.previewSummary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="rounded-2xl bg-white border border-[#E2D9CC] p-6 shadow-card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 uppercase tracking-wider">
                Thư Viện Số USSH
              </span>
              <span className="text-xs text-neutral-400 font-mono">Đồng bộ từ Cổng Đào tạo VNU</span>
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 font-display">
              Kho Tài Liệu &amp; Ngân Hàng Đề Thi
            </h1>
            <p className="text-xs md:text-sm text-neutral-600">
              Tổng hợp toàn bộ slide, đề cương, đề thi kết thúc học phần và ghi chú học tập chất lượng cao.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm tài liệu theo tên, năm học..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-neutral-200 text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-crimson-800"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 cursor-pointer transition-colors ${
                activeCategory === cat
                  ? 'bg-crimson-800 text-white font-bold'
                  : 'bg-[#FAF8F5] text-neutral-600 hover:bg-neutral-200 border border-[#E8E1D5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((mat) => (
          <div
            key={mat.id}
            className="p-5 rounded-2xl bg-white border border-[#E2D9CC] shadow-card hover:border-neutral-400 hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-crimson-50 border border-crimson-200 flex items-center justify-center text-crimson-800 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 font-semibold">
                  {mat.size}
                </span>
              </div>

              <h3 className="font-bold text-xs text-neutral-900 leading-snug line-clamp-2 mb-1.5">
                {mat.name}
              </h3>
              <p className="text-[11px] text-neutral-500 line-clamp-3 leading-relaxed mb-3">
                {mat.previewSummary}
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-neutral-400 font-mono">
                {mat.dateAdded}
              </span>
              <button
                type="button"
                onClick={() => alert(`Tải xuống: ${mat.name}`)}
                className="px-3 py-1.5 bg-neutral-100 hover:bg-crimson-800 hover:text-white text-neutral-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải về</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
