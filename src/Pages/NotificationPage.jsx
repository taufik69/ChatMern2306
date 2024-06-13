import React from "react";
import Search from "../Component/HomeConponent/HomepageComponent/HomepageCommonComponent/Search";
import Notification from "../Component/NotificationComponent/Notification";

const NotificationPage = () => {
  return (
    <div className="py-5">
      <Search className={"w-full"} />
      <div>
        <Notification  />
      </div>
    </div>
  );
};

export default NotificationPage;
