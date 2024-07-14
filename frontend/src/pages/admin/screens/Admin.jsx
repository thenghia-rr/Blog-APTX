import { Link } from "react-router-dom";
import { FaEdit, FaComments, FaTags, FaUsers } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Admin = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white shadow-md rounded-lg p-8 mx-4 lg:mx-auto max-w-5xl dark:bg-dark-backgr border-glow transition duration-500">
      <h1 className="text-5xl font-semibold text-[#18a] mb-6 dark:text-primary">
        {t("adminDashboard")}
      </h1>
      <p className="text-gray-700 text-lg mb-4 dark:text-dark-soft">
        {t("adminIntro")}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          to="/admin/posts/manage"
          className="transform hover:scale-105 transition duration-300"
        >
          <div className="bg-blue-100 p-4 rounded-lg shadow-md flex items-center">
            <FaEdit className="w-16 h-16 mr-4 lg:ml-4 lg:mr-12 text-blue-800" />
            <div>
              <h2 className="text-xl font-semibold text-blue-800 mb-2">
                {t("managePosts")}
              </h2>
              <img
                src="/images/manage_posts.png"
                alt="Manage Posts"
                className="w-[200px] h-[150px] object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </Link>
        <Link
          to="/admin/comments"
          className="transform hover:scale-105 transition duration-300"
        >
          <div className="bg-green-100 p-4 rounded-lg shadow-md flex items-center">
            <FaComments className="w-16 h-16 mr-4 lg:ml-4 lg:mr-12 text-green-800" />
            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-2">
                {t("manageComments")}
              </h2>
              <img
                src="/images/manage_comments.png"
                alt="Manage Comments"
                className="w-[200px] h-[150px] object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </Link>
        <Link
          to="/admin/categories/manage"
          className="transform hover:scale-105 transition duration-300"
        >
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md flex items-center">
            <FaTags className="w-16 h-16 mr-4 lg:ml-4 lg:mr-12 text-yellow-800" />
            <div>
              <h2 className="text-xl font-semibold text-yellow-800 mb-2">
                {t("manageCategories")}
              </h2>
              <img
                src="/images/manage_categories.png"
                alt="Manage Categories"
                className="w-[200px] h-[150px] object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </Link>
        <Link
          to="/admin/users/manage"
          className="transform hover:scale-105 transition duration-300"
        >
          <div className="bg-purple-100 p-4 rounded-lg shadow-md flex items-center">
            <FaUsers className="w-16 h-16 mr-4 lg:ml-4 lg:mr-12 text-purple-800" />
            <div>
              <h2 className="text-xl font-semibold text-purple-800 mb-2">
                {t("manageUsers")}
              </h2>
              <img
                src="/images/manage_users.png"
                alt="Manage Users"
                className="w-[200px] h-[150px] object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
