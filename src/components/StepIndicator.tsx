import React from 'react';

interface Step {
  number: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center w-[600px]">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep === step.number ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step.number}
              </div>
              <div className={`mt-2 ${
                currentStep === step.number ? 'text-gray-700' : 'text-gray-400'
              }`}>
                {step.label}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-[1px] bg-gray-300 mx-2"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator; 