import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import EmailVerified from "../Component/HomeConponent/EmailVerified";
import HomeLeft from "../Component/HomeConponent/HomeLeft/HomeLeft";
import HomeRight from "../Component/HomeConponent/HomeRight/HomeRight";

const Home = () => {
  const auth = getAuth();

  const [userInfo, setuserInfo] = useState({
    emailVerified: false,
    displayName: "",
    email: "",
  });
  const [userIsVerified, setuserIsVerified] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setuserInfo({
        ...userInfo,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        email: user.email,
      });
    });
  }, [userIsVerified]);

  return (
    <div className="h-[100vh] ">
      {userInfo.emailVerified ? (
        <div className="flex ">
          <HomeLeft />
          <HomeRight />
        </div>
      ) : (
        <EmailVerified
          email={userInfo.email}
          displayName={userInfo.displayName}
        />
      )}
    </div>
  );
};

export default Home;
