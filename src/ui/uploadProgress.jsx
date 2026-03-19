import { useTheme } from "../context/ThemeContext";

const UploadProgress = ({ progress, uploading, uploaded, fileName }) => {
  const { theme } = useTheme();

  if (!uploading && !uploaded) return null;

  return (
    <div className={`mt-3 p-3 ${theme.bg} rounded-lg`}>
      {/* File name */}
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-medium ${theme.textPrimary} truncate max-w-[200px]`}>
          {fileName}
        </span>
        <span className={`text-xs font-bold ${uploaded ? theme.successText : theme.primaryText}`}>
          {uploaded ? "✓ Done" : `${progress}%`}
        </span>
      </div>

      {/* Progress bar */}
      <div className={`w-full h-2 ${theme.border} border rounded-full overflow-hidden`}>
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            uploaded ? "bg-green-500" : "bg-blue-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Status text */}
      <p className={`text-xs ${theme.textMuted} mt-1`}>
        {uploaded ? "Upload complete!" : "Uploading..."}
      </p>
    </div>
  );
};

export default UploadProgress;