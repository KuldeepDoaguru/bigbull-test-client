// import React, { useState } from "react";
// import { ToastContainer } from "react-toastify";
// import contactpic from "../photos/contactuspic.png";
// import axios from "axios";
// import { Navigate } from "react-router-dom";
// import cogoToast from "cogo-toast";
// import styled from "styled-components";

// const ResetPassOtp = () => {
//   const [email, setEmail] = useState("");

//   //   const navigate = Navigate();

//   const sendCode = async () => {
//     try {
//       const response = await axios.post(
//         "https://bigbulls.co.in/api/v1/auth/sendOtp",
//         { email }
//       );

//       console.log(response);
//       cogoToast.success("OTP sent successfully");
//       //   navigate("/newpassword");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <Container>
//         <div className="maincont">
//           <div className="container">
//             <div className="row">
//               <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
//                 <img src={contactpic} alt="user" />
//               </div>
//               <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
//                 <div className="formcont">
//                   <p>Verify Yourself</p>
//                   <input
//                     type="email"
//                     name="email"
//                     id="username"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                   />
//                   <button onClick={sendCode} className="btn btn-warning mt-1">
//                     Send Code
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default ResetPassOtp;
// const Container = styled.div`
//   .maincont {
//     background: #5a69ae;
//     height: 100vh;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }

//   .formcont {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;

//     height: 100%;
//     input {
//       padding: 0.5rem;
//       border-radius: 0.5rem;
//     }
//     p {
//       font-size: 2rem;
//       color: white;
//     }
//   }
// `;
