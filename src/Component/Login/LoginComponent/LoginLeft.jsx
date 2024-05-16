import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const LoginLeft = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [eye, setEye] = useState(false);
  const [loading, setloading] = useState(false);

  const [inputValue, setinputValue] = useState({
    email: "",
    Password: "",
  });

  const [error, setError] = useState({
    EmailError: "",
    passwordError: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  //  HandleInputField functinality implementation
  const HandleInputField = (e) => {
    setinputValue({
      ...inputValue,
      [e.target.id]: e.target.value,
    });
  };
  // regex for checking password and email
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3}))$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  //   Handlelogin function implementation
  const Handlelogin = () => {
    if (!inputValue.email) {
      setError({
        ...error,
        EmailError: "Email Missing",
      });
    } else if (!regex.test(inputValue.email)) {
      setError({
        ...error,
        EmailError: "Email Missing or wrong",
      });
    } else if (!inputValue.Password) {
      setError({
        ...error,
        passwordError: "password Missing or Wrong",
      });
    } else if (!passwordRegex.test(inputValue.Password)) {
      setError({
        ...error,
        passwordError: "password  Missing or Wrong",
      });
    } else {
      setinputValue({
        email: "",
        Password: "",
      });
      setError({
        EmailError: "",
        passwordError: "",
      });
      setloading(true);
      signInWithEmailAndPassword(auth, inputValue.email, inputValue.Password)
        .then((userinfo) => {
          localStorage.setItem("UserToken", userinfo._tokenResponse.idToken);
          navigate("/");
        })
        .catch((err) => {
          console.log(" login err", err);
        })
        .finally(() => {
          setloading(false);
        });
    }
  };

  // HanldeLoginWithGoogle functionality implementaion
  const HanldeLoginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;

      if (user) {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex h-[100vh] w-[55%] items-center justify-center">
      <div className="">
        <h1 className="mb-[13px] font-Nunito text-4xl font-bold text-dark-blue">
          Login to your account!
        </h1>
        <div
          className="my-10 flex w-[250px] cursor-pointer items-center justify-center  rounded-2xl border-2 border-gray-200 py-5"
          onClick={HanldeLoginWithGoogle}
        >
          <div className="flex items-center gap-x-2">
            <FcGoogle />
            <p className="font-sansSerif  text-[14px] font-semibold text-[#03014C]">
              Login with Google
            </p>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="my-10">
              <label
                htmlFor="email"
                className="font-Nunito  text-[12px] font-semibold  text-dark-blue opacity-50"
              >
                Email Address
              </label>
              <input
                type="text"
                placeholder="Ladushing691@gmail.com"
                id="email"
                name="email"
                autoComplete="off"
                value={inputValue.email}
                className="w-full rounded-lg border-b-2 border-blue-200 px-4 py-[22px] font-Nunito"
                onChange={HandleInputField}
              />
              {error.EmailError && (
                <span className="text-md ml-1 mt-3 block font-Nunito font-normal text-red-500">
                  {error.EmailError}
                </span>
              )}
            </div>

            <div className="relative my-10">
              <label
                htmlFor="Password"
                className="font-Nunito  text-[12px] font-semibold  text-dark-blue opacity-50"
              >
                Password
              </label>
              <input
                type={eye ? "text" : "password"}
                placeholder="12234@#lkdfj"
                id="Password"
                name="Password"
                value={inputValue.Password}
                autoComplete="off"
                className="w-full rounded-lg border-b-2 border-blue-200 px-4 py-[22px] font-Nunito"
                onChange={HandleInputField}
              />
              {error.passwordError && (
                <span className="text-md ml-1 mt-3 block font-Nunito font-normal text-red-500">
                  {error.passwordError}
                </span>
              )}

              <div
                className="absolute right-8 top-1/2 translate-y-[50%] cursor-pointer"
                onClick={() => setEye(!eye)}
              >
                {eye ? <FaEyeSlash /> : <FaRegEye />}
              </div>
            </div>
            <button
              type="submit"
              className="relative w-full rounded-xl bg-btn-color py-5 font-Nunito text-xl font-normal text-white"
              onClick={Handlelogin}
            >
              {loading && (
                <div className="absolute left-[24%] top-[36%] h-5 w-5 animate-spin rounded-full border-b-4 border-t-4 border-cyan-500  bg-white"></div>
              )}
              Login to Continue
            </button>
          </form>
        </div>

        <div className="mt-5">
          <p className="font-sansSerif text-lg font-normal text-[#03014C]">
            Don’t have an account ?{" "}
            <span className="cursor-pointer text-xl font-bold text-[#EA6C00] hover:underline">
              <Link to={"/registration"}>Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginLeft;
