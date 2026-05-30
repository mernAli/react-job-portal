import api from "./api";

// ─── EMPLOYER ───────────────────────────────────────────

// GET /employer/interviews — fetch all scheduled interviews
export const fetchInterviews = async () => {
  // const response = await api.get("/employer/interviews");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          candidateName: "Sarah Johnson",
          position: "UI/UX Designer",
          date: "2026-05-05",
          time: "10:00 AM",
          duration: 60,
          platform: "Google Meet",
          meetingLink: "https://meet.google.com/abc-defg-hij",
          interviewerName: "HR Team",
          status: "Scheduled",
          notes: "Portfolio review required",
        },
        {
          id: 2,
          candidateName: "Mike Chen",
          position: "Backend Developer",
          date: "2026-05-06",
          time: "02:00 PM",
          duration: 45,
          platform: "Zoom",
          meetingLink: "https://zoom.us/j/123456789",
          interviewerName: "Tech Lead",
          status: "Confirmed",
          notes: "System design round",
        },
        {
          id: 3,
          candidateName: "Alex Kumar",
          position: "Senior React Developer",
          date: "2026-05-08",
          time: "11:00 AM",
          duration: 60,
          platform: "Microsoft Teams",
          meetingLink: "https://teams.microsoft.com/l/meetup",
          interviewerName: "Engineering Manager",
          status: "Scheduled",
          notes: "Live coding session",
        },
        {
          id: 4,
          candidateName: "John Doe",
          position: "Frontend Developer",
          date: "2026-04-28",
          time: "03:00 PM",
          duration: 30,
          platform: "Google Meet",
          meetingLink: "https://meet.google.com/xyz-uvwx-yz",
          interviewerName: "HR Team",
          status: "Completed",
          notes: "Initial screening done",
        },
        {
          id: 5,
          candidateName: "Priya Sharma",
          position: "UI/UX Designer",
          date: "2026-04-25",
          time: "10:30 AM",
          duration: 45,
          platform: "Zoom",
          meetingLink: "",
          interviewerName: "Design Lead",
          status: "Cancelled",
          notes: "Candidate withdrew",
        },
      ]);
    }, 800);
  });
};

// POST /employer/interviews — schedule a new interview
export const scheduleInterview = async (interviewData) => {
  // const response = await api.post("/employer/interviews", interviewData);
  // return response.data;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (interviewData.candidateName && interviewData.date && interviewData.time) {
        resolve({
          success: true,
          interview: {
            id: Date.now(),
            ...interviewData,
            status: "Scheduled",
            createdAt: new Date().toISOString(),
          },
        });
      } else {
        reject(new Error("Missing required interview fields"));
      }
    }, 1000);
  });
};

// PUT /employer/interviews/:id/status — update interview status
export const updateInterviewStatus = async (interviewId, status) => {
  // const response = await api.put(`/employer/interviews/${interviewId}/status`, { status });
  // return response.data;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (interviewId && status) {
        resolve({ success: true, interviewId, status });
      } else {
        reject(new Error("Invalid interview ID or status"));
      }
    }, 600);
  });
};

// ─── NEW (Day 44) ─────────────────────────────────────────
// GET /employer/interviews/reviews
// Returns completed interview records enriched with AI scores,
// dimension breakdown, violations, and report data.
// Used by the RecruiterReview dashboard.
// When the real backend is ready: uncomment the api.get line.
export const fetchInterviewReviews = async () => {
  // const response = await api.get("/employer/interviews/reviews");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          candidateName: "Sarah Johnson",
          initials: "SJ",
          position: "UI/UX Designer",
          interviewDate: "2026-05-05",
          interviewTime: "10:00 AM",
          duration: 58, // actual minutes
          platform: "Google Meet",
          interviewer: "HR Team",
          // AI scores
          overallScore: 82,
          verdictColor: "success",
          aiVerdict: "Strongly Recommended",
          confidence: "High",
          dimensions: [
            { label: "Communication", score: 88 },
            { label: "Technical Skill", score: 75 },
            { label: "Problem Solving", score: 84 },
            { label: "Behaviour",       score: 90 },
            { label: "Aptitude",        score: 78 },
          ],
          aiRemark:
            "Sarah demonstrated excellent communication and a strong design portfolio. " +
            "She handled behavioural questions with confidence. Minor gaps in technical " +
            "depth around design systems — recommend a focused follow-up.",
          // Integrity / compliance
          violations: 0,
          tabSwitches: 0,
          cameraOffEvents: 0,
          integrityStatus: "Clean",
          // Feedback
          recruiterFeedback: "",
          recruiterDecision: null, // null | "hire" | "hold" | "reject"
          // Video (mock URL — replace with signed S3/GCS URL)
          videoUrl: null,
          hasVideo: true,
          highlights: [
            { time: "02:14", label: "Strong opening introduction" },
            { time: "08:45", label: "Excellent portfolio walkthrough" },
            { time: "21:30", label: "Handled pressure question well" },
          ],
        },
        {
          id: 2,
          candidateName: "Mike Chen",
          initials: "MC",
          position: "Backend Developer",
          interviewDate: "2026-05-06",
          interviewTime: "02:00 PM",
          duration: 44,
          platform: "Zoom",
          interviewer: "Tech Lead",
          overallScore: 91,
          verdictColor: "success",
          aiVerdict: "Strongly Recommended",
          confidence: "High",
          dimensions: [
            { label: "Communication", score: 80 },
            { label: "Technical Skill", score: 96 },
            { label: "Problem Solving", score: 93 },
            { label: "Behaviour",       score: 85 },
            { label: "Aptitude",        score: 94 },
          ],
          aiRemark:
            "Mike showed outstanding technical depth, especially in distributed systems " +
            "and API design. Problem-solving approach was methodical and clear. " +
            "Highly recommended for the senior backend role.",
          violations: 0,
          tabSwitches: 0,
          cameraOffEvents: 0,
          integrityStatus: "Clean",
          recruiterFeedback: "",
          recruiterDecision: null,
          videoUrl: null,
          hasVideo: true,
          highlights: [
            { time: "05:10", label: "Detailed system design explanation" },
            { time: "15:22", label: "Live coding — optimal solution" },
            { time: "38:05", label: "Strong closing questions to interviewer" },
          ],
        },
        {
          id: 3,
          candidateName: "Alex Kumar",
          initials: "AK",
          position: "Senior React Developer",
          interviewDate: "2026-05-08",
          interviewTime: "11:00 AM",
          duration: 61,
          platform: "Microsoft Teams",
          interviewer: "Engineering Manager",
          overallScore: 67,
          verdictColor: "warning",
          aiVerdict: "Needs Review",
          confidence: "Medium",
          dimensions: [
            { label: "Communication", score: 72 },
            { label: "Technical Skill", score: 65 },
            { label: "Problem Solving", score: 60 },
            { label: "Behaviour",       score: 74 },
            { label: "Aptitude",        score: 63 },
          ],
          aiRemark:
            "Alex has solid React fundamentals but struggled with advanced patterns " +
            "and performance optimisation questions. Communication was adequate. " +
            "Suggest a second technical round before making a final decision.",
          violations: 2,
          tabSwitches: 2,
          cameraOffEvents: 0,
          integrityStatus: "Minor Flags",
          recruiterFeedback: "",
          recruiterDecision: null,
          videoUrl: null,
          hasVideo: true,
          highlights: [
            { time: "04:30", label: "Good React hooks explanation" },
            { time: "22:10", label: "Tab switch detected — flagged" },
            { time: "45:00", label: "Struggled with virtualisation Q" },
          ],
        },
        {
          id: 4,
          candidateName: "Emily Davis",
          initials: "ED",
          position: "Product Manager",
          interviewDate: "2026-04-28",
          interviewTime: "03:00 PM",
          duration: 29,
          platform: "Google Meet",
          interviewer: "HR Team",
          overallScore: 48,
          verdictColor: "danger",
          aiVerdict: "Not Recommended",
          confidence: "High",
          dimensions: [
            { label: "Communication", score: 55 },
            { label: "Technical Skill", score: 38 },
            { label: "Problem Solving", score: 45 },
            { label: "Behaviour",       score: 52 },
            { label: "Aptitude",        score: 50 },
          ],
          aiRemark:
            "Emily's responses lacked depth and demonstrated limited understanding " +
            "of product lifecycle management. Multiple integrity flags were detected. " +
            "Not recommended for this role at this stage.",
          violations: 4,
          tabSwitches: 3,
          cameraOffEvents: 1,
          integrityStatus: "Critical Flags",
          recruiterFeedback: "",
          recruiterDecision: null,
          videoUrl: null,
          hasVideo: true,
          highlights: [
            { time: "03:00", label: "Vague answer on roadmap priorities" },
            { time: "11:45", label: "Camera off — flagged" },
            { time: "18:30", label: "3 tab switches detected" },
          ],
        },
      ]);
    }, 900);
  });
};
// ──────────────────────────────────────────────────────────