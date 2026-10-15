import React, { useRef, useState } from 'react';
import { Upload, X, Check, Sparkles, MapPin, Calendar, Compass, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface NavButtonProps {
  label: string;
  onClick: () => void;
}

export function NavButton({ label, onClick }: NavButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-transparent border-none cursor-pointer font-sans text-[15px] font-medium uppercase text-wandor-text tracking-[0.04em] transition-opacity hover:opacity-55"
    >
      {label}
    </button>
  );
}

export default function Hero() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [promptText, setPromptText] = useState(
    "I'm planning a 7-day trip to Japan in October. I love food, hidden cafes, scenic hikes, and want to avoid crowds...."
  );
  const [activeModal, setActiveModal] = useState<
    'plan' | 'discover' | 'pricing' | 'faqs' | 'login' | null
  >(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);

  const samplePrompts = [
    "I'm planning a 7-day trip to Japan in October. I love food, hidden cafes, scenic hikes, and want to avoid crowds....",
    "5 days in the Amalfi Coast in late spring. Romantic seaside dinners, boat rental, historic cliff paths, avoid tour buses....",
    "10-day Ring Road expedition in Iceland in September. Hot springs, dramatic waterfalls, northern lights hunting, cozy cabins....",
    "4 days exploring hidden courtyards, artisan leather makers, and vintage markets in Florence & Bologna...."
  ];

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handlePlanTrip = () => {
    setIsGenerating(true);
    setActiveModal('plan');
    setTimeout(() => {
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <section className="relative min-h-svh w-full overflow-hidden">
      {/* Background video (z-0) */}
      <video
        className="inset-0 w-full h-full object-cover z-0 absolute"
        src="https://pollen-batch-41236914.figma.site/_components/v2/f0ee2dae7671c170c34f12e31c4cb41418976c98/769c564298c132f7919405cd9f17c1b1231f341d.769c5642.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Top gradient overlay (z-1) */}
      <div
        className="inset-x-0 top-0 h-[687px] pointer-events-none z-[1] absolute"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
        }}
      />

      {/* Content wrapper (z-2) */}
      <div className="relative z-[2] max-w-[1360px] mx-auto flex flex-col min-h-svh justify-between">
        {/* Navigation bar */}
        <nav className="flex items-center justify-between px-20 pt-6 pb-4 max-md:px-6 max-md:pt-5 relative">
          {/* Left wordmark */}
          <div className="flex items-center">
            <span className="font-display text-[40px] max-md:text-[32px] text-black leading-none select-none">
              wandor
            </span>
          </div>

          {/* Center links (hidden on mobile) */}
          <div className="absolute left-1/2 -translate-x-1/2 flex gap-8 max-md:hidden">
            <NavButton label="Discover" onClick={() => setActiveModal('discover')} />
            <NavButton label="Pricing" onClick={() => setActiveModal('pricing')} />
            <NavButton label="FAQs" onClick={() => setActiveModal('faqs')} />
          </div>

          {/* Right group */}
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={() => setActiveModal('login')}
              className="max-md:hidden bg-transparent border-none cursor-pointer font-sans text-[15px] font-semibold uppercase text-[#292929] tracking-[0.04em] transition-opacity hover:opacity-55"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handlePlanTrip}
              className="bg-wandor-dark text-[#fafafa] border-none cursor-pointer font-sans text-[15px] font-medium uppercase tracking-[0.04em] px-5 py-3.5 rounded-full transition-all hover:bg-[#333] active:scale-95"
            >
              Plan My Trip
            </button>
          </div>
        </nav>

        {/* Hero body */}
        <div className="flex flex-col items-center px-6 pt-16 pb-24 text-center my-auto">
          <h1 className="font-sans text-[clamp(40px,6vw,68px)] font-medium text-wandor-text leading-[1.05] tracking-[-0.04em] max-w-[820px] mb-5">
            Where will you go next?
          </h1>

          <p className="font-sans text-xl font-medium text-wandor-muted leading-relaxed max-w-[500px] mb-10">
            Tell our AI where you're going and what you love. We'll create a personalized itinerary for you.
          </p>

          {/* Liquid glass prompt card */}
          <div className="relative w-[701px] max-md:w-[calc(100vw-48px)] min-h-[208px] bg-white/[0.06] border-[3px] border-white rounded-[44px] shadow-[0_0_4px_0_rgba(0,0,0,0.15)] overflow-hidden backdrop-blur-[20px] text-left transition-all">
            {/* Prompt text or inline editable field */}
            {isEditingPrompt ? (
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                onBlur={() => setIsEditingPrompt(false)}
                autoFocus
                className="absolute left-[29px] top-[24px] w-[609px] max-md:w-[calc(100%-58px)] h-[100px] font-sans text-xl max-md:text-[17px] font-medium text-wandor-prompt leading-relaxed bg-transparent resize-none outline-none border-b border-wandor-prompt/30 placeholder-wandor-prompt/50"
                placeholder="Where do you want to travel, and what inspires you?"
              />
            ) : (
              <p
                onClick={() => setIsEditingPrompt(true)}
                title="Click to customize your prompt"
                className="absolute left-[29px] top-[57px] -translate-y-1/2 w-[609px] max-md:w-[calc(100%-58px)] font-sans text-xl max-md:text-[17px] font-medium text-wandor-prompt leading-relaxed break-words cursor-text select-text"
              >
                {promptText}
              </p>
            )}

            {/* Uploaded file pill feedback if file selected */}
            {uploadedFile && (
              <div className="absolute left-[78px] top-[141px] flex items-center gap-1.5 px-3 py-1 bg-white/70 backdrop-blur-md rounded-full text-xs font-medium text-wandor-text shadow-xs">
                <span className="truncate max-w-[160px]">{uploadedFile.name}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUploadedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                  aria-label="Remove uploaded file"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Upload button */}
            <button
              type="button"
              onClick={handleUploadClick}
              className="absolute left-[21px] top-[137px] w-11 h-11 bg-transparent border border-white/70 rounded-full cursor-pointer flex items-center justify-center backdrop-blur-[14px] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              aria-label="Upload inspiration"
              title="Upload inspiration (photos, PDFs, tickets)"
            >
              <Upload className="w-[18px] h-[18px] text-wandor-text flex-shrink-0" />
            </button>

            {/* Plan My Trip CTA button inside card */}
            <button
              type="button"
              onClick={handlePlanTrip}
              className="absolute bottom-[21px] right-[21px] w-[156px] h-14 bg-black border-none rounded-[44px] shadow-[0_0_2px_0_rgba(0,0,0,0.05)] cursor-pointer flex items-center justify-center font-sans text-base font-medium text-[#fafafa] uppercase tracking-[0.02em] transition-all hover:bg-[#333] active:scale-95"
            >
              Plan My Trip
            </button>
          </div>

          {/* Quick inspiration suggestion tags below the card */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-[680px]">
            <span className="text-xs uppercase tracking-wider font-semibold text-wandor-muted mr-1">
              Try inspiration:
            </span>
            {samplePrompts.slice(1).map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPromptText(sample);
                  setIsEditingPrompt(false);
                }}
                className="text-xs font-medium text-[#444] bg-white/40 hover:bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full transition-colors border border-white/40 cursor-pointer text-left"
              >
                {idx === 0 && 'Amalfi Coast seaside'}
                {idx === 1 && 'Iceland Ring Road'}
                {idx === 2 && 'Florence & Bologna artisan'}
              </button>
            ))}
          </div>
        </div>

        {/* Quiet subtle bottom footer details */}
        <div className="px-6 py-4 flex items-center justify-between text-xs text-wandor-muted/80 max-md:flex-col max-md:gap-2">
          <span>&copy; {new Date().getFullYear()} Wandor Technologies Inc. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveModal('faqs')}
              className="hover:text-wandor-text transition-colors bg-transparent border-none cursor-pointer p-0 text-xs"
            >
              Privacy &amp; Terms
            </button>
            <span aria-hidden="true">&middot;</span>
            <button
              onClick={() => setActiveModal('discover')}
              className="hover:text-wandor-text transition-colors bg-transparent border-none cursor-pointer p-0 text-xs"
            >
              Curated Destinations
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Modals to prevent dead clicks and provide rich experience */}

      {/* Plan My Trip Modal / Drawer */}
      {activeModal === 'plan' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-all">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500 hover:text-black cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {isGenerating ? (
              <div className="py-16 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 border-4 border-wandor-prompt/20 border-t-wandor-prompt rounded-full animate-spin mb-4" />
                <h3 className="text-xl font-medium text-wandor-text mb-2">
                  Crafting your personalized journey...
                </h3>
                <p className="text-sm text-wandor-muted max-w-sm">
                  Analyzing weather patterns, crowd levels, hidden cafes, and scenic routes for your prompt.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2 text-wandor-prompt">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Custom AI Itinerary Generated
                  </span>
                </div>
                <h2 className="text-2xl font-semibold text-wandor-text mb-2">
                  7 Days in Japan: Autumn Reverie &amp; Hidden Alleys
                </h2>
                <p className="text-sm text-wandor-muted mb-6">
                  Tailored around food, artisanal kissatens, quiet forest trails, and crowd-free dawn walks.
                  {uploadedFile && ` Inspired by attached file: "${uploadedFile.name}".`}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-neutral-900">
                        Day 1–2: Tokyo Retro Kissatens &amp; Yanaka Craft
                      </span>
                      <span className="text-xs text-neutral-500 font-mono">Oct 12–13</span>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Begin in historic Yanaka Ginza. Savor siphon coffee at Kayaba Coffee, stroll the Nezu shrine stone pathways at 7:30 AM before tourists arrive, and explore quiet backstreet vintage vinyl bars in Shimokitazawa.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-neutral-900">
                        Day 3–4: Kamakura Coastal Trails &amp; Enoshima
                      </span>
                      <span className="text-xs text-neutral-500 font-mono">Oct 14–15</span>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Take the Enoden railway. Hike the Daibutsu hiking trail through cedar forests, enjoy soba in a traditional garden, and catch golden hour over Sagami Bay away from peak crowds.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-neutral-900">
                        Day 5–7: Kyoto Secret Moss Temples &amp; Arashiyama Dawn
                      </span>
                      <span className="text-xs text-neutral-500 font-mono">Oct 16–18</span>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Private morning walk through Gio-ji moss gardens, seasonal kaiseki dinner at an intimate 8-seat machiya, and cycling along the Kamo River banks under scarlet autumn maples.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-neutral-100 pt-5">
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Saved to your Wandor travel pocket</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      className="px-4 py-2.5 text-xs font-semibold text-neutral-700 hover:text-black transition-colors"
                    >
                      Done
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        alert("Itinerary synced! Download link sent to your device.");
                        setActiveModal(null);
                      }}
                      className="px-5 py-2.5 bg-wandor-dark text-white rounded-full text-xs font-medium uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      Export Itinerary
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Discover Modal */}
      {activeModal === 'discover' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500 hover:text-black cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-wandor-prompt mb-2">
              <Compass className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">Discover Wandor</span>
            </div>
            <h2 className="text-2xl font-semibold text-wandor-text mb-2">Curated Journeys For Every Taste</h2>
            <p className="text-sm text-wandor-muted mb-6">
              Explore hand-crafted routes curated by locals and calibrated by AI for optimal weather and foot-traffic pacing.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div
                onClick={() => {
                  setPromptText("7 days exploring Kyoto moss gardens, artisan pottery villages in Shigaraki, and lake Biwa...");
                  setActiveModal(null);
                }}
                className="p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-800 mb-1">
                  <MapPin className="w-4 h-4 text-wandor-prompt" />
                  <span>Kyoto &amp; Shiga, Japan</span>
                </div>
                <p className="text-xs text-neutral-600">
                  Pottery studios, ancient cedar trails, and early-morning teahouses.
                </p>
              </div>

              <div
                onClick={() => {
                  setPromptText("10 days in the Norwegian Fjords: Geirangerfjord hiking, kayak under cliffs, cozy sod-roof cabins...");
                  setActiveModal(null);
                }}
                className="p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-800 mb-1">
                  <MapPin className="w-4 h-4 text-wandor-prompt" />
                  <span>Western Fjords, Norway</span>
                </div>
                <p className="text-xs text-neutral-600">
                  Dramatic glacial vistas, sea kayaking, and serene Scandinavian cabins.
                </p>
              </div>

              <div
                onClick={() => {
                  setPromptText("6 days in Basque Country: San Sebastián pintxos crawl, Bilbao art galleries, and rugged coastal cliffs...");
                  setActiveModal(null);
                }}
                className="p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-800 mb-1">
                  <MapPin className="w-4 h-4 text-wandor-prompt" />
                  <span>Basque Country, Spain</span>
                </div>
                <p className="text-xs text-neutral-600">
                  World-class culinary trails, Michelin gems, and cliffside walks.
                </p>
              </div>

              <div
                onClick={() => {
                  setPromptText("8 days in the Scottish Highlands: Isle of Skye fairy pools, historic castles, and remote loch trails...");
                  setActiveModal(null);
                }}
                className="p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-800 mb-1">
                  <MapPin className="w-4 h-4 text-wandor-prompt" />
                  <span>Scottish Highlands &amp; Skye</span>
                </div>
                <p className="text-xs text-neutral-600">
                  Misty moorlands, dramatic castle ruins, and secluded coastal retreats.
                </p>
              </div>
            </div>

            <p className="text-xs text-center text-neutral-500">
              Click any journey to load it directly into your prompt card.
            </p>
          </div>
        </div>
      )}

      {/* Pricing Modal */}
      {activeModal === 'pricing' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500 hover:text-black cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-semibold text-wandor-text mb-2">Transparent Pricing</h2>
            <p className="text-sm text-wandor-muted mb-6">
              Plan your first trip for free. Upgrade whenever you need unlimited itineraries and live offline sync.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-5 rounded-2xl border border-neutral-200 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-neutral-900 mb-1">Explorer</h3>
                  <div className="text-2xl font-bold text-neutral-900 mb-3">$0</div>
                  <ul className="text-xs text-neutral-600 space-y-2 mb-4">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> 3 AI itineraries per month
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> PDF and image file upload
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Basic crowd avoidance alerts
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    alert("Explorer plan active! You have 3 complimentary itineraries.");
                    setActiveModal(null);
                  }}
                  className="w-full py-2.5 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors"
                >
                  Current Plan
                </button>
              </div>

              <div className="p-5 rounded-2xl border-2 border-black bg-neutral-50/50 flex flex-col justify-between relative">
                <span className="absolute -top-3 right-4 px-2 py-0.5 bg-black text-white rounded-full text-[10px] font-semibold tracking-wider uppercase">
                  Popular
                </span>
                <div>
                  <h3 className="font-semibold text-lg text-neutral-900 mb-1">Wandor Pass</h3>
                  <div className="text-2xl font-bold text-neutral-900 mb-3">
                    $9 <span className="text-xs font-normal text-neutral-500">/ month</span>
                  </div>
                  <ul className="text-xs text-neutral-600 space-y-2 mb-4">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Unlimited AI trip creations
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Offline map exports &amp; GPX
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Real-time flight &amp; weather re-routing
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    alert("Thank you for choosing Wandor Pass! 14-day free trial started.");
                    setActiveModal(null);
                  }}
                  className="w-full py-2.5 rounded-full bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Start 14-Day Free Trial
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQs Modal */}
      {activeModal === 'faqs' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500 hover:text-black cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-semibold text-wandor-text mb-2">Frequently Asked Questions</h2>
            <p className="text-sm text-wandor-muted mb-6">
              Everything you need to know about Wandor's personalized trip planning engine.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                <h4 className="text-sm font-semibold text-neutral-900 mb-1">
                  How does Wandor avoid crowds?
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Our system aggregates historical foot-traffic data, seasonal tourism trends, and local opening hours to route you to landmarks during their quietest hours—often dawn or twilight.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                <h4 className="text-sm font-semibold text-neutral-900 mb-1">
                  What files can I upload to the inspiration box?
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  You can upload screenshots of travel posts, photos of hand-written notes, restaurant reservations, or PDF flight confirmations. Wandor reads the details and weaves them seamlessly into your schedule.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                <h4 className="text-sm font-semibold text-neutral-900 mb-1">
                  Can I edit the generated itinerary?
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Yes, every day, stop, and cafe can be reordered, swapped for alternative recommendations, or exported directly to your favorite calendar or Google Maps.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {activeModal === 'login' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className="bg-white rounded-3xl max-w-sm w-full p-8 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500 hover:text-black cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-6">
              <span className="font-display text-3xl text-black">wandor</span>
              <h3 className="text-lg font-semibold text-neutral-900 mt-2">Welcome back</h3>
              <p className="text-xs text-neutral-500 mt-1">Sign in to access your saved trips</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Signed in successfully!");
                setActiveModal(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">Email address</label>
                <input
                  type="email"
                  required
                  placeholder="traveler@wandor.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-wandor-dark text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
