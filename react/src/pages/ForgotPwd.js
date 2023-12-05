import { useState } from "react";
import { RequestEmail, Verification, ResetPwd } from "../components";
const ForgotPwd = () => {
  const [requestSuccess, setRequestSuccess] = useState(true);
  const [verifySuccess, setVerifySuccess] = useState(true);
  const [email, setEmail] = useState("test@goopter.com");
  return (
    <>
      {!requestSuccess && !verifySuccess && (
        <RequestEmail
          setRequestSuccess={setRequestSuccess}
          setEmail={setEmail}
        />
      )}
      {!verifySuccess && requestSuccess && (
        <Verification setVerifySuccess={setVerifySuccess} email={email} />
      )}
      {verifySuccess && (
        <ResetPwd
          setRequestSuccess={setRequestSuccess}
          setVerifySuccess={setVerifySuccess}
        />
      )}
    </>
  );
};

export default ForgotPwd;
