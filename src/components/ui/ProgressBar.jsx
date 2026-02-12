import { useTranslation } from "react-i18next";

export default function ProgressBar({ step }) {
  const { t } = useTranslation();

  const steps = [
    "personalInfo",
    "familyFinancial",
    "situationDesc",
  ];

  return (
    <div className="mb-10 w-full">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        {steps.map((key, index) => {
          const stepNumber = index + 1;
          const isActive = step === stepNumber;
          const isCompleted = step > stepNumber;

          return (
            <div key={key} className="flex items-center w-full">

              {/* Circle */}
              <div
                className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full font-semibold text-sm
                ${
                  isCompleted
                    ? "bg-green-600 text-white"
                    : isActive
                    ? "bg-blue-800 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {isCompleted ? "✓" : stepNumber}
              </div>

              {/* Label */}
              <span
                className={`ml-4 text-sm md:text-base
                ${
                  isActive
                    ? "text-blue-800 font-semibold"
                    : isCompleted
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                {t(key)}
              </span>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:block flex-1 h-0.5 bg-gray-300 mx-6" />
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
}
