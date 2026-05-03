const EVENT_POOL = [
  {
    type: "notification",
    payload: {
      notifType: "status_update",
      title: "Application Shortlisted",
      message: "Arjun Menon was shortlisted for Frontend Developer.",
    },
  },
  {
    type: "interview_status",
    payload: {
      applicationId: "app_101",
      candidateName: "Arjun Menon",
      status: "Shortlisted",
      role: "Frontend Developer",
    },
  },
  {
    type: "activity",
    payload: {
      actor: "System",
      action: "New application received",
      detail: "React Native Developer – Kozhikode",
    },
  },
  {
    type: "notification",
    payload: {
      notifType: "success",
      title: "Interview Scheduled",
      message: "Interview with Sneha Nair confirmed for Friday 10 AM.",
    },
  },
  {
    type: "interview_status",
    payload: {
      applicationId: "app_202",
      candidateName: "Sneha Nair",
      status: "Interview Scheduled",
      role: "Node.js Developer",
    },
  },
  {
    type: "activity",
    payload: {
      actor: "Employer",
      action: "Reviewed candidate profile",
      detail: "Rahul's resume was opened",
    },
  },
  {
    type: "notification",
    payload: {
      notifType: "info",
      title: "New Job Match",
      message: "A new MERN Stack job matches your profile.",
    },
  },
  {
    type: "activity",
    payload: {
      actor: "Candidate",
      action: "Applied for a job",
      detail: "UI/UX Designer at Creative Studio",
    },
  },
];

export class MockWebSocket {
  constructor(url) {
    this.url = url;
    this.readyState = 0; // CONNECTING
    this.onopen = null;
    this.onmessage = null;
    this.onclose = null;
    this.onerror = null;
    this._intervals = [];

    this._connectTimeout = setTimeout(() => {
      this.readyState = 1; // OPEN
      this.onopen?.({ type: "open" });
      this._startEmitting();
    }, 800);
  }

  _startEmitting() {
    let index = 0;
    const interval = setInterval(() => {
      if (this.readyState !== 1) return;

      const event = EVENT_POOL[index % EVENT_POOL.length];
      const freshEvent = {
        ...event,
        payload: {
          ...event.payload,
          id: Date.now(),
          timestamp: new Date().toISOString(),
        },
      };

      this.onmessage?.({ data: JSON.stringify(freshEvent) });
      index++;
    }, 5000);

    this._intervals.push(interval);
  }

  send(data) {
    console.log("[MockWebSocket] send:", data);
  }

  close() {
    this.readyState = 3; // CLOSED
    clearTimeout(this._connectTimeout);
    this._intervals.forEach(clearInterval);
    this._intervals = [];
    this.onclose?.({ type: "close", code: 1000 });
  }
}