import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";
import { getUserProfile } from "../../services/index/users";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useEffect } from "react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

   // Set theme when component mounts
   useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
      document.documentElement.classList.add(currentTheme);
    }
  }, []);

  const {
    // data: profileData,
    isLoading: profileIsLoading,
    // error: profileError,
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
    onSuccess: (data) => {
      if (!data?.admin) {
        navigate("/");
        toast.error("WARNING: Your are not allowed to access admin panel");
      }
    },
    onError: (err) => {
      console.log(err);
      navigate("/");
      toast.error("ERROR: Your are not allowed to access admin panel");
    },
  });

  if (profileIsLoading) {
    return (
      <div className="w-full flex-col gap-y-4 h-screen flex justify-center items-center dark:bg-slate-600">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen lg:flex-row ">
      <Header />
      <main className="bg-[#F9F9F9] flex-1 p-4 lg:p-6 dark:bg-dark-header">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
