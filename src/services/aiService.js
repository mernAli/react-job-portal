import api from "./api";

// ─── CANDIDATE AI ─────────────────────────────────────────

// GET /ai/candidate/profile-score
// Overall AI score + dimension breakdown for the logged-in candidate
export const fetchCandidateAIScore = async () => {
  // const response = await api.get("/ai/candidate/profile-score");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        overallScore: 78,
        trend: "+5",
        trendDirection: "up",
        confidence: "High",
        lastUpdated: "2026-04-26",
        dimensions: [
          { label: "Technical Skills",    score: 85, maxScore: 100 },
          { label: "Communication",       score: 72, maxScore: 100 },
          { label: "Profile Completeness",score: 90, maxScore: 100 },
          { label: "Experience Match",    score: 68, maxScore: 100 },
          { label: "Cultural Fit",        score: 74, maxScore: 100 },
        ],
      });
    }, 900);
  });
};

// GET /ai/candidate/interview-progress
// Interview rounds + AI remark per round
export const fetchInterviewProgress = async () => {
  // const response = await api.get("/ai/candidate/interview-progress");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          round: "Screening Call",
          company: "Tech Solutions Inc.",
          position: "Senior React Developer",
          date: "2026-04-10",
          status: "Completed",
          aiScore: 82,
          aiRemark: "Strong communication and clear articulation of past projects. Demonstrated good problem-solving approach.",
          confidence: "High",
        },
        {
          id: 2,
          round: "Technical Round",
          company: "Tech Solutions Inc.",
          position: "Senior React Developer",
          date: "2026-04-18",
          status: "Completed",
          aiScore: 74,
          aiRemark: "Solid React fundamentals. System design answers were adequate but lacked depth on scalability considerations.",
          confidence: "Medium",
        },
        {
          id: 3,
          round: "HR Round",
          company: "Tech Solutions Inc.",
          position: "Senior React Developer",
          date: "2026-05-02",
          status: "Scheduled",
          aiScore: null,
          aiRemark: "Interview not yet completed. AI analysis will be available after the session.",
          confidence: null,
        },
        {
          id: 4,
          round: "Screening Call",
          company: "StartupXYZ",
          position: "Frontend Engineer",
          date: "2026-04-22",
          status: "Completed",
          aiScore: 91,
          aiRemark: "Exceptional cultural alignment and enthusiasm. Technical depth was well above average for this role.",
          confidence: "High",
        },
      ]);
    }, 1000);
  });
};

// GET /ai/candidate/remarks
// Top AI-generated improvement suggestions for the candidate
export const fetchCandidateAIRemarks = async () => {
  // const response = await api.get("/ai/candidate/remarks");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          type: "strength",
          icon: "💪",
          title: "Strong Technical Foundation",
          detail: "Your React and JavaScript scores are in the top 20% of candidates applying for similar roles.",
          action: "Leverage this in interviews by preparing 2–3 detailed project walkthroughs.",
          priority: "High",
        },
        {
          id: 2,
          type: "improvement",
          icon: "📈",
          title: "Improve System Design Responses",
          detail: "AI detected that your system design answers in technical rounds score 18 points below your other areas.",
          action: "Practice scalability and database design questions on platforms like Educative.io.",
          priority: "High",
        },
        {
          id: 3,
          type: "improvement",
          icon: "📝",
          title: "Profile Summary Missing",
          detail: "Your profile currently has no About section, which reduces recruiter engagement by an estimated 40%.",
          action: "Add a 3–4 sentence professional summary to your profile.",
          priority: "Medium",
        },
        {
          id: 4,
          type: "strength",
          icon: "🎯",
          title: "High Cultural Fit Score",
          detail: "Based on your responses and profile, you align well with startup and product-focused companies.",
          action: "Prioritize applications to Series A–B startups for highest success rate.",
          priority: "Medium",
        },
      ]);
    }, 800);
  });
};

// ─── EMPLOYER AI ──────────────────────────────────────────

// GET /ai/employer/candidate-scores
// AI score cards for all candidates who applied to employer's jobs
export const fetchCandidateScoreCards = async () => {
  // const response = await api.get("/ai/employer/candidate-scores");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          candidateName: "Sarah Johnson",
          position: "UI/UX Designer",
          overallScore: 91,
          dimensions: [
            { label: "Technical",    score: 88 },
            { label: "Communication",score: 95 },
            { label: "Experience",   score: 90 },
            { label: "Culture Fit",  score: 92 },
          ],
          aiVerdict: "Strongly Recommended",
          verdictColor: "success",
          aiRemark: "Exceptional portfolio quality and communication skills. Experience closely matches the role requirements.",
          confidence: "High",
          interviewsCompleted: 2,
          status: "Shortlisted",
        },
        {
          id: 2,
          candidateName: "Mike Chen",
          position: "Backend Developer",
          overallScore: 76,
          dimensions: [
            { label: "Technical",    score: 82 },
            { label: "Communication",score: 68 },
            { label: "Experience",   score: 78 },
            { label: "Culture Fit",  score: 72 },
          ],
          aiVerdict: "Recommended",
          verdictColor: "info",
          aiRemark: "Good technical depth. Communication could be stronger. Would benefit from a structured interview round.",
          confidence: "Medium",
          interviewsCompleted: 1,
          status: "Interview Scheduled",
        },
        {
          id: 3,
          candidateName: "Alex Kumar",
          position: "Senior React Developer",
          overallScore: 84,
          dimensions: [
            { label: "Technical",    score: 90 },
            { label: "Communication",score: 80 },
            { label: "Experience",   score: 85 },
            { label: "Culture Fit",  score: 78 },
          ],
          aiVerdict: "Strongly Recommended",
          verdictColor: "success",
          aiRemark: "Strong React expertise with solid system design knowledge. High potential for senior-level contribution.",
          confidence: "High",
          interviewsCompleted: 0,
          status: "Under Review",
        },
        {
          id: 4,
          candidateName: "Emily Davis",
          position: "Product Manager",
          overallScore: 58,
          dimensions: [
            { label: "Technical",    score: 52 },
            { label: "Communication",score: 70 },
            { label: "Experience",   score: 55 },
            { label: "Culture Fit",  score: 60 },
          ],
          aiVerdict: "Needs Review",
          verdictColor: "warning",
          aiRemark: "Below average technical alignment for this role. Communication is a strength but experience gap is notable.",
          confidence: "Medium",
          interviewsCompleted: 0,
          status: "Under Review",
        },
        {
          id: 5,
          candidateName: "Priya Sharma",
          position: "UI/UX Designer",
          overallScore: 69,
          dimensions: [
            { label: "Technical",    score: 65 },
            { label: "Communication",score: 75 },
            { label: "Experience",   score: 62 },
            { label: "Culture Fit",  score: 80 },
          ],
          aiVerdict: "Recommended",
          verdictColor: "info",
          aiRemark: "Good cultural alignment and communication. Portfolio could be stronger but shows growth potential.",
          confidence: "Medium",
          interviewsCompleted: 0,
          status: "Under Review",
        },
      ]);
    }, 1100);
  });
};

// GET /ai/employer/hiring-insights
// Top-level AI recommendations for the employer's hiring process
export const fetchHiringInsights = async () => {
  // const response = await api.get("/ai/employer/hiring-insights");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          type: "recommendation",
          icon: "🏆",
          title: "Top Match Identified",
          detail: "Sarah Johnson scores 91/100 for the UI/UX Designer role — 23 points above the average applicant.",
          action: "Move to offer stage",
          priority: "High",
        },
        {
          id: 2,
          type: "warning",
          icon: "⚠️",
          title: "Talent Pool Thinning",
          detail: "Only 3 of 6 applicants for Senior React Developer meet the minimum AI threshold of 70.",
          action: "Broaden job description requirements",
          priority: "High",
        },
        {
          id: 3,
          type: "insight",
          icon: "📊",
          title: "Interview Conversion Rate",
          detail: "Your current screening-to-interview rate is 28%, which is 12% below the industry average of 40%.",
          action: "Review screening criteria",
          priority: "Medium",
        },
        {
          id: 4,
          type: "insight",
          icon: "⏱",
          title: "Time-to-Hire Increasing",
          detail: "Average time to hire has grown from 14 to 22 days this month. Two shortlisted candidates have gone silent.",
          action: "Follow up with shortlisted candidates",
          priority: "Medium",
        },
      ]);
    }, 800);
  });
};