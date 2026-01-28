const JobCard = ({ title, company, location, type, remote }) => {
  return (
    <div className="job-card">
      <div className="job-left">
        <div className="company-logo"></div>

        <div>
          <h3>{title}</h3>
          <p className="company">{company}</p>
          <p className="meta">
            {location} • {type} {remote && "• Remote"}
          </p>
        </div>
      </div>

      <button 
        onClick={() => alert(`Successfully Applied for ${title} at ${company}`)}
        className="apply-btn"
      >
        Apply
      </button>
    </div>
  );
};

export default JobCard;
