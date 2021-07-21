import React from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "../components/Login/LoginForm";
import NextImage from "../components/Login/NextImage";
import LoginInfo from "../components/Login/LoginInfo";

import lineBreak from "../components/Login/linebreak.svg";

const Login = () => {
  const history = useHistory();
  const redirectToSignUp = () => {
    history.push("/login");
  };

  return (
    <div
      className="min-h-screen flex p-3 lg:p-0"
      style={{
        background: "url(/patterns/login.svg) no-repeat center center fixed",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full h-full bg-white p-5 lg:p-6 lg:pt-12 lg:pb-16 lg:mx-auto lg:my-auto lg:w-4/6 lg:h-5/6 rounded-3xl shadow-ds2 grid row-span-1">
        <div className="flex justify-center items-center lg:grid lg:grid-cols-2">
          <h1 className="text-black text-3xl font-extrabold text-center mb-4">
            SLIIT RSVP PORTALl
          </h1>
          <div></div>
        </div>
        <div className="flex flex-col lg:flex lg:flex-row">
          <LoginInfo login={true} />
          <div className="lg:my-auto">
            <NextImage
              classnames="hidden lg:block lg:w-3.5 lg:h-full"
              src={lineBreak}
              alt="sign up"
              layout="intrinsic"
              quality={90}
            />
          </div>
          <LoginForm login={true} loginToggleHandler={redirectToSignUp} />
        </div>
      </div>
    </div>
  );
};

export default Login;
