import React, { useEffect, useState } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import friend3 from "../../../../assets/HomepageImage/Friends/f3.gif";

import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
import { FaUser } from "react-icons/fa";
import { fireToastError } from "../../../../Utils/Utils";
import Modal from "react-modal";

const Mygroups = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [GroupList, setGroupList] = useState([]);
  const [GroupRequest, setGroupRequest] = useState([]);
  const [GroupRquestItem, setGroupRquestItem] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "38%",
    },
  };

  function openModal(groupKey) {
    setIsOpen(true);
    const GroupRequestDbRef = ref(db, "GroupRequest/");
    onValue(GroupRequestDbRef, (snapshot) => {
      let groupRequestItem = [];
      snapshot.forEach((item) => {
        if (item.val().GroupKey === groupKey) {
          groupRequestItem.push({ ...item.val(), groupRequestKey: item.key });
        }
      });
      setGroupRquestItem(groupRequestItem);
    });
  }

  function closeModal() {
    setIsOpen(false);
  }

  /**
   * todo : fetch all friend in friends database
   *
   */

  useEffect(() => {
    const friendsDbRef = ref(db, "GroupList/");
    onValue(friendsDbRef, (snapshot) => {
      let GroupblankArr = [];
      snapshot.forEach((item) => {
        if (item.val().AdminId === auth.currentUser.uid) {
          GroupblankArr.push({
            ...item.val(),
            GroupKey: item.key,
          });
        }
      });
      setGroupList(GroupblankArr);
    });
  }, [auth.currentUser.uid, db]);

  /**
   * todo :GroupRequest database
   */

  useEffect(() => {
    const GroupRequestDbRef = ref(db, "GroupRequest/");
    onValue(GroupRequestDbRef, (snapshot) => {
      let groupRequestblankArr = [];
      snapshot.forEach((item) => {
        if (item.val().AdminId === auth.currentUser.uid) {
          groupRequestblankArr.push(item.val().AdminId + item.val().GroupKey);
        }
      });
      setGroupRequest(groupRequestblankArr);
    });
  }, [auth.currentUser.uid, db]);

  /**
   * todo: handleReject funtin implement
   * @param({item})
   */

  const handleJoinRequestRejected = (item) => {
    remove(ref(db, "GroupRequest/" + item.groupRequestKey)).then(() => {
      closeModal();
      fireToastError(`${item.GroupName} Request Removed`);
      set(push(ref(db, "notification/")), {
        NotificationName: item.GroupName,
        NotificationNamePhoto: item.GroupPhotUrl,
        NotificationMessage: `${item.GroupName} Reject Your  Group Join Request`,
        createdAtDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
      });
    });
  };

  /**
   * todo : acceptGroupRequest funtion implement
   * @params({item})
   */
  const acceptGroupRequest = (item) => {
    set(push(ref(db, "GroupMember/")), {
      AdminId: item.AdminId,
      AdminUserName: item.AdminUserName,
      AdminEmail: item.AdminEmail,
      GroupKey: item.GroupKey,
      GroupName: item.GroupName,
      GroupPhotUrl: item.GroupPhotUrl,
      GroupTagName: item.GroupTagName,
      GroupMemberName: item.whoWantToJoinGroupName,
      GroupJoinMemberId: item.whoWantToJoinGroupId,
      GroupjoinMemberPhoto: item.GroupPhotUrl,
      createdAtDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
    }).then(() => {
      remove(ref(db, "GroupRequest/" + item.groupRequestKey));
      closeModal();
      set(push(ref(db, "notification/")), {
        NotificationName: item.GroupName,
        NotificationNamePhoto: item.GroupPhotUrl,
        NotificationMessage: `${item.GroupName} Acept  Your  Group Join Request`,
        createdAtDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
      });
    });
  };
  return (
    <>
      <div className="w-[30%] self-end">
        <div className="my-5 flex items-center justify-between ">
          <h1 className="font-Poppins text-xl font-semibold text-custom-black">
            <button
              type="button"
              className="relative inline-flex items-center rounded-lg bg-gradient-to-r from-[#614385] to-[#4a5dab]  px-5 py-2.5 text-center text-sm font-medium text-white "
            >
              <FaUser className="mr-2 text-2xl" />
              My Groups
              <div className="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white dark:border-gray-900">
                {GroupList.length > 0 ? GroupList.length : 0}
              </div>
            </button>
          </h1>
          <span>
            <IoEllipsisVerticalSharp className="text-2xl text-btn-color" />
          </span>
        </div>
        <div className=" h-[347px] w-full  overflow-y-scroll  rounded-xl shadow-xl scrollbar-thin  scrollbar-track-gray-400 scrollbar-thumb-sky-700">
          <div className="divide-y-[1px] divide-gray-200">
            {GroupList?.map((item) => (
              <div
                className="flex items-center justify-between px-7 py-5"
                key={item.id}
              >
                <div className="relative h-[70px] w-[70px] cursor-pointer rounded-full bg-blue-200">
                  {item.GroupPhotUrl ? (
                    <picture>
                      <img
                        src={item.GroupPhotUrl}
                        alt={item.GroupPhotUrl}
                        className="s-full h-full rounded-full object-cover shadow-lg"
                      />
                    </picture>
                  ) : (
                    <picture>
                      <img
                        src={friend3}
                        alt={friend3}
                        className="s-full h-full rounded-full object-cover shadow-lg"
                      />
                    </picture>
                  )}
                  {item.active && (
                    <span class="absolute bottom-1 right-1 flex h-4 w-4">
                      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span class="relative inline-flex h-4 w-4 rounded-full bg-green-500"></span>
                    </span>
                  )}
                </div>

                <div className="flex w-[45%]  flex-col items-start justify-center text-wrap   ">
                  <h1 className="font-Poppins text-xl font-semibold text-custom-black">
                    {item.GroupName ? item.GroupName : "Name Xyz"}
                  </h1>
                  <p className="font-Poppins text-[18px] font-medium text-[#4D4D4D] opacity-75">
                    {item.GroupTagName ? item.GroupTagName : "hello xyz"}
                  </p>
                </div>

                <div>
                  {GroupRequest.includes(
                    auth.currentUser.uid + item.GroupKey,
                  ) ? (
                    <div className="flex flex-col gap-y-3">
                      <button
                        className=" relative inline-flex  items-center rounded-lg bg-gradient-to-r from-[#614385] to-[#4a5dab]  px-5 py-2.5 text-center text-sm font-medium text-white "
                        onClick={() => openModal(item.GroupKey)}
                      >
                        See Group Request
                      </button>
                    </div>
                  ) : (
                    <p className="font-Poppins text-lg text-custom-black opacity-50">
                      {moment(item.createdAtDate)
                        ? moment(item.createdAtDate).fromNow()
                        : "Today, 8:56pm"}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {GroupList.length === 0 && (
            <div className="flex h-[38vh] items-center justify-center">
              <div
                class="mb-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400"
                role="alert"
              >
                <span class="font-medium"></span> No Group Availavil here
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="mb-10 flex items-start justify-end">
          <button
            onClick={closeModal}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 font-bold text-white"
          >
            x
          </button>
        </div>
        <hr className="mb-4" />
        <div>
          {GroupRquestItem?.map((item) => (
            <>
              <div className="flex flex-col items-center justify-between px-7 py-5">
                <div className="relative h-[70px] w-[70px] cursor-pointer rounded-full bg-blue-200">
                  {item.WhoWantToJoinGroupPhoto ? (
                    <picture>
                      <img
                        src={item.WhoWantToJoinGroupPhoto}
                        alt={item.WhoWantToJoinGroupPhoto}
                        className="s-full h-full rounded-full object-cover shadow-lg"
                      />
                    </picture>
                  ) : (
                    <picture>
                      <img
                        src={friend3}
                        alt={friend3}
                        className="s-full h-full rounded-full object-cover shadow-lg"
                      />
                    </picture>
                  )}
                </div>

                <div className="flex w-[95%]  flex-col items-center justify-center text-wrap   ">
                  <h1 className="font-Poppins text-xl font-semibold text-custom-black">
                    {item.whoWantToJoinGroupName
                      ? `${item.whoWantToJoinGroupName} Wants to join ${item.GroupName}`
                      : "Name Xyz"}
                  </h1>
                </div>
              </div>
              <hr className="mb-4 mt-3" />
              <div
                className="flex items-center justify-between px-7 py-5"
                key={item.id}
              >
                <div className="relative h-[70px] w-[70px] cursor-pointer rounded-full bg-blue-200">
                  {item.GroupPhotUrl ? (
                    <picture>
                      <img
                        src={item.GroupPhotUrl}
                        alt={item.GroupPhotUrl}
                        className="s-full h-full rounded-full object-cover shadow-lg"
                      />
                    </picture>
                  ) : (
                    <picture>
                      <img
                        src={friend3}
                        alt={friend3}
                        className="s-full h-full rounded-full object-cover shadow-lg"
                      />
                    </picture>
                  )}
                </div>

                <div className="flex w-[45%]  flex-col items-start justify-center text-wrap   ">
                  <h1 className="font-Poppins text-xl font-semibold text-custom-black">
                    {item.GroupName ? item.GroupName : "Name Xyz"}
                  </h1>
                  <p className="font-Poppins text-[18px] font-medium text-[#4D4D4D] opacity-75">
                    {item.GroupTagName ? item.GroupTagName : "hello xyz"}
                  </p>
                </div>

                <div>
                  <div className="flex  gap-x-3">
                    <button
                      className="relative inline-flex items-center rounded-lg bg-gradient-to-r from-[#614385] to-[#4a5dab]  px-5 py-2.5 text-center text-sm font-medium text-white "
                      onClick={() => acceptGroupRequest(item)}
                    >
                      Accept
                    </button>

                    <button
                      className="relative inline-flex items-center rounded-lg bg-gradient-to-r from-[#a42a2a] to-[#4a5dab]  px-5 py-2.5 text-center text-sm font-medium text-white "
                      onClick={() => handleJoinRequestRejected(item)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default Mygroups;
