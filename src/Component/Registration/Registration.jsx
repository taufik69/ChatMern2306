import React, { useState } from "react";
import Input from "../../CommonComponent/Input";
import registrationImg from "../../assets/registration.png";

const Registration = () => {
  // all state in this page
  const [Email, setEmail] = useState("");
  const [FullName, setFullName] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleInput = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "FullName") {
      setFullName(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const FullNamePattern = /^[a-zA-Z]/;
  //  handleClick button functionality
  const handleClick = () => {
    if (!FullNamePattern.test(FullName)) {
      console.log("kcion nai");
    }
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="w-1/2 h-fullvh flex justify-center items-center">
          <div>
            <h1 className="text-dark-blue font-bold text-4xl mb-[13px] font-Nunito">
              Get started with easily register
            </h1>
            <p className="text-custom-black font-normal text-xl opacity-50 font-Nunito">
              Free register and you can enjoy it
            </p>
            <form onSubmit={handleSubmit}>
              <Input
                labelText={"Email Address"}
                inputType="text"
                placeholderText={"Ladushing691@gmail.com"}
                id={"email"}
                name={"email"}
                className={
                  "w-full py-[22px] rounded-lg px-4 border-2 border-blue-200 font-Nunito"
                }
                onChangeInput={handleInput}
              />
              <Input
                labelText={"Full name"}
                inputType="text"
                placeholderText={"Ladushing GTG"}
                id={"FullName"}
                name={"FullName"}
                className={
                  "w-full py-[22px] rounded-lg px-4 border-2 border-blue-200 font-Nunito"
                }
                onChangeInput={handleInput}
              />

              <Input
                labelText={"Password"}
                inputType="password"
                placeholderText={"12234@#lkdfj"}
                id={"password"}
                name={"password"}
                className={
                  "w-full py-[22px] rounded-lg px-4 border-2 border-blue-200 font-Nunito"
                }
                onChangeInput={handleInput}
              />

              <button
                type="submit"
                className="w-full bg-btn-color py-5 rounded-full text-white text-xl font-normal font-Nunito"
                onClick={handleClick}
              >
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
