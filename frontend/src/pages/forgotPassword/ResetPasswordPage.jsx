import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../services/index/users"; // API call
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MainLayout from "../../components/MainLayout";

const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { password: "", confirmPassword: "" },
    mode: "onChange",
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ password }) => resetPassword(token, password),
    onSuccess: () => {
      toast.success(t("passwordResetSuccess"));
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error(t("cfPasswordNotMatch"));
      return;
    }
    mutate(data.password);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-5 py-10">
        <h1 className="text-3xl text-primary font-bold text-center">{t("resetPassword")}</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto mt-8"
        >
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 dark:text-dark-text">
              {t("newPassword")}
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: t("passwordRequired"),
                minLength: {
                  value: 6,
                  message: t("passwordLeastLength"),
                },
              })}
              className={`w-full p-3 border rounded ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2 dark:text-dark-text">
              {t("cfPassword")}
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: t("confirmPasswordRequired"),
                minLength: {
                  value: 6,
                  message: t("passwordLeastLength"),
                },
              })}
              className={`w-full p-3 border rounded ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full p-3 bg-blue-500 text-white font-bold rounded disabled:opacity-70"
          >
            {t("resetPassword")}
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default ResetPasswordPage;
