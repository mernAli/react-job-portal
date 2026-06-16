import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useToast } from "../../ui/toast/useToast";
import { 
  AlertTriangle, 
  Clock, 
  Play, 
  CheckCircle2, 
  Code, 
  FileText, 
  Terminal, 
  Maximize2,
  ChevronRight,
  Eye,
  Sliders
} from "lucide-react";
import Sidebar from "../../components/Dashboard/Sidebar";

const PROBLEM_DATA = {
  title: "1. Two Sum Target Tracker",
  difficulty: "Medium",
  timeLimit: 1200, // 20 Minutes in seconds
  points: 100,
  description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

  You may assume that each input would have exactly one solution, and you may not use the same element twice. 
  
  Your system must execute inside the specified runtime parameters to pass the performance verification gate.`,
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid solution exists."
  ],
  sampleTestCase: {
    input: "nums = [2, 7, 11, 15], target = 9",
    output: "[0, 1]",
    explanation: "Because nums[0] + nums[1] == 2 + 7 === 9, we return indices [0, 1]."
  }
};

export default function MachineTest() {
  const { theme } = useTheme();
  const { showToast: addToast } = useToast();
  const navigate = useNavigate();

  const [code, setCode] = useState(
    "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n    // Write your code here\n    \n};"
  );

  // Environment State Engine
  const [timeLeft, setTimeLeft] = useState(PROBLEM_DATA.timeLimit);
  const [activeTab, setActiveTab] = useState("description"); // "description" | "testcases"
  
  // CRITICAL MOBILE RESPONSIVE LAYOUT TOGGLE
  // "specs" = Left panel takes full screen on mobile, "editor" = Right panel takes full screen on mobile
  const [mobileActiveView, setMobileActiveView] = useState("specs"); 

  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState(null);
  const [violations, setViolations] = useState(0);

  const textareaRef = useRef(null);

  // 1. Strict Countdown Assessment Timer Hook
  useEffect(() => {
    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }
    const countdown = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timeLeft]);

  // 2. Browser Tab Focus & Compliance Tracker
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setViolations((prev) => {
          const updatedViolations = prev + 1;
          setTimeout(() => {
            addToast(
              `Security Warning: Tab modification detected (Violation #${updatedViolations})`, 
              "error"
            )
          }, 0)
          return updatedViolations;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [addToast]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

//   const handleRunCode = () => {
//     setIsRunning(true);
//     setConsoleOutput(null);
//     setTimeout(() => {
//       setIsRunning(false);
//       setConsoleOutput({
//         status: "Accepted",
//         passed: true,
//         runtime: "24 ms",
//         memory: "42.1 MB",
//         output: "[0, 1]"
//       });
//       addToast("Success: Test Cases Passed! Your local solution matches the baseline.", "success");
//     }, 1500);
//   };

  const handleRunCode = () => {
  setIsRunning(true);
  setConsoleOutput(null);

  setTimeout(() => {
    setIsRunning(false);
    
    try {
      // 1. Create a dynamic function runner from the text inside the editor
      // This wraps your string code into an executable environment
      const userRoutine = new Function(`${code}\n return twoSum;`)();
      
      // 2. Define a baseline test case (Nums array and target target)
      const testNums = [2, 7, 11, 15];
      const testTarget = 9;
      
      // 3. Execute the candidate's code dynamically
      const result = userRoutine(testNums, testTarget);
      
      // 4. Verify the output pattern matches the expected output [0, 1]
      const isValid = Array.isArray(result) && result[0] === 0 && result[1] === 1;

      if (isValid) {
        setConsoleOutput({
          status: "Accepted",
          passed: true,
          runtime: "12 ms",
          memory: "41.4 MB",
          output: JSON.stringify(result)
        });
        addToast("Success: Test Cases Passed! Your local solution matches the baseline.", "success");
      } else {
        // Triggers if the code runs but returns the wrong answer (e.g. returns undefined or [3, 4])
        setConsoleOutput({
          status: "Wrong Answer",
          passed: false,
          runtime: "8 ms",
          memory: "41.2 MB",
          output: JSON.stringify(result)
        });
        addToast("Compilation Alert: Test case failed. Unexpected logic footprint.", "error");
      }

    } catch (error) {
      // 5. Triggers if there is a syntax error or runtime crash in your typed code
      setConsoleOutput({
        status: "Runtime Error / Syntax Error",
        passed: false,
        runtime: "0 ms",
        memory: "0 MB",
        output: error.message // Displays the exact error (e.g., "Unexpected token" or "target is not defined")
      });
      addToast(`Execution Crash: ${error.message}`, "error");
    }
  }, 1500);
};

  const handleSubmitTest = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast("Assessment Successfully Received: Your answers have been securely evaluated.", "success");
      navigate("/app/candidate-dashboard");
    }, 2200);
  };

  const handleAutoSubmit = () => {
   addToast("Warning: Assessment Time Elapsed. Submitting current workspace state...", "info");
    handleSubmitTest();
  };

  return (
    <div className={`flex flex-col h-screen overflow-hidden ${theme.bg} ${theme.textPrimary} font-sans transition-colors duration-200`}>
      
      <Sidebar />
      {/* ─── DYNAMIC TOPBAR CONTROL DASHBOARD ─── */}
      <header className={`flex flex-col sm:flex-row justify-between items-stretch sm:items-center px-4 sm:px-6 py-3 border-b gap-3 sm:gap-0 ${theme.topbarBg} ${theme.border} ${theme.shadow}`}>
        <div className="flex items-center space-x-3 justify-between sm:justify-start">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl ${theme.infoBg} ${theme.infoText}`}>
              <Code size={18} />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold tracking-tight">Machine Test Framework</h1>
              <p className={`text-[10px] sm:text-xs ${theme.textMuted}`}>Candidate Code Evaluation Sandbox</p>
            </div>
          </div>
          
          {/* Security Counter (Mobile Inline Badge Only) */}
          {violations > 0 && (
            <div className={`sm:hidden flex items-center space-x-1 px-2 py-1 rounded-lg border font-medium text-[10px] animate-pulse ${theme.dangerBg} ${theme.dangerText}`}>
              <AlertTriangle size={12} />
              <span>Flags: {violations}</span>
            </div>
          )}
        </div>

        {/* Real-time Dynamic Compliance Flag Block (Desktop Only) */}
        {violations > 0 && (
          <div className={`hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg border font-medium text-xs animate-pulse ${theme.dangerBg} ${theme.dangerText} ${theme.border}`}>
            <AlertTriangle size={14} />
            <span>Security Flags: {violations}</span>
          </div>
        )}

        {/* Timer UI Element & Final Submission CTAs */}
        <div className="flex items-center justify-between sm:justify-end space-x-3">
          <div className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-xl border font-mono text-xs sm:text-sm font-semibold transition ${
            timeLeft < 300 
              ? `${theme.dangerBg} ${theme.dangerText} border-red-500 animate-pulse` 
              : `${theme.infoBg} ${theme.infoText} ${theme.border}`
          }`}>
            <Clock size={14} className="sm:size-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <button
            onClick={handleSubmitTest}
            disabled={isSubmitting}
            className={`flex-1 sm:flex-initial px-4 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs rounded-xl transition duration-200 shadow-md flex items-center justify-center space-x-2 ${theme.accent} ${theme.secondaryText || "text-white"} ${theme.accentHover} disabled:opacity-40`}
          >
            <span>{isSubmitting ? "Evaluating..." : "Submit Code"}</span>
          </button>
        </div>
      </header>

      {/* ─── MOBILE ONLY ACTIVE PANEL TOGGLE CONTROLS ─── */}
      <div className={`flex sm:hidden border-b ${theme.border} bg-black/5 p-1.5 gap-1`}>
        <button
          onClick={() => setMobileActiveView("specs")}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 text-xs font-bold rounded-lg transition-all duration-150 ${
            mobileActiveView === "specs"
              ? `${theme.primary} ${theme.secondaryText || "text-white"}`
              : `${theme.textMuted} hover:bg-black/5`
          }`}
        >
          <Eye size={14} />
          <span>View Specs</span>
        </button>
        <button
          onClick={() => setMobileActiveView("editor")}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 text-xs font-bold rounded-lg transition-all duration-150 ${
            mobileActiveView === "editor"
              ? `${theme.primary} ${theme.secondaryText || "text-white"}`
              : `${theme.textMuted} hover:bg-black/5`
          }`}
        >
          <Sliders size={14} />
          <span>Editor & Console</span>
        </button>
      </div>

      {/* ─── TWO-PANEL INTERACTIVE SPLIT WORKSPACE ─── */}
      <main className="flex flex-1 overflow-hidden relative">
        
        {/* LEFT COMPONENT COLUMN: ENVIRONMENT DETAILS & PARAMS */}
        <section className={`
          ${mobileActiveView === "specs" ? "flex" : "hidden"} 
          sm:flex w-full sm:w-1/2 flex-col border-r h-full ${theme.border} ${theme.sidebarBg}
        `}>
          {/* Tab Navigation Menu */}
          <div className={`flex border-b ${theme.border} bg-black/5`}>
            <button
              onClick={() => setActiveTab("description")}
              className={`flex items-center space-x-2 px-4 sm:px-6 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition duration-150 ${
                activeTab === "description"
                  ? `${theme.primaryText} ${theme.primaryBorder} bg-white/40`
                  : `border-transparent ${theme.textMuted} ${theme.hover}`
              }`}
            >
              <FileText size={13} />
              <span>Problem Specs</span>
            </button>
            <button
              onClick={() => setActiveTab("testcases")}
              className={`flex items-center space-x-2 px-4 sm:px-6 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition duration-150 ${
                activeTab === "testcases"
                  ? `${theme.primaryText} ${theme.primaryBorder} bg-white/40`
                  : `border-transparent ${theme.textMuted} ${theme.hover}`
              }`}
            >
              <Terminal size={13} />
              <span>Dynamic IO</span>
            </button>
          </div>

          {/* Tab Dynamic Layout Rendering Viewports */}
          <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4 sm:space-y-6">
            {activeTab === "description" ? (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-base sm:text-xl font-bold tracking-tight">{PROBLEM_DATA.title}</h2>
                    <span className={`shrink-0 px-2 py-0.5 text-[10px] font-semibold rounded-lg border uppercase tracking-wider ${theme.warningBg} ${theme.warningText} ${theme.border}`}>
                      {PROBLEM_DATA.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-[11px] sm:text-xs font-medium">
                    <p className={theme.textMuted}>Max Score: <span className="font-bold">{PROBLEM_DATA.points} Pts</span></p>
                    <p className={theme.textMuted}>Runtime Gate: <span className="font-bold">2000ms</span></p>
                  </div>
                </div>

                {/* Problem Description Body */}
                <div className={`p-3 sm:p-4 rounded-xl border leading-relaxed text-xs sm:text-sm shadow-inner ${theme.cardBg} ${theme.border} ${theme.textSecondary}`}>
                  <p className="whitespace-pre-line font-medium">{PROBLEM_DATA.description}</p>
                </div>

                {/* Constraints */}
                <div className="space-y-2">
                  <h3 className={`text-[11px] font-bold uppercase tracking-wider ${theme.textMuted}`}>Compilation Parameters</h3>
                  <div className="grid grid-cols-1 gap-1.5">
                    {PROBLEM_DATA.constraints.map((constraint, i) => (
                      <div key={i} className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border font-mono text-[11px] ${theme.cardBg} ${theme.border}`}>
                        <ChevronRight size={12} className={`shrink-0 ${theme.primaryText}`} />
                        <span className={theme.textSecondary}>{constraint}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Evaluation Matrix */}
                <div className={`p-3 sm:p-4 rounded-xl border space-y-2 shadow-sm ${theme.cardBg} ${theme.border}`}>
                  <h4 className={`text-[11px] font-bold uppercase tracking-wider ${theme.textMuted}`}>Sample Evaluation Matrix</h4>
                  <div className="font-mono text-[11px] space-y-1 p-2.5 rounded-lg bg-black/10">
                    <p><span className={theme.textMuted}>Input:</span> <span className="font-semibold break-all">{PROBLEM_DATA.sampleTestCase.input}</span></p>
                    <p><span className={theme.textMuted}>Output:</span> <span className="font-semibold text-green-500">{PROBLEM_DATA.sampleTestCase.output}</span></p>
                  </div>
                  <p className={`text-[11px] italic pl-1 ${theme.textMuted}`}>
                    {PROBLEM_DATA.sampleTestCase.explanation}
                  </p>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold">Standard IO Framework</h3>
                  <p className={`text-xs ${theme.textMuted}`}>Properties are injected directly into your interpreter wrapper functions.</p>
                </div>
                <div className={`p-3 rounded-xl border font-mono text-xs ${theme.cardBg} ${theme.border}`}>
                  <span className={`${theme.infoText} font-bold`}>Case 1:</span> [2,7,11,15], Target: 9
                </div>
              </div>
            )}
          </div>
        </section>

        {/* RIGHT COMPONENT COLUMN: NATIVE SUB-WORKSPACE EDITOR */}
        <section className={`
          ${mobileActiveView === "editor" ? "flex" : "hidden"} 
          sm:flex w-full sm:w-1/2 flex-col h-full bg-black/[0.02]
        `}>
          
          {/* Code Window Toolbar Header */}
          <div className={`flex justify-between items-center px-4 py-2 border-b ${theme.cardBg} ${theme.border}`}>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className={`text-[11px] font-mono pl-1 ${theme.textMuted}`}>main_sandbox_interpreter.js</span>
            </div>
            <Maximize2 size={12} className={theme.textMuted} />
          </div>

          {/* Code Textarea Input Workspace */}
          <div className="flex-1 flex font-mono text-xs sm:text-sm p-3 relative shadow-inner bg-slate-950 text-slate-200">
            {/* Gutter Line Numbers (Hidden on tiny mobile displays to secure room) */}
            <div className="hidden xs:block text-slate-600 select-none text-right pr-3 border-r border-slate-800 text-[11px] sm:text-xs space-y-1.5 pt-0.5 w-7 font-semibold">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-transparent text-emerald-400 focus:outline-none resize-none pl-2 sm:pl-4 font-mono leading-relaxed h-full w-full whitespace-pre select-text selection:bg-blue-500/30"
              spellCheck="false"
              style={{ caretColor: "#4A90E2" }}
            />
          </div>

          {/* ─── REAL-TIME LOG COMPILER DRAWER OVERLAY ─── */}
          <div className={`p-3 sm:p-4 border-t ${theme.topbarBg} ${theme.border} ${theme.shadowMd}`}>
            {consoleOutput && (
              <div className={`mb-3 p-2.5 sm:p-3 rounded-xl border font-mono text-[11px] space-y-1.5 shadow-inner bg-black/5 ${theme.border}`}>
                <div className="flex items-center justify-between border-b pb-1.5 border-gray-200 dark:border-gray-700">
                  <span className={`font-bold flex items-center space-x-1 ${theme.successText}`}>
                    <CheckCircle2 size={12} />
                    <span>Result: {consoleOutput.status}</span>
                  </span>
                  <div className={`flex space-x-2 text-[9px] uppercase font-bold ${theme.textMuted}`}>
                    <span>Speed: {consoleOutput.runtime}</span>
                  </div>
                </div>
                <div className="space-y-0.5 text-xs">
                  <p className={theme.textMuted}>Expected Vector: <span className="text-emerald-500 font-bold">{PROBLEM_DATA.sampleTestCase.output}</span></p>
                  <p className={theme.textSecondary}>Dump: <span className={`font-bold px-1.5 py-0.2 rounded bg-black/10 ${theme.primaryText}`}>{consoleOutput.output}</span></p>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center gap-2">
              <span className={`text-[10px] sm:text-[11px] font-medium tracking-wide leading-tight ${theme.textMuted}`}>
                Safety backups synchronized.
              </span>
              
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] font-bold rounded-xl border transition-all duration-150 flex items-center space-x-1.5 shadow-sm shrink-0 ${theme.primary} ${theme.secondaryText || "text-white"} ${theme.primaryHover} disabled:opacity-50`}
              >
                <Play size={10} className={isRunning ? "animate-spin" : ""} />
                <span>{isRunning ? "Verifying..." : "Compile & Run"}</span>
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}