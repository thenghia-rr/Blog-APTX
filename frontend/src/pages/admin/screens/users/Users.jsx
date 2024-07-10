import DataTable from "../../components/DataTable";
import { useDataTable } from "../../../../hooks/useDataTable";
import {
  deleteUser,
  getAllUsers,
  updateProfile,
} from "../../../../services/index/users";
import { images, stables } from "../../../../constants";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Users = () => {
  // Use custom hook (useDataTable)
  const {
    userState,
    currentPage,
    searchKeyWord,
    data: usersData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeyWordHandler,
    submitSearchHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () =>
      getAllUsers(userState?.userInfo?.token, searchKeyWord, currentPage),
    dataQueryKey: "users",
    deleteDataMessage: "User is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deleteUser({
        slug,
        token,
      });
    },
  });


  // useMutation for update admin state
  const { mutate: mutateUpdateUser, isLoading: isLoadingUpdateUser } =
    useMutation({
      mutationFn: ({ isAdmin, userId }) => {
        return updateProfile({
          token: userState?.userInfo?.token,
          userData: { admin: isAdmin },
          userId,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
        toast.success("User is updated successfully");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  // Main func to update Admin check
  const handleAdminCheck = (e, userId) => {
    const initCheckValue = !e.target.checked;

    if (window.confirm("Are you want to change status of this user ?")) {
      mutateUpdateUser({ isAdmin: e.target.checked, userId });
    } else {
      e.target.checked = initCheckValue;
    }
  };

  return (
    <DataTable
      pageTitle="Manage Users"
      dataListName="Users"
      searchInputPlaceholder="User's email..."
      searchKeyWordOnSubmitHandler={submitSearchHandler}
      searchKeywordOnChangeHandler={searchKeyWordHandler}
      searchKeyword={searchKeyWord}
      tableHeaderTitleList={[
        "Name",
        "Email",
        "Created At",
        "Is Verified",
        "Is Admin",
        "Actions",
      ]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={usersData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={usersData?.headers}
      userState={userState}
      totalDataCount={usersData?.totalUsersCount}
    >
      {usersData?.data?.map((user) => (
        <tr key={user._id}>
          {/* NAME COLUMN  */}
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/" className="relative block">
                  <img
                    alt={user?.name}
                    src={
                      user?.avatar
                        ? stables.UPLOAD_FOLDER_BASE_URL + user?.avatar
                        : images.userAnonymous
                    }
                    className="mx-auto object-cover rounded-lg h-10 aspect-square "
                  />
                </Link>
              </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">{user?.name}</p>
              </div>
            </div>
          </td>

          {/* EMAIL COLUMN  */}
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {new Date(user?.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </td>

          {/* VERIFIED COLUMN  */}
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {user?.verified ? "✅" : "❌"}
            </p>
          </td>
          {/* ADMIN COLUMN  */}
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <input
              type="checkbox"
              defaultChecked={user?.admin}
              className="d-checkbox disabled:bg-orange-400 disabled:opacity-100 checked:bg-[url('/images/check.png')] bg-cover checked:disabled:bg-none"
              onChange={(e) => handleAdminCheck(e, user._id)}
              disabled={isLoadingUpdateUser}
            />
          </td>
          {/* ACTIONS COLUMN */}
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-4">
            <button
              disabled={isLoadingDeleteData}
              type="button"
              className="text-red-500 hover:text-rose-900 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() => {
                deleteDataHandler({
                  slug: user?._id,
                  token: userState.userInfo.token,
                });
              }}
            >
              Detete
            </button>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default Users;
