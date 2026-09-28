import React, { useState, useEffect } from 'react';
import { 
  getTests, 
  saveTest, 
  deleteTest, 
  getSubmissions, 
  getCurrentUser, 
  setCurrentUser, 
  getAppSettings, 
  saveAppSettings, 
  getTestByCode,
  generateTestCode
} from './utils/storage';
import { TestItem, StudentSubmission, User, AppSettings } from './types';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AITestGenerator } from './components/AITestGenerator';
import { TestEditor } from './components/TestEditor';
import { StudentTestRunner } from './components/StudentTestRunner';
import { StudentResultView } from './components/StudentResultView';
import { MyTestsView } from './components/MyTestsView';
import { ResultsView } from './components/ResultsView';
import { AnalyticsView } from './components/AnalyticsView';
import { SettingsView } from './components/SettingsView';
import { ShareModal } from './components/ShareModal';
import { PdfExportModal } from './components/PdfExportModal';
import { AuthModal } from './components/AuthModal';
import { EnterCodeModal } from './components/EnterCodeModal';

export default function App() {
  const [currentUser, setCurrentUserState] = useState<User | null>(() => getCurrentUser());
  const [appSettings, setAppSettingsState] = useState<AppSettings>(() => getAppSettings());
  const [tests, setTests] = useState<TestItem[]>(() => getTests());
  const [submissions, setSubmissions] = useState<StudentSubmission[]>(() => getSubmissions());

  // Navigation
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [activeTest, setActiveTest] = useState<TestItem | null>(null);
  const [activeSubmission, setActiveSubmission] = useState<StudentSubmission | null>(null);

  // Modals
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'login' | 'register' }>({
    open: false,
    mode: 'login',
  });
  const [enterCodeModalOpen, setEnterCodeModalOpen] = useState(false);
  const [shareModalTest, setShareModalTest] = useState<TestItem | null>(null);
  const [pdfModalTest, setPdfModalTest] = useState<TestItem | null>(null);
  const [selectedSubmissionInspect, setSelectedSubmissionInspect] = useState<StudentSubmission | null>(null);

  // Apply dark mode class to HTML element on mount and setting change
  useEffect(() => {
    if (appSettings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [appSettings.theme]);

  // Handle URL parameters (e.g. ?test=ET-48291)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const testCode = params.get('test');
    if (testCode) {
      const found = getTestByCode(testCode);
      if (found) {
        setActiveTest(found);
        setCurrentTab('take-test');
      } else {
        setEnterCodeModalOpen(true);
      }
    }
  }, []);

  // Update settings handler
  const handleUpdateSettings = (newSettings: AppSettings) => {
    setAppSettingsState(newSettings);
    saveAppSettings(newSettings);
  };

  // Update user handler
  const handleUpdateUser = (newUser: User) => {
    setCurrentUserState(newUser);
    setCurrentUser(newUser);
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentUserState(null);
    localStorage.removeItem('edutest_current_user_v1');
    setCurrentTab('landing');
  };

  // Auth success handler
  const handleAuthSuccess = (user: User) => {
    setCurrentUserState(user);
    setCurrentUser(user);
    setAuthModal({ open: false, mode: 'login' });
    if (user.role === 'teacher') {
      setCurrentTab('dashboard');
    } else {
      setCurrentTab('landing');
      setEnterCodeModalOpen(true);
    }
  };

  // Test generated from AI
  const handleTestGenerated = (newTest: TestItem) => {
    const saved = saveTest(newTest);
    setTests(getTests());
    setActiveTest(saved);
    setCurrentTab('edit-test');
  };

  // Test saved from editor
  const handleSaveTest = (updatedTest: TestItem) => {
    const saved = saveTest(updatedTest);
    setTests(getTests());
    setActiveTest(saved);
  };

  // Delete test
  const handleDeleteTest = (testId: string) => {
    deleteTest(testId);
    setTests(getTests());
  };

  // Duplicate test
  const handleDuplicateTest = (test: TestItem) => {
    const duplicate: TestItem = {
      ...test,
      id: `test-dup-${Date.now()}`,
      code: generateTestCode(),
      title: `${test.title} (Nusxa)`,
      createdAt: new Date().toISOString(),
      participantCount: 0,
    };
    saveTest(duplicate);
    setTests(getTests());
  };

  // Student test finish
  const handleFinishTest = (submission: StudentSubmission) => {
    setActiveSubmission(submission);
    setSubmissions(getSubmissions());
    setTests(getTests());
    setCurrentTab('student-result');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'dashboard' && currentUser?.role !== 'teacher') {
            setAuthModal({ open: true, mode: 'login' });
            return;
          }
          setCurrentTab(tab);
        }}
        appSettings={appSettings}
        onUpdateSettings={handleUpdateSettings}
        onOpenAuth={(mode) => setAuthModal({ open: true, mode })}
        onLogout={handleLogout}
        onOpenEnterCode={() => setEnterCodeModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Landing Page */}
        {currentTab === 'landing' && (
          <LandingPage
            language={appSettings.language}
            onStartFree={() => {
              if (currentUser?.role === 'teacher') {
                setCurrentTab('dashboard');
              } else {
                setAuthModal({ open: true, mode: 'register' });
              }
            }}
            onExploreDemo={() => {
              // Quick login as Teacher Aziza
              handleAuthSuccess({
                id: 'teacher-aziza',
                name: 'Aziza Karimova',
                email: 'aziza.karimova@maktab.uz',
                role: 'teacher',
                school: '178-sonli ixtisoslashtirilgan maktab',
                avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
              });
            }}
            onEnterCode={(code) => {
              if (code) {
                const found = getTestByCode(code);
                if (found) {
                  setActiveTest(found);
                  setCurrentTab('take-test');
                } else {
                  setEnterCodeModalOpen(true);
                }
              } else {
                setEnterCodeModalOpen(true);
              }
            }}
          />
        )}

        {/* Teacher Dashboard */}
        {currentTab === 'dashboard' && currentUser && (
          <TeacherDashboard
            currentUser={currentUser}
            tests={tests}
            submissions={submissions}
            onCreateTest={() => setCurrentTab('create-test')}
            onSelectTest={(t) => {
              setActiveTest(t);
              setCurrentTab('edit-test');
            }}
            onShareTest={(t) => setShareModalTest(t)}
            onExportPdf={(t) => setPdfModalTest(t)}
            onViewAllTests={() => setCurrentTab('my-tests')}
            onViewAllResults={() => setCurrentTab('results')}
            onViewSubmissionDetail={(sub) => {
              setSelectedSubmissionInspect(sub);
              setCurrentTab('results');
            }}
          />
        )}

        {/* AI Test Generator */}
        {currentTab === 'create-test' && (
          <AITestGenerator
            teacherId={currentUser?.id || 'teacher-default'}
            teacherName={currentUser?.name || 'Ustoz'}
            onTestGenerated={handleTestGenerated}
          />
        )}

        {/* Test Editor */}
        {currentTab === 'edit-test' && activeTest && (
          <TestEditor
            test={activeTest}
            onSave={handleSaveTest}
            onShare={(t) => setShareModalTest(t)}
            onExportPdf={(t) => setPdfModalTest(t)}
            onPreview={(t) => {
              setActiveTest(t);
              setCurrentTab('take-test');
            }}
            onBack={() => setCurrentTab('my-tests')}
          />
        )}

        {/* My Tests Library */}
        {currentTab === 'my-tests' && (
          <MyTestsView
            tests={tests}
            onCreateNew={() => setCurrentTab('create-test')}
            onEditTest={(t) => {
              setActiveTest(t);
              setCurrentTab('edit-test');
            }}
            onTakeTest={(t) => {
              setActiveTest(t);
              setCurrentTab('take-test');
            }}
            onShareTest={(t) => setShareModalTest(t)}
            onExportPdf={(t) => setPdfModalTest(t)}
            onDuplicateTest={handleDuplicateTest}
            onDeleteTest={handleDeleteTest}
          />
        )}

        {/* Student Test Runner */}
        {currentTab === 'take-test' && activeTest && (
          <StudentTestRunner
            test={activeTest}
            initialStudentName={currentUser?.role === 'student' ? currentUser.name : ''}
            initialStudentClass={currentUser?.role === 'student' ? currentUser.school : ''}
            onFinishTest={handleFinishTest}
            onExit={() => setCurrentTab(currentUser?.role === 'teacher' ? 'dashboard' : 'landing')}
          />
        )}

        {/* Student Result View */}
        {currentTab === 'student-result' && activeSubmission && activeTest && (
          <StudentResultView
            submission={activeSubmission}
            test={activeTest}
            onRetake={() => setCurrentTab('take-test')}
            onGoHome={() => setCurrentTab(currentUser?.role === 'teacher' ? 'dashboard' : 'landing')}
            onPrint={() => setPdfModalTest(activeTest)}
          />
        )}

        {/* Results Page */}
        {currentTab === 'results' && (
          <ResultsView
            submissions={submissions}
            selectedSubmission={selectedSubmissionInspect}
            onSelectSubmission={setSelectedSubmissionInspect}
          />
        )}

        {/* Analytics Page */}
        {currentTab === 'analytics' && (
          <AnalyticsView tests={tests} submissions={submissions} />
        )}

        {/* Settings Page */}
        {currentTab === 'settings' && (
          <SettingsView
            currentUser={currentUser}
            onUpdateUser={handleUpdateUser}
            appSettings={appSettings}
            onUpdateSettings={handleUpdateSettings}
          />
        )}
      </main>

      {/* Share Modal */}
      {shareModalTest && (
        <ShareModal
          test={shareModalTest}
          onClose={() => setShareModalTest(null)}
          onTakeTest={(t) => {
            setActiveTest(t);
            setCurrentTab('take-test');
          }}
        />
      )}

      {/* PDF Export Modal */}
      {pdfModalTest && (
        <PdfExportModal
          test={pdfModalTest}
          onClose={() => setPdfModalTest(null)}
        />
      )}

      {/* Auth Modal */}
      {authModal.open && (
        <AuthModal
          initialMode={authModal.mode}
          onClose={() => setAuthModal({ open: false, mode: 'login' })}
          onSuccess={handleAuthSuccess}
        />
      )}

      {/* Enter Test Code Modal */}
      {enterCodeModalOpen && (
        <EnterCodeModal
          onClose={() => setEnterCodeModalOpen(false)}
          onTestFound={(test) => {
            setActiveTest(test);
            setCurrentTab('take-test');
          }}
        />
      )}
    </div>
  );
}
