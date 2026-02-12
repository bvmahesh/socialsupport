import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import ProgressBar from "../ui/ProgressBar";

export default function Step1({ onNext, defaultValues }) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = (data) => onNext(data);

  // 🔑 helper to translate error types
  const getError = (field, labelKey) => {
    if (!errors[field]) return "";
    const type = errors[field].type;

    switch (type) {
      case "required":
        return `${t(labelKey)} ${t("isRequired")}`;
      case "pattern":
        return t(errors[field].message);
      case "minLength":
        return t("minName");
      default:
        return "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
      <ProgressBar step={1} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Full Name */}
          <Input
            label={`${t("fullName")} *`}
            error={getError("name", "fullName")}
            {...register("name", {
              required: true,
              minLength: 3,
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "onlyAlphabets",
              },
            })}
          />

          {/* National ID */}
          <Input
            label={`${t("nationalId")} *`}
            error={getError("nationalId", "nationalId")}
            {...register("nationalId", { required: true })}
          />

          {/* DOB */}
          <Input
            type="date"
            label={`${t("dob")} *`}
            error={getError("dob", "dob")}
            {...register("dob", { required: true })}
          />

          {/* Gender */}
          <Select
            label={`${t("gender")} *`}
            error={getError("gender", "gender")}
            {...register("gender", { required: true })}
            options={[
              { value: "", label: t("selectOption") },
              { value: "male", label: t("male") },
              { value: "female", label: t("female") },
              { value: "other", label: t("other") },
            ]}
          />

          {/* Address */}
          <div className="md:col-span-2">
            <Input
              label={`${t("address")} *`}
              error={getError("address", "address")}
              {...register("address", { required: true })}
            />
          </div>

          {/* City */}
          <Input
            label={`${t("city")} *`}
            error={getError("city", "city")}
            {...register("city", { required: true })}
          />

          {/* State */}
          <Input
            label={`${t("state")} *`}
            error={getError("state", "state")}
            {...register("state", { required: true })}
          />

          {/* Country */}
          <Input
            label={`${t("country")} *`}
            error={getError("country", "country")}
            {...register("country", { required: true })}
          />

          {/* Phone */}
          <Input
            type="tel"
            label={`${t("phone")} *`}
            error={
              errors.phone?.type === "required"
                ? `${t("phone")} ${t("isRequired")}`
                : errors.phone?.type === "pattern"
                ? t("phoneTenDigits")
                : ""
            }
            maxLength={10}
            onInput={(e) =>
              (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
            }
            {...register("phone", {
              required: true,
              pattern: /^[0-9]{10}$/,
            })}
          />

          {/* Email */}
          <div className="md:col-span-2">
            <Input
              type="email"
              label={`${t("email")} *`}
              error={
                errors.email?.type === "required"
                  ? `${t("email")} ${t("isRequired")}`
                  : errors.email?.type === "pattern"
                  ? t("invalidEmail")
                  : ""
              }
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t">
          <Button type="submit">{t("continue")}</Button>
        </div>
      </form>
    </div>
  );
}
