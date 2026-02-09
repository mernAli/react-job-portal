import { useEffect, useState } from "react";
import { fetchJobs } from "../services/JobService.js";
import JobCard from "./JobCard";
import "./Job.css";
import Loader from "../ui/Loader.jsx";

import { useToast } from "../ui/toast/useToast.js";
import Modal from "../ui/Modal";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { showToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const confirmApply = () => {
    setShowModal(false);

    showToast(
      `Successfully applied to ${selectedJob.title} at ${selectedJob.company_name}`,
      "success",
    );
  };

  const loadJobs = async () => {
    try {
      setLoading(true);
      const jobsData = await fetchJobs();
      setJobs(jobsData.slice(0, 20));
      setError("");
    } catch (err) {
      showToast("Failed to fetch jobs", "error");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      loadJobs();
    }, 2000);
    const interval = setInterval(loadJobs, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="job-list-loader">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) return <p className="error">{error}</p>;

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          title={job.title}
          company={job.company_name}
          location={job.location}
          type={job.type}
          remote={job.remote}
          onApply={() => handleApplyClick(job)}
        />
      ))}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Confirm Application"
        footer={
          <>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              onClick={confirmApply}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Apply
            </button>
          </>
        }
      >
        <p className="text-sm text-white">
          Are you sure you want to apply for
          <span className="font-semibold"> {selectedJob?.title}</span>?
        </p>
      </Modal>
    </div>
  );
};

export default JobList;
