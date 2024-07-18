import axios from "axios";

// [GET] /api/posts?search=${searchKeyWord}&page=${page}&limit=${limit}
export const getAllPosts = async (searchKeyWord = "", page = 1, limit = 5) => {
  try {
    const { data, headers } = await axios.get(
      `/api/posts?search=${searchKeyWord}&page=${page}&limit=${limit}`
    );
    const totalPageCount = headers["x-totalpagecount"];
    const totalPostsCount = headers["x-totalcount"];
    return { data, headers, totalPageCount, totalPostsCount };
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

// [GET] /api/posts/${slug}
export const getSinglePost = async ({ slug }) => {
  try {
    const { data } = await axios.get(`/api/posts/${slug}`);
    // console.log('Data from db: ', data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

// [DELETE] /api/posts/${slug}
export const deletePost = async ({ slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`/api/posts/${slug}`, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

// DELETE /api/posts/delete-image/${slug}
export const deletePostImage = async ({ slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(
      `/api/posts/delete-image/${slug}`,
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};
// AI: [PUT] /api/posts/${slug}
export const updatePost = async ({ updatedData, slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const formData = new FormData();
    formData.append("document", updatedData.get("document")); // Chú ý lấy dữ liệu JSON từ FormData
    if (updatedData.get("postPicture")) {
      formData.append("postPicture", updatedData.get("postPicture"));
    }

    const { data } = await axios.put(`/api/posts/${slug}`, formData, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

// [POST] /api/posts/
export const createPost = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`/api/posts/`, {}, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

// [PUT] /api/posts/save/:id
export const savePost = async ({ token, postId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`/api/posts/save/${postId}`, {}, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

// [PUT] /api/posts/unsave/:id
export const unsavePost = async ({ token, postId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`/api/posts/unsave/${postId}`, {}, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

// Hàm gọi API để lấy danh sách bài viết đã lưu
// [GET] /api/posts/saved
export const getSavedPosts = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("/api/posts/saved", config);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return []; // Trả về mảng rỗng nếu không có bài viết nào được lưu
    } else if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};
