import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
const LoginLeft = () => {
  const auth = getAuth();
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
          console.log(userinfo);
        })
        .error((err) => {
          console.log(err);
        })
        .finally(() => {
          setloading(false);
        });
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh] w-[55%]">
      <div className="">
        <h1 className="text-dark-blue font-bold text-4xl mb-[13px] font-Nunito">
          Login to your account!
        </h1>
        <div className="flex items-center justify-center border-2 border-gray-200 py-5  w-[250px] rounded-2xl my-10">
          <div className="flex gap-x-2 items-center">
            <FcGoogle />
            <p className="text-[#03014C]  font-semibold text-[14px] font-sansSerif">
              Login with Google
            </p>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="my-10">
              <label
                htmlFor="email"
                className="font-semibold  text-[12px] text-dark-blue  opacity-50 font-Nunito"
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
                className="w-full py-[22px] rounded-lg px-4 border-b-2 border-blue-200 font-Nunito"
                onChange={HandleInputField}
              />
              {error.EmailError && (
                <span className="text-red-500 font-Nunito text-md font-normal mt-3 ml-1 block">
                  {error.EmailError}
                </span>
              )}
            </div>

            <div className="my-10 relative">
              <label
                htmlFor="Password"
                className="font-semibold  text-[12px] text-dark-blue  opacity-50 font-Nunito"
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
                className="w-full py-[22px] rounded-lg px-4 border-b-2 border-blue-200 font-Nunito"
                onChange={HandleInputField}
              />
              {error.passwordError && (
                <span className="text-red-500 font-Nunito text-md font-normal mt-3 ml-1 block">
                  {error.passwordError}
                </span>
              )}

              <div
                className="absolute top-1/2 right-8 translate-y-[50%] cursor-pointer"
                onClick={() => setEye(!eye)}
              >
                {eye ? <FaEyeSlash /> : <FaRegEye />}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-btn-color py-5 rounded-xl text-white text-xl font-normal font-Nunito relative"
              onClick={Handlelogin}
            >
              {loading && (
                <div className="absolute left-[24%] top-[36%] h-5 w-5 bg-white rounded-full animate-spin border-t-4 border-b-4  border-cyan-500"></div>
              )}
              Login to Continue
            </button>
          </form>
        </div>

        <div className="mt-5">
          <p className="text-[#03014C] font-sansSerif font-normal text-lg">
            Don’t have an account ?{" "}
            <span className="text-[#EA6C00] font-bold text-xl cursor-pointer hover:underline">
              <Link to={"/"}>Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginLeft;
