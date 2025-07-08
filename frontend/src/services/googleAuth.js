// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';

// export const useGoogleAuth = () => {
//   const googleLogin = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       try {
//         const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
//           headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
//         });
//         // console.log(userInfo.data);
//         console.log("USER INFO: ",userInfo.data);
//         // Send userInfo to your backend to create or find user
//         const response = await axios.post('http://localhost:5000/api/auth/google', {
//           token: tokenResponse.access_token,
//         });

//         // Save user info to localStorage
//         localStorage.setItem('user', JSON.stringify(response.data));
//         console.log('User saved to localStorage:', response.data);

//         return response.data;
//       } catch (error) {
//         console.error('Failed to fetch user info:', error);
//         throw new Error(error.message);
//       }
//     },
//     onError: (error) => {
//       console.error('Login Failed:', error);
//       throw new Error('Login Failed');
//     },
//   });

//   return googleLogin;
// };

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export const useGoogleAuth = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const token = tokenResponse.access_token;
        const response = await axios.post(
          "http://localhost:5000/api/auth/google",
          {
            token: token,
          }
        );

          console.log(response)
        // Save user info to localStorage
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("User saved to localStorage:", response.data);

        return response.data;
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        throw new Error(error.message);
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
      throw new Error("Login Failed");
    },
  });

  return googleLogin;
};
