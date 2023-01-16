import React from "react";

// Installed dependencies
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; // Decode jwt token response from OAuth

// Import assets
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logo-white.png";

// Sanity client
import { client } from "../client";


const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = response => {
    localStorage.setItem('user', JSON.stringify(response));

    let profileObject = jwt_decode(response.credential);
    const { name, picture, sub: userId  } = profileObject;

    const doc = {
      _id: userId,
      _type: 'user',
      userName: name,
      image: picture
    };

    client.createIfNotExists(doc)
      .then(() => {
        navigate("/", { replace: true });
      });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="200px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;