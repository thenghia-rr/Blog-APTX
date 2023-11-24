import axios from "axios";

export const getAllPosts = async (searchKeyWord = "", page = 1, limit = 10) => {
  try {
    const { data, headers } = await axios.get(`/api/posts?search=${searchKeyWord}&page=${page}&limit=${limit}`);
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

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
