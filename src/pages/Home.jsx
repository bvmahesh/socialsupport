import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/layout/LanguageSwitcher";
import Step1 from "../components/wizard/Step1";
import Step2 from "../components/wizard/Step2";
import Step3 from "../components/wizard/Step3";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState(
    JSON.parse(localStorage.getItem("formData")) || {}
  );

  const updateData = (data, nextStep) => {
    const updated = { ...formData, ...data };
    setFormData(updated);
    localStorage.setItem("formData", JSON.stringify(updated));
    setStep(nextStep);
  };

  const resetApplication = () => {
  localStorage.removeItem("formData");
  localStorage.removeItem("step3Data");

  setFormData({});
  setStep(1);
};


  return (
    <div className="min-h-screen bg-gray-50 pt-32">

      {/* FIXED HEADER */}
      <header className="fixed top-0 left-0 w-full bg-blue-900 text-white z-50">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between">
          <div>
            <h1 className="text-xl font-semibold">{t("portalTitle")}</h1>
            <p className="text-sm opacity-90">{t("portalSubtitle")}</p>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="px-4">

       <section className="max-w-4xl mx-auto bg-gray  shadow-md mb-2 p-2">
    <div className="max-w-6xl mx-auto px-8">
      <h2 className="text-1xl font-semibold text-gray-900 mb-3">
        {t("missionTitle")}
      </h2>
      <p className="text-gray-600 text-base leading-relaxed max-w-3xl">
        {t("missionText")}
      </p>
    </div>
  </section>

        {step === 1 && (
          <Step1
            defaultValues={formData}
            onNext={(d) => updateData(d, 2)}
          />
        )}

        {step === 2 && (
          <Step2
            defaultValues={formData}
            onNext={(d) => updateData(d, 3)}
            onBack={() => setStep(1)}
          />
        )}

      {step === 3 && (
  <Step3
    onBack={() => setStep(2)}
      onReset={resetApplication}

  />
)}

      </main>
    </div>
  );
}
