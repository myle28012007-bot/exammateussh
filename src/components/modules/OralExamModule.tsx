import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Play, 
  Square, 
  RotateCcw, 
  Award, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  Sliders, 
  Volume2, 
  Clock,
  UserCheck,
  FileCheck
} from 'lucide-react';
import { ExaminerPersona, OralExamQuestion, RubricScore } from '../../types';

interface OralExamModuleProps {
  personas: ExaminerPersona[];
  questions: OralExamQuestion[];
}

export function OralExamModule({ personas, questions }: OralExamModuleProps) {
  const [selectedPersona, setSelectedPersona] = useState<ExaminerPersona>(personas[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex] || questions[0];

  // Live 3:00 Countdown timer (180 seconds)
  const [secondsRemaining, setSecondsRemaining] = useState(180);
  const [isRecording, setIsRecording] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showEvaluation, setShowEvaluation] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sample student response preset for instant simulation
  const sampleResponse = 
    "Kính thưa Thầy/Cô, em xin phép trình bày câu hỏi số 04 về quy luật phủ định của phủ định.\n" +
    "1. Về khái niệm: Phủ định biện chứng là sự phủ định mang tính khách quan và tính kế thừa. Nó không phải là sự xóa bỏ hoàn toàn mà là mắt xích tất yếu của sự phát triển.\n" +
    "2. Về nội dung quy luật: Sự phát triển diễn ra theo đường xoáy ốc. Trải qua ít nhất hai lần phủ định cơ bản, sự vật dường như lặp lại cái ban đầu nhưng trên cơ sở cao hơn.\n" +
    "3. Về liên hệ thực tiễn truyền thông số tại Việt Nam: Chúng ta thấy sự chuyển dịch từ báo in truyền thống (giai đoạn 1) sang báo mạng điện tử phân tán (giai đoạn 2), và hiện nay là xu hướng báo chí âm thanh (podcast, radio số, voice-news). Định dạng âm thanh dường như lặp lại của phát thanh truyền thống trước đây, nhưng đã được tích hợp công nghệ trí tuệ nhân tạo, nghe theo yêu cầu trên Spotify và Apple Podcasts. Điều này thể hiện rõ nét tính kế thừa hạt nhân hợp lý và sự lặp lại ở trình độ công nghệ cao hơn.";

  useEffect(() => {
    if (isRecording && secondsRemaining > 0) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            handleStopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, secondsRemaining]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setIsFinished(false);
    setShowEvaluation(false);
    if (!transcript) {
      setTranscript(sampleResponse);
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsFinished(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleReset = () => {
    setIsRecording(false);
    setIsFinished(false);
    setShowEvaluation(false);
    setSecondsRemaining(180);
    setTranscript('');
  };

  const handleEvaluate = () => {
    setShowEvaluation(true);
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="rounded-2xl bg-white border border-[#E2D9CC] p-6 shadow-card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-crimson-800 text-white uppercase tracking-wider">
                Tính năng Độc quyền AI
              </span>
              <span className="text-xs text-neutral-500 font-medium">
                Mô phỏng 1-1 với Hội đồng chấm thi USSH
              </span>
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 font-display">
              Phòng Thi Vấn Đáp Thông Minh (Oral Exam Simulator)
            </h1>
            <p className="text-xs md:text-sm text-neutral-600">
              Luyện phản xạ đối đáp trong 3 phút, nhận chấm điểm tức thì theo Rubric chuẩn hóa và phong cách riêng của từng Giảng viên.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
                handleReset();
              }}
              className="px-3.5 py-2 rounded-xl border border-[#E2D9CC] bg-[#FAF8F5] hover:bg-neutral-100 text-xs font-semibold text-neutral-700 transition-colors shadow-xs cursor-pointer"
            >
              Rút thăm câu khác 🎲
            </button>
          </div>
        </div>
      </div>

      {/* Examiner Persona Selector Grid */}
      <div className="rounded-2xl bg-white border border-[#E2D9CC] p-6 shadow-card">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-100">
          <div>
            <h2 className="font-bold text-base text-neutral-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-crimson-800" />
              <span>Chọn Giám khảo Chấm thi (Lecturer Persona)</span>
            </h2>
            <p className="text-xs text-neutral-500">
              Mỗi giảng viên có phong cách phản biện và tiêu chí trọng số chấm thi riêng biệt
            </p>
          </div>
          <span className="text-xs font-bold text-crimson-800 bg-crimson-50 px-2.5 py-1 rounded-full border border-crimson-200">
            Đang chọn: {selectedPersona.name}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {personas.map((persona) => {
            const isSelected = selectedPersona.id === persona.id;
            return (
              <div
                key={persona.id}
                onClick={() => setSelectedPersona(persona)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-crimson-800 bg-crimson-50/40 shadow-sm'
                    : 'border-[#E8E1D5] bg-[#FAF8F5] hover:border-neutral-400'
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <img
                      src={persona.avatar}
                      alt={persona.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-neutral-900">{persona.name}</h3>
                      <p className="text-[11px] text-neutral-500">{persona.title}</p>
                    </div>
                  </div>

                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-crimson-100 text-crimson-800 mb-2">
                    {persona.badge}
                  </span>

                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {persona.description}
                  </p>
                </div>

                {/* Persona weights mini-bar */}
                <div className="mt-3 pt-3 border-t border-neutral-200/60 text-[10px] text-neutral-500 space-y-1">
                  <div className="flex justify-between">
                    <span>Độ chuẩn học thuật:</span>
                    <span className="font-bold text-neutral-900 font-mono">
                      {persona.weightAcademicAccuracy}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dẫn chứng thực tiễn:</span>
                    <span className="font-bold text-neutral-900 font-mono">
                      {persona.weightPracticalExamples}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Stage & Question Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Question, Live Audio Stage & Transcription (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Question Card */}
          <div className="rounded-2xl bg-white border border-[#E2D9CC] p-6 shadow-card">
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
              <span className="font-bold text-crimson-800 tracking-wider">
                {currentQuestion.code}
              </span>
              <span className="font-mono">{currentQuestion.subject}</span>
            </div>

            <h3 className="text-base md:text-lg font-bold text-neutral-900 leading-snug">
              &ldquo;{currentQuestion.question}&rdquo;
            </h3>

            {/* Hints Accordion */}
            <div className="mt-4 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
              <span className="font-bold text-neutral-800 block mb-1">
                💡 Gợi ý dàn ý phản xạ nhanh từ Giảng viên:
              </span>
              <ul className="space-y-1 text-neutral-600 list-disc pl-4">
                {currentQuestion.hints.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Active Audio Waveform Stage & Timer */}
          <div className="rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-white p-6 shadow-xl border border-neutral-800">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-crimson-500 animate-ping" />
                <span className="text-xs uppercase tracking-wider font-semibold text-neutral-300">
                  {isRecording ? 'Đang ghi âm câu trả lời...' : 'Sẵn sàng ghi âm'}
                </span>
              </div>

              {/* Digital 3:00 Countdown Timer */}
              <div
                className={`font-mono text-2xl font-bold px-3 py-1 rounded-xl border ${
                  secondsRemaining <= 30
                    ? 'bg-red-950/80 text-red-400 border-red-700 animate-pulse'
                    : 'bg-neutral-800/80 text-amber-300 border-neutral-700'
                }`}
              >
                {formatTimer(secondsRemaining)}
              </div>
            </div>

            {/* Audio Waveform Visualizer */}
            <div className="my-8 h-20 flex items-center justify-center gap-1.5 px-4 bg-black/40 rounded-xl border border-neutral-800">
              {isRecording ? (
                <>
                  <div className="w-1.5 bg-amber-400 rounded-full animate-wave-1" />
                  <div className="w-1.5 bg-crimson-500 rounded-full animate-wave-2" />
                  <div className="w-1.5 bg-amber-300 rounded-full animate-wave-3" />
                  <div className="w-1.5 bg-crimson-400 rounded-full animate-wave-4" />
                  <div className="w-1.5 bg-emerald-400 rounded-full animate-wave-5" />
                  <div className="w-1.5 bg-amber-400 rounded-full animate-wave-6" />
                  <div className="w-1.5 bg-crimson-500 rounded-full animate-wave-7" />
                  <div className="w-1.5 bg-amber-300 rounded-full animate-wave-8" />
                  <div className="w-1.5 bg-crimson-400 rounded-full animate-wave-1" />
                  <div className="w-1.5 bg-amber-400 rounded-full animate-wave-3" />
                  <div className="w-1.5 bg-crimson-500 rounded-full animate-wave-5" />
                  <div className="w-1.5 bg-emerald-400 rounded-full animate-wave-7" />
                  <div className="w-1.5 bg-amber-400 rounded-full animate-wave-2" />
                  <div className="w-1.5 bg-crimson-500 rounded-full animate-wave-4" />
                  <div className="w-1.5 bg-amber-300 rounded-full animate-wave-6" />
                </>
              ) : (
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <Volume2 className="w-4 h-4 text-neutral-400" />
                  <span>Bấm nút micro để bắt đầu phát biểu và kích hoạt sóng âm</span>
                </div>
              )}
            </div>

            {/* Control Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                {!isRecording ? (
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    className="px-5 py-3 rounded-full bg-crimson-800 hover:bg-crimson-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-crimson-glow cursor-pointer"
                  >
                    <Mic className="w-4 h-4" />
                    <span>Bắt đầu trả lời</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleStopRecording}
                    className="px-5 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Square className="w-4 h-4 fill-white" />
                    <span>Dừng &amp; Hoàn tất</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleReset}
                  className="p-3 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  title="Làm lại từ đầu"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {isFinished && (
                <button
                  type="button"
                  onClick={handleEvaluate}
                  className="px-5 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-900 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Chấm điểm AI ngay</span>
                </button>
              )}
            </div>
          </div>

          {/* Speech-to-Text Transcript preview / edit */}
          <div className="rounded-2xl bg-white border border-[#E2D9CC] p-6 shadow-card">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
              <h4 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-crimson-800" />
                <span>Bản ghi âm &amp; Chuyển văn bản (Transcript)</span>
              </h4>
              <button
                type="button"
                onClick={() => setTranscript(sampleResponse)}
                className="text-xs text-crimson-800 hover:underline font-medium cursor-pointer"
              >
                Chèn bài mẫu chuẩn ĐHQG
              </button>
            </div>

            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Nội dung bạn phát biểu sẽ được tự động chuyển thành văn bản tại đây hoặc bạn có thể gõ trực tiếp để AI chấm điểm..."
              rows={6}
              className="w-full p-3.5 rounded-xl border border-neutral-200 text-xs text-neutral-800 focus:outline-none focus:border-crimson-800 focus:ring-1 focus:ring-crimson-800 resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Right Column: Transparent Scoring Rubric (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-white border border-[#E2D9CC] p-6 shadow-card">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-crimson-800 tracking-wider">
                  Chuẩn ĐHQG
                </span>
                <h3 className="font-bold text-base text-neutral-900">
                  Rubric Chấm Điểm Minh Bạch
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-neutral-500">100%</span>
            </div>

            <div className="space-y-4">
              {/* Criterion 1: Academic Accuracy (60%) */}
              <div className="p-3.5 rounded-xl bg-crimson-50/60 border border-crimson-100">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-900 mb-1">
                  <span className="flex items-center gap-1.5 text-crimson-900">
                    <span>🎯</span> Độ chính xác học thuật
                  </span>
                  <span className="font-mono text-crimson-800 font-extrabold text-sm">
                    {selectedPersona.weightAcademicAccuracy}%
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  Định nghĩa chuẩn xác thuật ngữ: Phủ định biện chứng, tính khách quan, tính kế thừa hạt nhân hợp lý.
                </p>
              </div>

              {/* Criterion 2: Logical Structure (20%) */}
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-100">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-900 mb-1">
                  <span className="flex items-center gap-1.5 text-amber-900">
                    <span>🔗</span> Mạch lạc lập luận
                  </span>
                  <span className="font-mono text-amber-800 font-extrabold text-sm">
                    {selectedPersona.weightLogicalStructure}%
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  Bố cục 3 phần rõ ràng: Khái niệm -&gt; Nội dung quy luật đường xoáy ốc -&gt; Ý nghĩa phương pháp luận.
                </p>
              </div>

              {/* Criterion 3: Practical Examples (10%) */}
              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-900 mb-1">
                  <span className="flex items-center gap-1.5 text-emerald-900">
                    <span>💡</span> Dẫn chứng thực tiễn
                  </span>
                  <span className="font-mono text-emerald-800 font-extrabold text-sm">
                    {selectedPersona.weightPracticalExamples}%
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  Ví dụ sát sườn về báo chí truyền thông số tại Việt Nam (podcast/audio journalism kế thừa phát thanh).
                </p>
              </div>

              {/* Criterion 4: Academic Tone (10%) */}
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-900 mb-1">
                  <span className="flex items-center gap-1.5 text-blue-900">
                    <span>🗣️</span> Diễn đạt chuyên ngành
                  </span>
                  <span className="font-mono text-blue-800 font-extrabold text-sm">
                    {selectedPersona.weightAcademicTone}%
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  Tác phong đĩnh đạc, thưa gửi trang trọng, không dùng tiếng lóng hay thuật ngữ mơ hồ.
                </p>
              </div>
            </div>
          </div>

          {/* AI Instant Evaluation Results Card */}
          {showEvaluation && (
            <div className="rounded-2xl bg-white border-2 border-crimson-800 p-6 shadow-xl animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span className="font-bold text-sm text-neutral-900">
                    Kết quả Đánh giá AI ({selectedPersona.name})
                  </span>
                </div>
                <span className="text-xl font-extrabold text-crimson-800 font-mono">
                  8.8 / 10.0
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-neutral-200">
                  <div className="font-bold text-neutral-800 mb-1">
                    Nhận xét của {selectedPersona.title} {selectedPersona.name}:
                  </div>
                  <p className="text-neutral-600 italic leading-relaxed">
                    &ldquo;Sinh viên nắm chắc bản chất kế thừa của phủ định biện chứng. Đặc biệt đánh giá cao ví dụ về podcast kế thừa phát thanh trong truyền thông hiện đại.&rdquo;
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Ưu điểm: Bố cục 3 phần gãy gọn, dẫn chứng sát thực tế.</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-800 font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Lưu ý: Cần nhấn mạnh thêm khái niệm &ldquo;Đường xoáy trôn ốc&rdquo; để đạt trọn điểm học thuật 9.5+.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
