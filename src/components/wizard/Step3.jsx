import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import ProgressBar from "../ui/ProgressBar";
import { generateAI } from "../../api/openai"; 


export default function Step3({ onBack, onReset }) {
  const { t, i18n } = useTranslation();
const [loading, setLoading] = useState(false);
const [aiText, setAiText] = useState("");
  const savedData =
    JSON.parse(localStorage.getItem("step3Data")) || {
      financial: "",
      employment: "",
      reason: "",
      aiSource: {}, // 👈 tracks which field used AI
    };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: savedData,
    mode: "onBlur",
  });

  const [popupKey, setPopupKey] = useState(null);
  const [success, setSuccess] = useState(false);

  const labels = {
    financial: "financialSituation",
    employment: "employmentCircumstances",
    reason: "reasonForApplying",
  };

  const aiKeys = {
    financial: "aiFinancial",
    employment: "aiEmployment",
    reason: "aiReason",
  };

  const values = watch();

  // 🔑 persist form data
  useEffect(() => {
    localStorage.setItem("step3Data", JSON.stringify(values));
  }, [values]);

  // 🔑 re-translate AI text on language change
  useEffect(() => {
    Object.keys(values.aiSource || {}).forEach((field) => {
      if (values.aiSource[field]) {
        setValue(field, t(aiKeys[field]));
      }
    });
  }, [i18n.language]);

  const applySuggestion = () => {
  setValue(popupKey, aiText);
  setValue(`aiSource.${popupKey}`, true);
  setPopupKey(null);
};


  const onSubmit = (data) => {
    setSuccess(true);
  };

  const resetAll = () => {
    localStorage.clear();
    reset({
      financial: "",
      employment: "",
      reason: "",
      aiSource: {},
    });
    setSuccess(false);
    onReset();
  };

const handleAI = async (fieldKey) => {
  setPopupKey(fieldKey);
  setLoading(true);
  setAiText("");

  const currentValue = values[fieldKey] || "";

  const prompt = `
Write a professional and well-structured response for:
${t(labels[fieldKey])}

Current user input:
${currentValue}

Language: ${i18n.language}

Make it clear, formal and suitable for an official application form.
`;

  try {
    const response = await generateAI(prompt);
    setAiText(response);
  } catch (error) {
    console.error(error);
    setAiText("Failed to generate content.");
  }

  setLoading(false);
};


  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
      <ProgressBar step={3} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {Object.keys(labels).map((key) => (
          <div key={key}>
            <label className="font-medium">
              {t(labels[key])} *
            </label>

            <textarea
              rows={4}
              className={`w-full border rounded p-3 mt-2 ${
                errors[key] ? "border-red-500" : "border-gray-300"
              }`}
              {...register(key, { required: true })}
              onChange={(e) => {
                setValue(key, e.target.value);
                setValue(`aiSource.${key}`, false); // 👈 user edited
              }}
            />

            {errors[key] && (
              <p className="text-red-500 text-sm mt-1">
                {t(labels[key])} {t("isRequired")}
              </p>
            )}

            <button
              type="button"
              onClick={() => handleAI(key)}
              className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-100"
            >
               {t("helpMeWrite")}
            </button>
          </div>
        ))}

        <div className="flex justify-between pt-6 border-t">
          <Button type="button" onClick={onBack}>
            {t("back")}
          </Button>
          <Button type="submit">
            {t("submitApplication")}
          </Button>
        </div>
      </form>

      {/* AI POPUP */}
      {popupKey && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full">
            <p className="mb-4 whitespace-pre-wrap">
  {loading ? "Generating..." : aiText}
</p>
            <div className="flex justify-end gap-2">
              <Button onClick={applySuggestion}>{t("accept")}</Button>
              <Button onClick={() => setPopupKey(null)}>{t("reject")}</Button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS POPUP */}
      {success && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl text-center">
            <h3 className="text-lg font-semibold mb-2">
              {t("submittedSuccess")}
            </h3>
            <Button onClick={resetAll}>OK</Button>
          </div>
        </div>
      )}
    </div>
  );
}
