/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveModule, CommunityQuestion } from './types';
import { 
  CURRENT_STUDENT, 
  ROADMAP_STEPS, 
  CONTEXTUAL_DOCUMENTS, 
  EXAMINER_PERSONAS, 
  ORAL_EXAM_QUESTIONS, 
  COMMUNITY_QUESTIONS, 
  NOTIFICATIONS 
} from './data/mockData';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardModule } from './components/modules/DashboardModule';
import { RoadmapModule } from './components/modules/RoadmapModule';
import { OralExamModule } from './components/modules/OralExamModule';
import { EssayAssistantModule } from './components/modules/EssayAssistantModule';
import { CommunityModule } from './components/modules/CommunityModule';
import { MaterialsModule } from './components/modules/MaterialsModule';
import { SearchModal } from './components/modals/SearchModal';
import { NewQuestionModal } from './components/modals/NewQuestionModal';

export default function App() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isNewQuestionModalOpen, setIsNewQuestionModalOpen] = useState(false);

  // Subject state
  const subjects = [
    'Triết học Mác - Lênin (PHI1006)',
    'Cơ sở lý luận truyền thông (COMM101)',
    'Tâm lý học đại cương (PSY1001)',
    'Lịch sử văn minh thế giới (HIS1002)',
  ];
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

  // Roadmap active step state
  const [selectedStepId, setSelectedStepId] = useState(3);

  // Community questions state
  const [communityQuestions, setCommunityQuestions] = useState<CommunityQuestion[]>(COMMUNITY_QUESTIONS);

  const handleAddNewQuestion = (newQ: CommunityQuestion) => {
    setCommunityQuestions([newQ, ...communityQuestions]);
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F0E6] text-[#222222] flex overflow-hidden font-sans">
      {/* Left Column: Collapsible Sidebar Navigation */}
      <Sidebar
        activeModule={activeModule}
        onSelectModule={(module) => setActiveModule(module)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Right Column: Main Workspace Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto bg-[#F5F0E6] relative">
        {/* Sticky Top Header Bar with Global Search and Student Profile */}
        <Header
          student={CURRENT_STUDENT}
          notifications={NOTIFICATIONS}
          onOpenSearch={() => setIsSearchModalOpen(true)}
          selectedSubject={selectedSubject}
          onChangeSubject={(sub) => setSelectedSubject(sub)}
          subjects={subjects}
        />

        {/* Fluid Container scaling between 1140px and 1280px */}
        <main className="flex-1 w-full max-w-[1280px] mx-auto px-6 py-6 transition-all">
          {activeModule === 'dashboard' && (
            <DashboardModule
              student={CURRENT_STUDENT}
              currentRoadmapStep={ROADMAP_STEPS[2]}
              onNavigate={(mod) => setActiveModule(mod)}
              onSelectStep={(stepId) => {
                setSelectedStepId(stepId);
                setActiveModule('roadmap');
              }}
            />
          )}

          {activeModule === 'roadmap' && (
            <RoadmapModule
              steps={ROADMAP_STEPS}
              documents={CONTEXTUAL_DOCUMENTS}
              selectedStepId={selectedStepId}
              onSelectStep={(stepId) => setSelectedStepId(stepId)}
              onNavigate={(mod) => setActiveModule(mod)}
            />
          )}

          {activeModule === 'oral-exam' && (
            <OralExamModule
              personas={EXAMINER_PERSONAS}
              questions={ORAL_EXAM_QUESTIONS}
            />
          )}

          {activeModule === 'essay-assistant' && (
            <EssayAssistantModule />
          )}

          {activeModule === 'community' && (
            <CommunityModule
              questions={communityQuestions}
              onOpenNewQuestion={() => setIsNewQuestionModalOpen(true)}
            />
          )}

          {activeModule === 'materials' && (
            <MaterialsModule />
          )}
        </main>
      </div>

      {/* Global Search Modal (Ctrl + K) */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onNavigate={(mod) => setActiveModule(mod)}
      />

      {/* New Question Modal */}
      <NewQuestionModal
        isOpen={isNewQuestionModalOpen}
        onClose={() => setIsNewQuestionModalOpen(false)}
        onSubmit={handleAddNewQuestion}
      />
    </div>
  );
}
