import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  CheckSquare, 
  Square, 
  AlertTriangle, 
  CheckCircle, 
  BookMarked, 
  ListOrdered, 
  Copy, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send
} from 'lucide-react';

export function EssayAssistantModule() {
  const [essayText, setEssayText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | {
    academicToneScore: number;
    argumentStrengthScore: number;
    citationFormatScore: number;
    strengths: string[];
    critiquePoints: string[];
    usshRecommendations: string[];
  }>(null);

  // Pre-submission interactive checklist
  const [checklist, setChecklist] = useState([
    {
      id: 'margins',
      label: 'Quy cách căn lề chuẩn văn bản ĐHQG (Trên 2.0cm, Dưới 2.0cm, Trái 3.0cm, Phải 2.0cm)',
      checked: true,
      category: 'Định dạng hình thức',
    },
    {
      id: 'font',
      label: 'Font chữ Times New Roman cỡ 13pt (hoặc 14pt), giãn dòng Line Spacing 1.5 lines',
      checked: true,
      category: 'Định dạng hình thức',
    },
    {
      id: 'apa',
      label: 'Danh mục tài liệu tham khảo đúng chuẩn APA 7th (sắp xếp A-Z theo họ tác giả)',
      checked: true,
      category: 'Học thuật & Trích dẫn',
    },
    {
      id: 'practice-ratio',
      label: 'Dung lượng phân tích thực trạng & dẫn chứng thực tiễn đạt tối thiểu 40% toàn bài',
      checked: false,
      category: 'Nội dung & Lập luận',
    },
    {
      id: 'plagiarism',
      label: 'Kiểm tra tỷ lệ trùng lặp văn bản dưới 15% và trích dẫn rõ nguồn số liệu thống kê',
      checked: false,
      category: 'Liêm chính học thuật',
    },
    {
      id: 'cover',
      label: 'Trang bìa chính và bìa phụ theo mẫu quy định của Khoa (có logo USSH, tên GVHD, MSSV)',
      checked: true,
      category: 'Định dạng hình thức',
    },
  ]);

  const toggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const sampleOutline = 
    "ĐỀ TÀI: Tác động của mạng xã hội đối với nhận thức chính trị - xã hội của sinh viên Trường ĐH KHXH&NV, ĐHQG\n\n" +
    "PHẦN MỞ ĐẦU:\n" +
    "1. Tính cấp thiết của đề tài: Sự bùng nổ của TikTok và Facebook tại các trường đại học.\n" +
    "2. Mục đích và nhiệm vụ nghiên cứu: Khảo sát thói quen tiếp cận thông tin thời sự.\n" +
    "3. Đối tượng và phạm vi: Sinh viên chính quy khóa K22 - K24 cơ sở Đinh Tiên Hoàng và Thủ Đức.\n" +
    "4. Phương pháp nghiên cứu: Bảng hỏi định lượng (N = 350) và phỏng vấn sâu.\n\n" +
    "PHẦN NỘI DUNG:\n" +
    "Chương 1: Cơ sở lý luận về mạng xã hội và nhận thức chính trị - xã hội\n" +
    "- 1.1 Khái niệm mạng xã hội và không gian mạng công cộng (Habermas)\n" +
    "- 1.2 Mối quan hệ giữa truyền thông đại chúng và hành vi chính trị\n\n" +
    "Chương 2: Thực trạng tiếp nhận thông tin chính trị - xã hội của sinh viên USSH\n" +
    "- 2.1 Các kênh tiếp cận chủ yếu và thời lượng sử dụng\n" +
    "- 2.2 Đánh giá mức độ tin cậy và khả năng nhận diện tin giả (Fake News)\n\n" +
    "Chương 3: Đề xuất giải pháp nâng cao năng lực truyền thông (Media Literacy)\n" +
    "- 3.1 Giải pháp từ phía Nhà trường và Đoàn - Hội sinh viên\n" +
    "- 3.2 Giải pháp tự nâng cao sức đề kháng thông tin của sinh viên";

  const handleAnalyze = () => {
    if (!essayText.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        academicToneScore: 92,
        argumentStrengthScore: 88,
        citationFormatScore: 85,
        strengths: [
          'Bố cục 3 phần theo chuẩn quy định đề cương nghiên cứu khoa học của USSH.',
          'Sử dụng lý thuyết không gian công cộng (Public Sphere) của Jürgen Habermas rất phù hợp với sinh viên Ngành Quan hệ công chúng.',
          'Đối tượng và phạm vi nghiên cứu được khoanh vùng rõ ràng (cơ sở 1 Đinh Tiên Hoàng và cơ sở 2 Linh Trung - Thủ Đức).',
        ],
        critiquePoints: [
          'Cần bổ sung rõ hơn giả thuyết nghiên cứu (Research Hypothesis) ở phần Mở đầu.',
          'Chương 2 cần có phương án kiểm định độ tin cậy của thang đo (Cronbach\'s Alpha nếu dùng bảng hỏi Likert 5 mức độ).',
          'Tên Chương 3 nên bổ sung từ khóa "cho sinh viên ĐH KHXH&NV" để bảo đảm tính nhất quán với tên đề tài.',
        ],
        usshRecommendations: [
          'Trích dẫn thêm công trình nghiên cứu của các giảng viên Ngành Quan hệ công chúng đã công bố trên Tạp chí Phát triển KH&CN.',
          'Bảo đảm định dạng trích dẫn trong bài viết (In-text citation) tuân thủ nghiêm ngặt chuẩn APA 7th (Ví dụ: Nguyễn Văn A, 2024, tr. 45).',
        ],
      });
    }, 1000);
  };

  const completedCount = checklist.filter((c) => c.checked).length;
  const checklistPercent = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="rounded-2xl bg-white border border-[#E2D9CC] p-6 shadow-card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 uppercase tracking-wider">
                Trợ lý Học thuật Chuyên sâu
              </span>
              <span className="text-xs text-neutral-400 font-mono">Chuẩn APA 7th &amp; ĐHQG</span>
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 font-display">
              Trợ Lý Hướng Dẫn Làm Tiểu Luận &amp; Bài Tự Luận
            </h1>
            <p className="text-xs md:text-sm text-neutral-600">
              Xây dựng khung bài tiểu luận học kỳ, kiểm tra lập luận với AI và rà soát các tiêu chuẩn nộp bài bắt buộc tại USSH.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setEssayText(sampleOutline);
                handleAnalyze();
              }}
              className="px-4 py-2.5 rounded-xl border border-crimson-800 bg-crimson-50 text-crimson-800 hover:bg-crimson-100 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tải đề cương mẫu USSH</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Academic Framework Builder (Khung Cấu Trúc Chuẩn USSH) */}
      <div className="rounded-2xl bg-white border border-[#E2D9CC] p-6 shadow-card">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-100">
          <div>
            <h2 className="font-bold text-base text-neutral-900 flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-crimson-800" />
              <span>Khung Cấu Trúc Chuẩn Tiểu Luận Học Kỳ (USSH Standard)</span>
            </h2>
            <p className="text-xs text-neutral-500">
              Quy chuẩn kết cấu bắt buộc áp dụng cho các học phần đại cương và chuyên ngành
            </p>
          </div>
          <span className="text-xs font-semibold text-neutral-500">
            Dung lượng chuẩn: 12 - 20 trang
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Part 1: Mở đầu */}
          <div className="p-4 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-crimson-800 uppercase tracking-wider">
                Phần 1: Mở đầu
              </span>
              <span className="text-[10px] font-mono text-neutral-400">10% dung lượng</span>
            </div>
            <h3 className="font-bold text-sm text-neutral-900 mb-2">
              Đặt vấn đề &amp; Thiết kế nghiên cứu
            </h3>
            <ul className="text-xs text-neutral-600 space-y-1.5 list-disc pl-4">
              <li>Tính cấp thiết và lý do chọn đề tài</li>
              <li>Mục tiêu, nhiệm vụ và câu hỏi nghiên cứu</li>
              <li>Đối tượng, khách thể và phạm vi khảo sát</li>
              <li>Phương pháp thu thập và phân tích dữ liệu</li>
            </ul>
          </div>

          {/* Part 2: Thân bài */}
          <div className="p-4 rounded-xl border-2 border-crimson-800/40 bg-crimson-50/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-crimson-800 uppercase tracking-wider">
                Phần 2: Thân bài
              </span>
              <span className="text-[10px] font-mono text-crimson-800 font-bold">80% dung lượng</span>
            </div>
            <h3 className="font-bold text-sm text-neutral-900 mb-2">
              Chương 1, 2 &amp; 3 (Học thuyết &amp; Thực tiễn)
            </h3>
            <ul className="text-xs text-neutral-600 space-y-1.5 list-disc pl-4">
              <li><strong>Chương 1:</strong> Cơ sở lý luận (Khái niệm &amp; mô hình)</li>
              <li><strong>Chương 2:</strong> Thực trạng phân tích tại Việt Nam</li>
              <li><strong>Chương 3:</strong> Đánh giá, bài học &amp; giải pháp</li>
              <li className="text-crimson-800 font-semibold">Tỷ lệ thực tiễn tối thiểu 40%</li>
            </ul>
          </div>

          {/* Part 3: Kết luận & TLTK */}
          <div className="p-4 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-crimson-800 uppercase tracking-wider">
                Phần 3: Kết luận
              </span>
              <span className="text-[10px] font-mono text-neutral-400">10% dung lượng</span>
            </div>
            <h3 className="font-bold text-sm text-neutral-900 mb-2">
              Tổng kết &amp; Trích dẫn APA 7th
            </h3>
            <ul className="text-xs text-neutral-600 space-y-1.5 list-disc pl-4">
              <li>Tóm lược đóng góp và phát hiện chính</li>
              <li>Hạn chế của đề tài và hướng nghiên cứu tiếp</li>
              <li>Danh mục tài liệu tham khảo chuẩn APA 7th</li>
              <li>Phụ lục (nếu có bảng hỏi, biểu mẫu phỏng vấn)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. AI Essay Critique Box & Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Input Textarea (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl bg-white border border-[#E2D9CC] p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <h3 className="font-bold text-base text-neutral-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-crimson-800" />
              <span>Hộp Phản Biện &amp; Đánh Giá Đề Cương AI</span>
            </h3>
            <span className="text-xs text-neutral-400 font-mono">
              {essayText.length} ký tự
            </span>
          </div>

          <p className="text-xs text-neutral-500">
            Dán dàn ý, tóm tắt đề tài hoặc đoạn văn lập luận của bạn vào đây để AI phân tích cấu trúc luận cứ:
          </p>

          <textarea
            value={essayText}
            onChange={(e) => setEssayText(e.target.value)}
            placeholder="Dán dàn ý chi tiết tiểu luận hoặc bản thảo của bạn vào đây..."
            rows={12}
            className="w-full p-4 rounded-xl border border-neutral-200 text-xs text-neutral-800 focus:outline-none focus:border-crimson-800 focus:ring-1 focus:ring-crimson-800 resize-none leading-relaxed font-sans"
          />

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setEssayText(sampleOutline)}
              className="text-xs text-neutral-500 hover:text-crimson-800 cursor-pointer"
            >
              Chèn đề cương mẫu Ngành Quan hệ công chúng
            </button>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!essayText.trim() || isAnalyzing}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-xs cursor-pointer ${
                !essayText.trim() || isAnalyzing
                  ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  : 'bg-crimson-800 text-white hover:bg-crimson-900'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isAnalyzing ? 'Đang phản biện...' : 'Phân tích & Phản biện'}</span>
            </button>
          </div>
        </div>

        {/* Right: AI Critique Results (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl bg-white border border-[#E2D9CC] p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <h3 className="font-bold text-base text-neutral-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Báo Cáo Phản Biện Học Thuật AI</span>
            </h3>
            {analysisResult && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Độ chuẩn xác: {analysisResult.academicToneScore}%
              </span>
            )}
          </div>

          {!analysisResult ? (
            <div className="py-16 text-center text-neutral-400 space-y-2">
              <BookMarked className="w-10 h-10 mx-auto text-neutral-300" />
              <p className="text-xs font-medium">
                Chưa có dữ liệu phân tích. Hãy dán đề cương vào ô bên trái và bấm &ldquo;Phân tích &amp; Phản biện&rdquo;.
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-xs animate-fadeIn">
              {/* Score breakdown metrics */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="block text-lg font-bold text-crimson-900 font-mono">
                    {analysisResult.academicToneScore}%
                  </span>
                  <span className="text-[10px] text-neutral-500 font-medium">Văn phong học thuật</span>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="block text-lg font-bold text-amber-700 font-mono">
                    {analysisResult.argumentStrengthScore}%
                  </span>
                  <span className="text-[10px] text-neutral-500 font-medium">Độ chặt chẽ luận cứ</span>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="block text-lg font-bold text-emerald-700 font-mono">
                    {analysisResult.citationFormatScore}%
                  </span>
                  <span className="text-[10px] text-neutral-500 font-medium">Cấu trúc đề cương</span>
                </div>
              </div>

              {/* Strengths */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <div className="font-bold text-emerald-900 mb-1.5 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>Điểm mạnh trong đề cương của bạn:</span>
                </div>
                <ul className="space-y-1 text-emerald-800 list-disc pl-4">
                  {analysisResult.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              {/* Critique & Fallacies */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                <div className="font-bold text-amber-900 mb-1.5 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>Điểm cần hoàn thiện trước khi gửi GVHD:</span>
                </div>
                <ul className="space-y-1 text-amber-800 list-disc pl-4">
                  {analysisResult.critiquePoints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              {/* USSH Specific Recommendations */}
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200">
                <div className="font-bold text-blue-900 mb-1.5">
                  🎓 Khuyến nghị từ dữ liệu khảo thí USSH:
                </div>
                <ul className="space-y-1 text-blue-800 list-disc pl-4">
                  {analysisResult.usshRecommendations.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Pre-submission Checklist (Bộ Kiểm Tra Trước Khi Nộp Bài) */}
      <div className="rounded-2xl bg-white border border-[#E2D9CC] p-6 shadow-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-neutral-100">
          <div>
            <h3 className="font-bold text-base text-neutral-900 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-crimson-800" />
              <span>Bộ Tiêu Chuẩn Kiểm Tra Trước Khi Nộp Bài (Pre-submission Checklist)</span>
            </h3>
            <p className="text-xs text-neutral-500">
              Đảm bảo 100% các tiêu chí hình thức và học thuật để không bị trừ điểm quy cách
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-neutral-700">
              Đạt {completedCount}/{checklist.length} tiêu chuẩn ({checklistPercent}%)
            </span>
            <div className="w-24 h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  checklistPercent === 100 ? 'bg-emerald-600' : 'bg-crimson-800'
                }`}
                style={{ width: `${checklistPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleChecklist(item.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                item.checked
                  ? 'border-emerald-200 bg-emerald-50/30'
                  : 'border-[#E8E1D5] bg-[#FAF8F5] hover:border-neutral-400'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 text-emerald-700 focus:outline-none shrink-0"
              >
                {item.checked ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                ) : (
                  <Square className="w-4 h-4 text-neutral-400" />
                )}
              </button>

              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                  {item.category}
                </span>
                <p
                  className={`text-xs leading-relaxed ${
                    item.checked
                      ? 'text-neutral-900 font-medium'
                      : 'text-neutral-600'
                  }`}
                >
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
