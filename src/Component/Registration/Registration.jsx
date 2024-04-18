import React from "react";
import Input from "../../CommonComponent/Input";
import registrationImg from "../../assets/registration.png";

const Registration = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
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
              <Input />

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
                  autoComplete="off"
                  className="w-full py-[22px] rounded-lg px-4 border-2 border-blue-200 font-Nunito"
                />
              </div>

              <div className="my-10">
                <label
                  htmlFor="Password"
                  className="font-semibold  text-[12px] text-dark-blue  opacity-50 font-Nunito"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="12234@#lkdfj"
                  id="Password"
                  name="Password"
                  autoComplete="off"
                  className="w-full py-[22px] rounded-lg px-4 border-2 border-blue-200 font-Nunito"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-btn-color py-5 rounded-full text-white text-xl font-normal font-Nunito"
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
