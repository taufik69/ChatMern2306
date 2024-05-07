import React, { useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from "react-toastify";
import registrationImg from "../../assets/registration.png";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const auth = getAuth();
  const navigate = useNavigate();
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
            updateProfile(auth.currentUser, {
              displayName: "Jane Q. User",
              photoURL: "https://example.com/jane-q-user/profile.jpg",
            }).then(() => {
              console.log("profile update done");
            });

            setTimeout(() => {
              navigate("/login");
            }, 3000);
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
      <div className="flex items-center justify-between">
        <ToastContainer />
        <div className="flex h-fullvh w-1/2 items-center justify-center">
          <div>
            <h1 className="mb-[13px] font-Nunito text-4xl font-bold text-dark-blue">
              Get started with easily register
            </h1>
            <p className="font-Nunito text-xl font-normal text-custom-black opacity-50">
              Free register and you can enjoy it
            </p>
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
                  value={Email}
                  autoComplete="off"
                  className="w-full rounded-lg border-2 border-blue-200 px-4 py-[22px] font-Nunito"
                  onChange={(event) => setEmail(event.target.value)}
                />
                {EmailError && (
                  <span className="text-md ml-1 mt-3 block font-Nunito font-normal text-red-500">
                    {EmailError}
                  </span>
                )}
              </div>

              <div className="my-10">
                <label
                  htmlFor="fullname"
                  className="font-Nunito  text-[12px] font-semibold  text-dark-blue opacity-50"
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
                  className="w-full rounded-lg border-2 border-blue-200 px-4 py-[22px] font-Nunito"
                  onChange={(event) => setFullName(event.target.value)}
                />
                {FullNameError && (
                  <span className="text-md ml-1 mt-3 block font-Nunito font-normal text-red-500">
                    {FullNameError}
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
                  value={password}
                  autoComplete="off"
                  className="w-full rounded-lg border-2 border-blue-200 px-4 py-[22px] font-Nunito"
                  onChange={(event) => setpassword(event.target.value)}
                />
                {passwordError && (
                  <span className="text-md ml-1 mt-3 block font-Nunito font-normal text-red-500">
                    {passwordError}
                  </span>
                )}
                <div
                  className="absolute right-8 top-1/2 translate-y-[50%] cursor-pointer"
                  onClick={HandleEye}
                >
                  {eye ? <FaEyeSlash /> : <FaRegEye />}
                </div>
              </div>
              <button
                type="submit"
                className="relative w-full rounded-full bg-btn-color py-5 font-Nunito text-xl font-normal text-white"
                onClick={HandleSignUp}
              >
                {loading && (
                  <div className="absolute left-[38%] top-[36%] h-5 w-5 animate-spin rounded-full border-b-4 border-t-4 border-cyan-500  bg-white"></div>
                )}
                Sign up
              </button>
            </form>
            <div className="mt-[35px] text-center">
              <p className="font-sansSerif text-[#03014C]">
                Already have an account ?{" "}
                <span className="hover: align-middle font-sansSerif text-[18px] font-bold text-[#EA6C00] decoration-indigo-500 hover:underline">
                  <Link to={"/login"}>Sign In</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="h-fullvh w-1/2  bg-red-400">
          <img
            src={registrationImg}
            alt={registrationImg}
            className="h-screen min-w-full"
          />
        </div>
      </div>
    </>
  );
};

export default Registration;
