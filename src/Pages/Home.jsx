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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      setuserInfo({
        ...userInfo,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        email: user.email,
      });
    });
  }, [userInfo.emailVerified]);

  return (
    <div>
      {userInfo.emailVerified ? (
        <div className="flex p-7">
          <HomeLeft active={"home"} />
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
