import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const ResetPwd = ({ setRequestSuccess, setVerifySuccess }) => {
  const [isError, setIsError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  return (
    <Wrapper>
      {!updateSuccess && (
        <div className="login-container">
          <h2>New credentials</h2>
          <div className="pwd-rules">
            <p>Password must be at least 8 characters long.</p>
            <p>Password must contain at least one upper case letter.</p>
            <p>Password must contain at least one lower case letter.</p>
            <p>
              Password must contain at least one number or special character.
            </p>
          </div>

          {/* need to check password is valid or not, and store the new password to database. if it's submit successfully, back to login in page. */}
          <form action="#">
            <div className="pwd-container">
              <div>
                <label
                  htmlFor="pwd"
                  style={{ color: isError ? "#ee0004" : "#1a1a1a" }}
                >
                  new password
                </label>
                <input
                  type="password"
                  id="pwd"
                  style={{ borderColor: isError ? "#ee0004" : null }}
                />
                {isError && (
                  <span className="error-sign">
                    <span>!</span>
                  </span>
                )}

                {isError && <p className="error">This is required filed.</p>}
              </div>
              <div className="re-pwd">
                {" "}
                <label
                  htmlFor="re-pwd"
                  style={{ color: isError ? "#ee0004" : "#1a1a1a" }}
                >
                  re-type password
                </label>
                <input
                  type="password"
                  id="re-pwd"
                  style={{ borderColor: isError ? "#ee0004" : null }}
                />
                {isError && (
                  <span className="error-sign">
                    <span>!</span>
                  </span>
                )}
                {isError && <p className="error">This is required field.</p>}
              </div>
            </div>
            {/* 
            if password change not successfully, setIsError to true.
            if password changed successfully, setIsError back to false, setUpdateSuccess to true, setRequestSuccess to false, setVerifySuccess to false*/}
            <button type="submit" className="submit-btn">
              Submit
            </button>
            <Link to="/" className="cancel-link">
              cancel
            </Link>
          </form>
        </div>
      )}

      {updateSuccess && (
        <div className="login-container">
          <div className="updated-container">
            <h2>password updated</h2>
            <h4>Your password has been updated</h4>
            <button className="submit-btn">
              <Link to="/" className="login-link">
                Login
              </Link>{" "}
            </button>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  text-align: left;
  justify-content: center;
  height: 100vh;

  h2 {
    color: #010101;
    padding: 3rem 0 0 2rem;
    text-transform: uppercase;
  }

  .pwd-rules {
    color: #3d3d3d;
    margin-left: 4rem;
  }

  form {
    display: grid;
    align-items: center;
    text-align: left;
    padding: 1rem 0;
  }

  .pwd-container {
    margin-left: 6rem;
    margin-bottom: 2rem;
  }

  .re-pwd {
    margin-top: 1.25rem;
  }

  label {
    display: block;
    font-size: 1.25rem;
    text-transform: capitalize;
    letter-spacing: 1px;
    margin-bottom: 0.25rem;
  }

  input {
    width: 80%;
    height: 35px;
    border: 1px solid #e6e6e6;
    border-radius: 0.25rem;
  }

  input:hover {
    border-color: #543fd3;
  }

  .error {
    color: #ee0004;
  }

  .error-sign {
    display: inline-block;
    width: 18px;
    height: 18px;
    color: #ffffff;
    text-align: center;
    border-radius: 50%;
    background-color: #ee0004;
    margin-left: 1rem;
  }

  .submit-btn {
    width: 20%;
    padding: 0.5rem;
    margin: auto;
    color: #ffffff;
    font-size: 1.25rem;
    background-color: #331e82;
    letter-spacing: 1px;
    border: 1px solid;
    border-radius: 0.25rem;
  }

  .cancel-link {
    color: #331e82;
    margin: 1.5rem 0;
    text-transform: capitalize;
    text-decoration: none;
    letter-spacing: 1px;
    font-size: 1.25rem;
    text-align: center;
  }

  .updated-container {
    display: grid;
    text-align: center;
    align-content: center;
    padding: 6rem 0;
  }

  .updated-container h2 {
    color: #089a43;
    padding: 0;
  }
  h4 {
    color: #3d3d3d;
    margin: 0;
    margin-left: 1.5rem;
    margin-bottom: 5rem;
  }

  .login-link {
    color: #ffffff;
    text-decoration: none;
  }

  @media (max-width: 576px) {
    .pwd-container,
    .pwd-rules {
      margin-left: 2rem;
    }
    .submit-btn {
      width: 30%;
    }
    .updated-container {
      padding: 4rem 1rem;
    }
    h4 {
      margin-left: 0;
    }
  }
`;

export default ResetPwd;
