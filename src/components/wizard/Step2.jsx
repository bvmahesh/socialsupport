import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import ProgressBar from "../ui/ProgressBar";

export default function Step2({ onNext, onBack, defaultValues }) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
  });

  // 🔑 same helper logic as Step 1
  const getError = (field, labelKey) => {
    if (!errors[field]) return "";
    const type = errors[field].type;

    switch (type) {
      case "required":
        return `${t(labelKey)} ${t("isRequired")}`;
      case "min":
        return t(errors[field].message);
      default:
        return "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
      <ProgressBar step={2} />

      <form onSubmit={handleSubmit(onNext)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Marital Status */}
          <Select
            label={`${t("maritalStatus")} *`}
            error={getError("maritalStatus", "maritalStatus")}
            {...register("maritalStatus", { required: true })}
            options={[
              { value: "", label: t("selectOption") },
              { value: "single", label: t("single") },
              { value: "married", label: t("married") },
              { value: "divorced", label: t("divorced") },
              { value: "widowed", label: t("widowed") },
            ]}
          />

          {/* Dependents */}
          <Input
            type="number"
            label={`${t("dependents")} *`}
            error={
              errors.dependents?.type === "required"
                ? `${t("dependents")} ${t("isRequired")}`
                : errors.dependents?.type === "min"
                ? t("dependentsMin")
                : ""
            }
            {...register("dependents", {
              required: true,
              min: 0,
            })}
          />

          {/* Employment Status */}
          <Select
            label={`${t("employmentStatus")} *`}
            error={getError("employmentStatus", "employmentStatus")}
            {...register("employmentStatus", { required: true })}
            options={[
              { value: "", label: t("selectOption") },
              { value: "employed", label: t("employed") },
              { value: "unemployed", label: t("unemployed") },
              { value: "selfEmployed", label: t("selfEmployed") },
            ]}
          />

          {/* Monthly Income */}
          <Input
            type="number"
            label={`${t("monthlyIncome")} *`}
            error={
              errors.monthlyIncome?.type === "required"
                ? `${t("monthlyIncome")} ${t("isRequired")}`
                : errors.monthlyIncome?.type === "min"
                ? t("incomeMin")
                : ""
            }
            {...register("monthlyIncome", {
              required: true,
              min: 1,
            })}
          />

          {/* Housing Status */}
          <Select
            label={`${t("housingStatus")} *`}
            error={getError("housingStatus", "housingStatus")}
            {...register("housingStatus", { required: true })}
            options={[
              { value: "", label: t("selectOption") },
              { value: "own", label: t("own") },
              { value: "rent", label: t("rent") },
              { value: "other", label: t("other") },
            ]}
          />
        </div>

        <div className="flex justify-between pt-6 border-t">
          <Button type="button" onClick={onBack}>
            {t("back")}
          </Button>
          <Button type="submit">
            {t("continue")}
          </Button>
        </div>
      </form>
    </div>
  );
}
