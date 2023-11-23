import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
// import { images } from "../../constants";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateProfile } from "../../services/index/users";
import { useDispatch, useSelector } from "react-redux";
import ProfilePicture from "../../components/ProfilePicture";
import toast from "react-hot-toast";
import { userActions } from "../../store/reducers/userReducers";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  // Get data user using (react query)
  const { data: profileData, isLoading: profileIsLoading } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
  });

  // Update profile user using (react query)
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return updateProfile({
        token: userState.userInfo.token,
        userData: { name, email, password },
      });
    },
    onSuccess: (data) => {
      toast.success("Profile is Updated");
      navigate('/')
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    values: {
      name: profileIsLoading ? "" : profileData.name,
      email: profileIsLoading ? "" : profileData.email,
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  // If user login or register, redirect to home page
  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
    window.scrollTo(0, 0);
  }, [navigate, userState.userInfo]);

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-8 ">
        <div className=" max-w-2xl mx-auto rounded-xl overflow-hidden shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
          <div className="w-full mx-auto p-5 rounded-xl ">
            <h1 className="font-roboto text-2xl font-bold text-center text-light-hard mb-3">
              My Profile
            </h1>
            <ProfilePicture avatar={profileData?.avatar} />
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="flex flex-col mb-4 w-full">
                <label
                  htmlFor="name"
                  className="text-[#5a7184] font-semibold block"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    minLength: {
                      value: 1,
                      message: "Name must be at least 1 character",
                    },
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                  placeholder="Enter name"
                  className={`placeholder:text-[#959ead] text-light-hard mt-3 rounded-lg px-5 py-3 font-medium block outline-none border ${
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
              <div className="flex flex-col mb-4 w-full">
                <label
                  htmlFor="password"
                  className="text-[#5a7184] font-semibold block"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  placeholder="Enter new password (Optional)"
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
              <button
                type="submit"
                disabled={!isValid || profileIsLoading || isLoading}
                className="disabled:opacity-70 disabled:cursor-not-allowed w-full p-3 px-8 rounded-lg bg-primary text-white font-bold mb-6 text-lg "
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;
