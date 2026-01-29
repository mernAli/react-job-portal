import JobList from "../components/JobList";

const Jobs = () => {
  return(
    <>
        <h2>Top job picks for you</h2>
        <p className="subtitle">
            Based on your profile, preferences, and recent activity
        </p>

        <JobList />
    
    </>
  ) 
};

export default Jobs;
