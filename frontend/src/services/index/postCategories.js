import axios from "axios";

// [GET] /api/post-categories?search=${searchKeyWord}&page=${page}&limit=${limit}
export const getAllCategories = async (
  searchKeyWord = "",
  page = 1,
  limit = 10
) => {
  try {
    const { data, headers } = await axios.get(
      `/api/post-categories?search=${searchKeyWord}&page=${page}&limit=${limit}`
    );

    const totalPageCount = headers["x-totalpagecount"];
    const totalCategoriesCount = headers["x-totalcount"];
    
    return { data, headers, totalCategoriesCount, totalPageCount };
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

// [DELETE] /api/post-categories/${slug}
export const deleteCategory = async ({ slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`/api/post-categories/${slug}`, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

// [POST] /api/categories/
export const createCategory = async ({ token, title }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `/api/post-categories`,
      { title },
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

// [PUT] /api/categories/:slug
export const updateCategory = async ({ token, title, slug }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `/api/post-categories/${slug}`,
      { title },
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

// [GET] /api/categories/:slug
export const getSingleCategory = async ({ slug }) => {
  try {
    const { data } = await axios.get(`/api/post-categories/${slug}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};
