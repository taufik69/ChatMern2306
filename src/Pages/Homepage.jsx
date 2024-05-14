import React from "react";
import GroupList from "../Component/HomeConponent/HomepageComponent/GroupList/GroupList";
import Friends from "../Component/HomeConponent/HomepageComponent/Friends/Friends";
import UserList from "../Component/HomeConponent/HomepageComponent/UserList/UserList";
const Homepage = () => {
  return (
    <div className="flex flex-wrap  justify-between align-bottom ">
      <GroupList />
      <Friends />
      <UserList />
    </div>
  );
};

export default Homepage;
