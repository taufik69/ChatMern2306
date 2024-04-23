import React, { useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from "react-toastify";
import registrationImg from "../../assets/registration.png";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const Registration = () => {
  const auth = getAuth();
  const [Email, setEmail] = useState("");
  const [FullName, setFullName] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [eye, setEye] = useState(false);
  //error state
  const [EmailError, setEmailError] = useState("");
  const [FullNameError, setFullNameError] = useState("");
  const [passwordError, setpasswordError] = useState("");

  // alll handler
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // HandleEye functionality
  const HandleEye = () => {
    setEye(!eye);
  };

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3}))$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

  // HandleSignUp  funtionality implement
  const HandleSignUp = () => {
    if (!Email) {
      setEmailError(" Email Credential MIssing or Wrong ⚠");
    } else if (!regex.test(Email)) {
      setEmailError(" Email Credential MIssing or Wrong ⚠");
    } else if (!FullName) {
      setEmailError("");
      setFullNameError(" FullName Missing ⚠");
    } else if (!password) {
      setEmailError("");
      setFullNameError("");
      setpasswordError("Password  Missing or wrong ⚠");
    } else if (!passwordRegex.test(password)) {
      setEmailError("");
      setFullNameError("");
      setpasswordError("Password  Missing or wrong ⚠");
    } else {
      setloading(true);
      setEmail("");
      setFullName("");
      setpassword("");
      setpasswordError("");
      setEmailError("");
      setFullNameError("");
      //  Sign up a new user
      createUserWithEmailAndPassword(auth, Email, password)
        .then((userCredential) => {
          console.log(userCredential);
          sendEmailVerification(auth.currentUser).then(() => {
            toast("🦄 please Check Email Box", {
              position: "top-left",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          });
        })
        .catch((error) => {
          if (error.message.includes("email")) {
            toast.error(`Already Register This Email Try another Email`, {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
              style: { width: "22vw" },
            });
          } else {
            console.log(error.message);
          }
        })
        .finally(() => {
          setloading(false);
        });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <ToastContainer />
        <div className="w-1/2 h-fullvh flex justify-center items-center">
          <div>
            <h1 className="text-dark-blue font-bold text-4xl mb-[13px] font-Nunito">
              Get started with easily register
            </h1>
            <p className="text-custom-black font-normal text-xl opacity-50 font-Nunito">
              Free register and you can enjoy it
            </p>
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
                  value={Email}
                  autoComplete="off"
                  className="w-full py-[22px] rounded-lg px-4 border-2 border-blue-200 font-Nunito"
                  onChange={(event) => setEmail(event.target.value)}
                />
                {EmailError && (
                  <span className="text-red-500 font-Nunito text-md font-normal mt-3 ml-1 block">
                    {EmailError}
                  </span>
                )}
              </div>

              <div className="my-10">
                <label
                  htmlFor="fullname"
                  className="font-semibold  text-[12px] text-dark-blue  opacity-50 font-Nunito"
                >
                  Full name
                </label>
                <input
                  type="text"
                  placeholder="Ladushing GTG"
                  id="fullname"
                  name="fullname"
                  value={FullName}
                  autoComplete="off"
                  className="w-full py-[22px] rounded-lg px-4 border-2 border-blue-200 font-Nunito"
                  onChange={(event) => setFullName(event.target.value)}
                />
                {FullNameError && (
                  <span className="text-red-500 font-Nunito text-md font-normal mt-3 ml-1 block">
                    {FullNameError}
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
                  value={password}
                  autoComplete="off"
                  className="w-full py-[22px] rounded-lg px-4 border-2 border-blue-200 font-Nunito"
                  onChange={(event) => setpassword(event.target.value)}
                />
                {passwordError && (
                  <span className="text-red-500 font-Nunito text-md font-normal mt-3 ml-1 block">
                    {passwordError}
                  </span>
                )}
                <div
                  className="absolute top-1/2 right-8 translate-y-[50%] cursor-pointer"
                  onClick={HandleEye}
                >
                  {eye ? <FaEyeSlash /> : <FaRegEye />}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-btn-color py-5 rounded-full text-white text-xl font-normal font-Nunito relative"
                onClick={HandleSignUp}
              >
                {loading && (
                  <div className="absolute left-[38%] top-[36%] h-5 w-5 bg-white rounded-full animate-spin border-t-4 border-b-4  border-cyan-500"></div>
                )}
                Sign up
              </button>
            </form>
            <div className="text-center mt-[35px]">
              <p className="text-[#03014C] font-sansSerif">
                Already have an account ?{" "}
                <span className="text-[#EA6C00] text-[18px] font-bold font-sansSerif align-middle hover:underline hover: decoration-indigo-500">
                  Sign In
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2 bg-red-400  h-fullvh">
          <img
            src={registrationImg}
            alt={registrationImg}
            className="min-w-full h-screen"
          />
        </div>
      </div>
    </>
  );
};

export default Registration;
