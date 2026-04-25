import api from "./api";

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