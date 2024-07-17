import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import { images } from "../../constants";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/index/users";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducers";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCf, setShowPasswordCf] = useState(false);

  // React Query
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signup({ name, email, password });
    },
    onSuccess: (data) => {
      toast.success("Register Successfully");
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  // React hook form (validate form)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cfPassword: "",
    },
    mode: "onChange",
  });

  // Validate Confirm Password
  const password = watch("password");

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  // If user login or register, navigate to home page
  useEffect(() => {
    if (userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowPasswordCf = () => {
    setShowPasswordCf((prev) => !prev);
  };

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-8 ">
        <div className="flex max-w-4xl mx-auto rounded-xl overflow-hidden shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] dark:shadow-[-10px_-10px_30px_4px_rgba(255,255,255,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
          <div className="w-full mx-auto p-5 rounded-xl ">
            <h1 className="font-roboto text-2xl font-bold text-center text-light-hard mb-8 uppercase dark:text-dark-text">
              {t("register")}
            </h1>
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="flex flex-col mb-4 w-full ">
                <label
                  htmlFor="name"
                  className="text-[#5a7184] font-semibold block dark:text-dark-soft"
                >
                  {t("name")}
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    minLength: {
                      value: 2,
                      message: t('nameLeastLength'),
                    },
                    required: {
                      value: true,
                      message: t('nameRequired'),
                    },
                  })}
                  placeholder={t("yourName")}
                  className={`placeholder:text-[#959ead] text-light-hard mt-3 rounded-lg px-5 py-3 font-medium block outline-none border dark:bg-slate-200 ${
                    errors.name ? "border-red-500" : "border-[#c3cad9]"
                  }`}
                />
                {errors.name?.message && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.name?.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col mb-4 w-full">
                <label
                  htmlFor="email"
                  className="text-[#5a7184] font-semibold block dark:text-dark-soft"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: t('enterValidEmail'),
                    },
                    required: {
                      value: true,
                      message: t('emailRequired'),
                    },
                  })}
                  placeholder={t("yourEmail")}
                  className={`placeholder:text-[#959ead] text-light-hard mt-3 rounded-lg px-5 py-3 font-medium block outline-none border dark:bg-slate-200 ${
                    errors.email ? "border-red-500" : "border-[#c3cad9]"
                  }`}
                />
                {errors.email?.message && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col mb-4 w-full">
                <label
                  htmlFor="password"
                  className="text-[#5a7184] font-semibold block dark:text-dark-soft"
                >
                  {t("forgotPassword")}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: t('passwordRequired'),
                      },
                      minLength: {
                        value: 6,
                        message: t('passwordLeastLength'),
                      },
                    })}
                    placeholder={t("yourPassword")}
                    className={`placeholder:text-[#959ead] text-light-hard mt-3 rounded-lg px-5 py-3 font-medium block outline-none border border-[#c3cad9] dark:bg-slate-200 w-full ${
                      errors.password ? "border-red-500" : "border-[#c3cad9]"
                    }`}
                  />
                  <span
                    className=" absolute right-3 top-[57%] transform -translate-y-1/2 cursor-pointer"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-[#959ead] " />
                    ) : (
                      <FaEye className="text-[#959ead]" />
                    )}
                  </span>
                </div>
                {errors.password?.message && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col mb-4 w-full">
                <label
                  htmlFor="cfPassword"
                  className="text-[#5a7184] font-semibold block dark:text-dark-soft"
                >
                  {t("cfPassword")}
                </label>
                <div className="relative">
                  <input
                    type={showPasswordCf ? "text" : "password"}
                    id="cfPassword"
                    {...register("cfPassword", {
                      required: {
                        value: true,
                        message: t('cfPasswordRequired'),
                      },
                      validate: (value) => {
                        if (value !== password) {
                          return t('cfPasswordNotMatch');
                        }
                      },
                    })}
                    placeholder={t("yourCfPassword")}
                    className={`placeholder:text-[#959ead] text-light-hard mt-3 rounded-lg px-5 py-3 font-medium block outline-none border dark:bg-slate-200 w-full ${
                      errors.cfPassword ? "border-red-500" : "border-[#c3cad9]"
                    }`}
                  />
                  <span
                    className="absolute right-3 top-[57%] transform -translate-y-1/2 cursor-pointer"
                    onClick={toggleShowPasswordCf}
                  >
                    {showPasswordCf ? (
                      <FaEyeSlash className="text-[#959ead] " />
                    ) : (
                      <FaEye className="text-[#959ead]" />
                    )}
                  </span>
                </div>
                {errors.cfPassword?.message && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.cfPassword?.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className="disabled:opacity-70 disabled:cursor-not-allowed w-full p-3 px-8 rounded-lg bg-primary text-white font-bold mb-6 text-lg "
              >
                {t("register")}
              </button>
              <p className="text-sm font-semibold text-[#5a7184] dark:text-dark-soft">
                {t("haveAccount")}{" "}
                <Link to="/login" className="text-primary">
                  {t("login")}
                </Link>
              </p>
            </form>
          </div>

          <div className=" bg-gradient-to-r from-gray-100 to-gray-300 flex-shrink-0 hidden lg:block overflow-hidden  ">
            <img
              src={images.bailuRegister}
              alt="bailu"
              className="w-full h-auto "
            />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default RegisterPage;
