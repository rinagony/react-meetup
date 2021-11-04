import React from "react";
import { useState } from "react";
import { useRef } from "react";

function ModalIn(props) {
  const [message, setMessage] = useState(false);
  const emailInputSignRef = useRef();
  const passwordInputSignRef = useRef();
  function submitHandlerSignIn(event) {
    const enteredEmail = emailInputSignRef.current.value;
    const enteredPassword = passwordInputSignRef.current.value;
    localStorage.setItem("userName", enteredEmail);
    props.modalInSubmit(enteredEmail, enteredPassword);
    event.preventDefault();
  }
  return (
    <div>
      <div>
        <form onSubmit={submitHandlerSignIn}>
          <label for="emailSignInp">Enter your email:</label>
          <input
            type="text"
            id="emailSignInp"
            name="emailSignInp"
            ref={emailInputSignRef}
          />

          <label for="passwordSignInp">Enter password:</label>
          <input
            type="text"
            id="passwordSignInp"
            name="passwordSignInp"
            ref={passwordInputSignRef}
          />

          {message ? <span>The form is empty!</span> : null}
          {/* {messageLang ? <span>Only English characters allowed</span> : null} */}
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ModalIn;
