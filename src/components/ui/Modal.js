// import React from "react";
// import classes from "./Modal.module.css";
// import { useState } from "react";
// import { useRef } from "react";
// import { initializeApp } from "firebase/app";
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import ModalIn from "./ModalIn";
// import { useHistory } from "react-router";

// function Modal(props) {
//   const nameInputRef = useRef();
//   const [itemusername, setItemusername] = useState("");
//   const emailInputRef = useRef();
//   const passwordInputRef = useRef();
//   const [modal, setModal] = useState(true);
//   const [message, setMessage] = useState(false);

//   const [signInOrUp, setSignInOrUp] = useState(true);

//   //   function checkSymbols(enteredTitle) {
//   //     if (
//   //       (enteredTitle.charCode >= 48 && enteredTitle.charCode <= 57) || // 0-9
//   //       (enteredTitle.charCode >= 65 && enteredTitle.charCode <= 90) || // A-Z
//   //       (enteredTitle.charCode >= 97 && enteredTitle.charCode <= 122)
//   //     ) {
//   //       setMessageLang(false);
//   //     } else {
//   //       setMessageLang(true);
//   //     }
//   //   }
//   function changeConditionSignUp() {
//     if (signInOrUp == true) {
//       setSignInOrUp(false);
//     } else {
//       setSignInOrUp(true);
//     }
//   }
//   function submitHandler(event) {
//     event.preventDefault();
//     const enteredTitle = nameInputRef.current.value;
//     const enteredEmail = emailInputRef.current.value;
//     const enteredPassword = passwordInputRef.current.value;
//     // checkSymbols(enteredTitle);
//     if (
//       enteredTitle.length == 0 &&
//       enteredEmail.length == 0 &&
//       enteredPassword.length == 0
//     ) {
//       setMessage(true);
//     } else {
//       setItemusername(enteredTitle);
//       registerWithEmailAndPassword(enteredEmail, enteredPassword);
//     }
//   }

//   const firebaseConfig = {
//     apiKey: "AIzaSyAo3DBB-GThtgoOLdCJ44_6besiBr0ijTM",
//     authDomain: "meetup-67602.firebaseapp.com",
//     databaseURL: "https://meetup-67602-default-rtdb.firebaseio.com",
//     projectId: "meetup-67602",
//     storageBucket: "meetup-67602.appspot.com",
//     messagingSenderId: "704763914024",
//     appId: "1:704763914024:web:cd40972252c7ed5647d21d",
//     measurementId: "G-JCTL8EN83V",
//   };

//   function setDataUser(userId) {
//     let datauser = {
//       id: userId,
//       name: itemusername,
//     };

//     fetch("https://meetup-67602-default-rtdb.firebaseio.com/users.json", {
//       method: "POST",
//       body: JSON.stringify(datauser),
//       headers: {
//         "Content-type": "application/json",
//       },
//     });
//   }

//   // Initialize Firebase
//   const app = firebase.initializeApp(firebaseConfig);
//   const auth = app.auth();
//   const db = app.firestore;

//   const registerWithEmailAndPassword = async (
//     enteredEmail,
//     enteredPassword
//   ) => {
//     try {
//       const res = await auth.createUserWithEmailAndPassword(
//         enteredEmail,
//         enteredPassword
//       );
//       setSignInOrUp(false);
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   };

//   const signInWithEmailAndPassword = async (enteredEmail, enteredPassword) => {
//     try {
//       await auth.signInWithEmailAndPassword(enteredEmail, enteredPassword);
//       onAuthStateChanged();
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   };

//   const auths = getAuth();
//   onAuthStateChanged(auths, (user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       const uid = user.uid;
//       console.log(user);
//       setModal(false);
//       props.onSubmit(modal, uid);
//       // ...
//     } else {
     
//     }
//   });

//   //   function userTyping(event) {
//   //     if (
//   //       (event.charCode >= 48 && event.charCode <= 57) || // 0-9
//   //       (event.charCode >= 65 && event.charCode <= 90) || // A-Z
//   //       (event.charCode >= 97 && event.charCode <= 122)
//   //     ) {
//   //       setMessageLang(false);
//   //     } else {
//   //       setMessageLang(true);
//   //     }
//   //   }

//   return (
//     <div>
//       {modal ? (
//         <div className={classes.modal}>
//           {signInOrUp ? (
//             <div>
//               <form onSubmit={submitHandler}>
//                 <label for="name">Enter your name:</label>
//                 <input
//                   //   onChange={userTyping}
//                   type="text"
//                   id="name"
//                   name="name"
//                   ref={nameInputRef}
//                 />

//                 <label for="emailInp">Enter your email:</label>
//                 <input
//                   type="text"
//                   id="emailInp"
//                   name="email"
//                   ref={emailInputRef}
//                 />

//                 <label for="emailInp">Enter password:</label>
//                 <input
//                   type="text"
//                   id="passwordInp"
//                   name="password"
//                   ref={passwordInputRef}
//                 />

//                 {message ? <span>The form is empty!</span> : null}
//                 {/* {messageLang ? <span>Only English characters allowed</span> : null} */}
//                 <button>Submit</button>
//               </form>
//             </div>
//           ) : (
//             <ModalIn modalInSubmit={signInWithEmailAndPassword()} />
//           )}

//           <button onClick={changeConditionSignUp}>
//             I have account. Sign In
//           </button>
//         </div>
//       ) : null}
//     </div>
//   );
// }

// export default Modal;
