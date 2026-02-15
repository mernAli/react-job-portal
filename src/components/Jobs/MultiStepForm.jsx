import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const MultiStepForm = ({ steps, onComplete, onCancel }) => {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete();
  };

  return (
    <div className={`${theme.cardBg} rounded-xl ${theme.border} border p-6`}>
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                  index <= currentStep
                    ? `${theme.primary} text-white`
                    : `${theme.bg} ${theme.textMuted}`
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    index < currentStep ? theme.primary : theme.bg
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-xs font-medium ${
                index === currentStep ? theme.primaryText : theme.textMuted
              }`}
              style={{ width: `${100 / steps.length}%`, textAlign: "center" }}
            >
              {step.title}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <div className="mb-6">
        <h2 className={`text-xl font-bold ${theme.textPrimary} mb-2`}>
          {steps[currentStep].title}
        </h2>
        <p className={`text-sm ${theme.textMuted} mb-6`}>
          {steps[currentStep].description}
        </p>
        {steps[currentStep].content}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t">
        <button
          onClick={onCancel}
          className={`px-6 py-2 ${theme.border} border rounded-lg ${theme.hover} font-medium`}
        >
          Cancel
        </button>
        <div className="flex gap-3">
          {currentStep > 0 && (
            <button
              onClick={goBack}
              className={`px-6 py-2 ${theme.border} border rounded-lg ${theme.hover} font-medium`}
            >
              Back
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button
              onClick={goNext}
              className={`px-6 py-2 ${theme.primary} text-white rounded-lg ${theme.primaryHover} font-medium`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className={`px-6 py-2 ${theme.primary} text-white rounded-lg ${theme.primaryHover} font-medium`}
            >
              Publish Job
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;