// import { OAuth2Client } from 'google-auth-library'
// import dotenv from 'dotenv'
// dotenv.config()

// const client = new OAuth2Client(process.env.LOGIN_CLIENT_ID);

// const authGoogle =  async (req, res) => {
//     const { token } = req.body;
//     try {
//       const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: process.env.LOGIN_CLIENT_ID, // CLIENT_ID của bạn từ Google Cloud Console
//       });
//       const payload = ticket.getPayload();
//       const userid = payload['sub'];
      
//       console.log("UserID: ", userid)

//       // Tạo hoặc tìm user trong database của bạn
//       const user = await findOrCreateUser(payload); // Hàm để tạo hoặc tìm user trong database
  
//       res.json({ user });
//     } catch (error) {
//       console.error('Error verifying Google token:', error);
//       res.status(401).json({ error: 'Invalid token' });
//     }
//   };
// export {authGoogle}