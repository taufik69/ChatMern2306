import React from "react";
import GroupList from "../Component/HomeConponent/HomepageComponent/GroupList/GroupList";
import Friends from "../Component/HomeConponent/HomepageComponent/Friends/Friends";
import UserList from "../Component/HomeConponent/HomepageComponent/UserList/UserList";
import FriendRequest from "../Component/HomeConponent/HomepageComponent/FriendRequest/FriendRequest";
import Mygroups from "../Component/HomeConponent/HomepageComponent/MyGroups/Mygroups";
import BlockUser from "../Component/HomeConponent/HomepageComponent/BlocokUser/BlockUser";
import Search from "../Component/HomeConponent/HomepageComponent/HomepageCommonComponent/Search";
const Homepage = () => {
  return (
    <div>
      <div className="mb-1 mt-2">
        <Search className={"w-[99%] rounded-2xl "} />
      </div>
      <div className=" flex  flex-wrap  gap-x-8 gap-y-7 align-bottom">
        <GroupList />
        <Friends />
        <UserList />
        <FriendRequest />
        <Mygroups />
        <BlockUser />
      </div>
    </div>
  );
};

export default Homepage;
