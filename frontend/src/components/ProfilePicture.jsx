/* eslint-disable no-unused-vars */
import propTypes from "prop-types";
import { HiOutlineCamera } from "react-icons/hi";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { stables } from "../constants";
import { useState } from "react";
import { createPortal } from "react-dom";
import CropEasy from "./crop/CropEasy";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePicture } from "../services/index/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userActions } from "../store/reducers/userReducers";
import LoadingSpinner from "./LoadingSpinner";

const ProfilePicture = ({ avatar }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const [openCrop, setOpenCrop] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  // Remove avatar in db and cloudinary
  const { mutate: mutateDeletePicture, isLoading: isLoadingDeletePicture } =
    useMutation({
      mutationFn: ({ token, formData }) => {
        return updateProfilePicture({
          token: token,
          formData: formData,
        });
      },
      onSuccess: (data) => {
        console.log(data);
        toast.success("Profile Picture is removed");
        dispatch(userActions.setUserInfo(data));
        localStorage.setItem("account", JSON.stringify(data));
        queryClient.invalidateQueries(["profile"]);
        setOpenCrop(false);
        setLoadingUpdate(false);
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
        setLoadingUpdate(false);
      },
    });

  // Handle change image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto({ url: URL.createObjectURL(file), file });
    setOpenCrop(true);
  };

  // Handle delete image user profile
  const handleDeleteImage = () => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        const formData = new FormData();
        formData.append("profilePicture", undefined);

        mutateDeletePicture({
          token: userState.userInfo.token,
          formData: formData,
        });
        setLoadingUpdate(true);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
        setLoadingUpdate(false);
      }
    }
  };

  return (
    <>
      {openCrop &&
        createPortal(
          <CropEasy photo={photo} setOpenCrop={setOpenCrop} setLoadingUpdate={setLoadingUpdate} />,
          document.getElementById("portal")
        )}

      <div className="w-full flex justify-center flex-col items-center gap-x-4">
        {(isLoadingDeletePicture || loadingUpdate) && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 z-[9999] flex justify-start items-center flex-col mt-5">
            <LoadingSpinner />
          </div>
        )}

        <div className="dark:border-glow mt-4 relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-[40px] outline outline-offset-1 outline-1 outline-primary overflow-hidden">
          <label
            htmlFor="ProfilePicture"
            className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
          >
            {avatar ? (
              <img
                src={avatar}
                alt="profile"
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full bg-blue-50/50 flex justify-center items-center">
                <HiOutlineCamera className="w-7 h-auto text-primary" />
              </div>
            )}
          </label>
          <input
            type="file"
            className="sr-only"
            id="ProfilePicture"
            onChange={handleFileChange}
          />
        </div>
        <button
          onClick={handleDeleteImage}
          type="button"
          className="px-3 py-1 text-red-500"
        >
          <RiDeleteBack2Fill className="w-8 h-auto" />
        </button>
      </div>
    </>
  );
};

ProfilePicture.propTypes = {
  avatar: propTypes.any,
};

export default ProfilePicture;
