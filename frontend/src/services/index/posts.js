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

// [PUT] /api/posts/${slug}
export const updatePost = async ({updatedData, slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`/api/posts/${slug}`,updatedData, config);
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

    const { data } = await axios.post(`/api/posts/`,{}, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};
