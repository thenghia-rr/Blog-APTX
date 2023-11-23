import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import { images } from "../../constants";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/index/users";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducers";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  // React Query
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      return login({ email, password });
    },
    onSuccess: (data) => {
      toast.success("Login Successfully");
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
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { email, password } = data;
    mutate({ email, password });
  };

  // If user login or register, navigate to home page
  useEffect(() => {
    if (userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10 ">
        <div className="flex max-w-4xl mx-auto rounded-xl overflow-hidden shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
          <div className="bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900 flex-shrink-0 hidden lg:block overflow-hidden ">
            <img
              src={images.roseLogin}
              alt="bailu"
              className="w-full h-auto"
            />
          </div>

          <div className="w-full p-5 rounded-xl">
            <h1 className="font-roboto text-2xl font-bold text-center text-light-hard mb-8">
              Sign In
            </h1>
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="flex flex-col mb-6 w-full">
                <label
                  htmlFor="email"
                  className="text-[#5a7184] font-semibold block"
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
                      message: "Enter a valid email",
                    },
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                  })}
                  placeholder="Enter email"
                  className={`placeholder:text-[#959ead] text-light-hard mt-3 rounded-lg px-5 py-3 font-medium block outline-none border ${
                    errors.email ? "border-red-500" : "border-[#c3cad9]"
                  }`}
                />
                {errors.email?.message && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col mb-6 w-full">
                <label
                  htmlFor="password"
                  className="text-[#5a7184] font-semibold block"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Enter password"
                  className={`placeholder:text-[#959ead] text-light-hard mt-3 rounded-lg px-5 py-3 font-medium block outline-none border border-[#c3cad9] ${
                    errors.password ? "border-red-500" : "border-[#c3cad9]"
                  }`}
                />
                {errors.password?.message && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-primary"
              >
                Forgot password ?
              </Link>
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className="disabled:opacity-70 disabled:cursor-not-allowed w-full p-3 px-8 rounded-lg bg-primary text-white font-bold my-6 text-lg "
              >
                Log In
              </button>
              <p className="text-sm font-semibold text-[#5a7184]">
                Do not have an account?{" "}
                <Link to="/register" className="text-primary">
                  Register now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default LoginPage;
