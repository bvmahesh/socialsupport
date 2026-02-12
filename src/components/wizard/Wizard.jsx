import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import ProgressBar from "../ui/ProgressBar";

export default function Wizard() {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-5xl mx-auto p-6">

      <ProgressBar step={step} />

      {step === 1 && <Step1 next={() => setStep(2)} />}
      {step === 2 && (
        <Step2
          next={() => setStep(3)}
          back={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <Step3 back={() => setStep(2)} />
      )}

    </div>
  );
}
