const JobCard = ({ title, company, location }) => {
  return (
    <div className="bg-[#111] rounded-xl p-5 border border-[#222] hover:border-blue-500 transition">
      <h3 className="text-white font-semibold text-lg">{title}</h3>
      <p className="text-gray-400 text-sm mt-1">{company}</p>
      <p className="text-gray-500 text-sm mt-2">{location}</p>

      <button className="mt-4 text-sm text-blue-500 hover:underline">
        View job →
      </button>
    </div>
  );
};

export default JobCard;
