import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../services/index/users"; // API call
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import MainLayout from "../../components/MainLayout";
import LoadingSpinner from "../../components/LoadingSpinner";

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { email: "" },
    mode: "onChange",
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (email) => forgotPassword(email),
    onSuccess: () => {
      toast.success(t("emailSent"));
      setTimeout(() => {
        alert("Vào email để check, (nếu không có hãy vào mục spam)")
      }, 1000)
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    mutate(data.email);
  };

  return (
    <MainLayout>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 z-[9999] flex justify-start items-center flex-col ">
          <LoadingSpinner className="mt-20"/>
        </div>
      )}
      <div className="container mx-auto px-5 py-10">
        <h1 className="text-3xl font-bold text-center text-primary mb-10">
          {t("forgotPassword")}
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto mt-8"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-lg dark:text-dark-text"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: t("emailRequired"),
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: t("enterValidEmail"),
                },
              })}
              className={`w-full p-3 border rounded ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full p-3 bg-blue-500 text-white font-bold rounded disabled:opacity-70"
          >
            {t("sendResetLink")}
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default ForgotPasswordPage;
