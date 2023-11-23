import axios from "axios";

export const getAllPosts = async () => {
  try {
    const { data } = await axios.get("/api/posts");
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};


export const getSinglePost = async ({slug}) => {
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


