const JobCard = ({ title, company, location, type, remote, onApply }) => {
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
        onClick={onApply}
        className="apply-btn"
      >
        Apply
      </button>
    </div>
  );
};

export default JobCard;
