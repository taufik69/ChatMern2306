import React, { useState, createRef, useEffect } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import Modal from "react-modal";
import { ImCancelCircle } from "react-icons/im";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import moment from "moment/moment";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import {
  getDatabase,
  push,
  ref as dbRef,
  set,
  onValue,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { fireToastSucess, fireToastError } from "../../../../Utils/Utils";
const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "45%",
    height: "100%",
  },
};

const GroupList = ({ isChat = false }) => {
  const storage = getStorage();
  const db = getDatabase();
  const auth = getAuth();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(defaultSrc);
  const [loading, setloading] = useState(false);
  const [AllGroupList, setAllGroupList] = useState([]);
  const [GroupRequest, setGroupRequest] = useState([]);
  const [GroupInfo, setGroupinfo] = useState({
    grouprTagName: "",
    groupname: "",
    groupPhoto: "",
  });
  useEffect(() => {
    const GroupDbRef = dbRef(db, "GroupList/");
    onValue(GroupDbRef, (snapshot) => {
      let GroupblankArr = [];
      snapshot.forEach((item) => {
        if (item.val().AdminId !== auth.currentUser.uid) {
          GroupblankArr.push({
            ...item.val(),
            GroupKey: item.key,
          });
        }
      });
      setAllGroupList(GroupblankArr);
    });
  }, []);

  const cropperRef = createRef();
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  /**
   * futntion : HanldeOpenModal
   *  @param: ({})
   */

  const HanldeOpenModal = () => {
    openModal();
  };

  /**
   * todo : cropper funtionality
   */
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  /**
   * todo : cropimg functionality
   */

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setGroupinfo({
        ...GroupInfo,
        groupPhoto: cropperRef.current?.cropper.getCroppedCanvas().toDataURL(),
      });
      fireToastSucess("Image Croping Done", "top-right", 4000);
    }
  };

  /**
   * todo : handleInput funcionality
   * params ({event})
   */

  const handleInput = (event) => {
    setGroupinfo({
      ...GroupInfo,
      [event.target.id]: event.target.value,
    });
  };
  /*
  
   * todo : HandleGroup funtion implementaiton
   * param: ({})
   */
  const HandleGroup = () => {
    const { grouprTagName, groupname, groupPhoto } = GroupInfo;
    if (!grouprTagName) {
      fireToastError("GroupTag Name Missing", "top-center", 6000);
    } else if (!groupname) {
      fireToastError("GroupName Missing", "top-center", 6000);
    } else if (!groupPhoto) {
      fireToastError("groupPhotos Missing", "top-center", 6000);
    } else {
      setloading(true);
      const storageRef = ref(storage, `GroupImages/images${uuidv4()}`);
      // Data URL string
      const photoBase64Url = groupPhoto;
      uploadString(storageRef, photoBase64Url, "data_url")
        .then((snapshot) => {
          console.log("Uploaded a data_url string!", snapshot);
        })
        .then(() => {
          getDownloadURL(storageRef).then((downloadURL) => {
            set(push(dbRef(db, "GroupList/")), {
              GroupName: groupname,
              GroupTagName: grouprTagName,
              GroupPhotUrl: downloadURL,
              AdminId: auth.currentUser.uid,
              AdminUserName: auth.currentUser.displayName,
              AdminEmail: auth.currentUser.email,
              AdminPhotUrl: auth.currentUser.photoURL,
              createdAtDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
            })
              .then(() => {
                fireToastSucess(
                  "Group Create Sucessfully ",
                  "bottom-center",
                  4000,
                );
              })
              .catch((err) => {
                fireToastError(err.message, "top-center", 3000);
              })
              .finally(() => {
                setloading(false);
                setGroupinfo({
                  grouprTagName: "",
                  groupname: "",
                  groupPhoto: "",
                });
                setImage("");
                closeModal();
              });
          });
        });
    }
  };

  /**
   * todo : handleJoin funtion implement
   * @param({})
   */

  const handleJoin = (item) => {
    set(push(dbRef(db, "GroupRequest/")), {
      ...item,
      whoWantToJoinGroupId: auth.currentUser.uid,
      whoWantToJoinGroupName: auth.currentUser.displayName,
      WhoWantToJoinGroupPhoto: auth.currentUser.photoURL,
      createdAtDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
    })
      .then(() => {
        fireToastSucess(
          `${auth.currentUser.displayName} Want to Join Request Send To ${item.GroupName}`,
          "top-right",
        );
      })
      .then(() => {
        set(push(dbRef(db, "notification/")), {
          NotificationName: auth.currentUser.displayName,
          NotificationNamePhoto: auth.currentUser.photoURL,
          NotificationMessage: `${auth.currentUser.displayName} Send You a Group Join Request`,
          createdAtDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
        });
      });
  };

  /**
   * todo :GroupRequest database
   */

  useEffect(() => {
    const GroupRequestDbRef = dbRef(db, "GroupRequest/");
    onValue(GroupRequestDbRef, (snapshot) => {
      let groupRequestblankArr = [];
      snapshot.forEach((item) => {
        if (item.val().whoWantToJoinGroupId === auth.currentUser.uid) {
          groupRequestblankArr.push(
            item.val().whoWantToJoinGroupId + item.val().GroupKey,
          );
        }
      });
      setGroupRequest(groupRequestblankArr);
    });
  }, [auth.currentUser.uid, db]);

  return (
    <div className={`${isChat ? "w-full " : "w-[34%]"}`}>
      <div className="my-5 flex items-center justify-between">
        <h1 className="font-Poppins text-xl font-semibold text-custom-black">
          <button
            type="button"
            className="relative inline-flex items-center rounded-lg bg-gradient-to-r from-[#614385] to-[#4a5dab]  px-5 py-2.5 text-center text-sm font-medium text-white "
          >
            Groups
            <div className="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white dark:border-gray-900">
              {AllGroupList.length > 0 ? AllGroupList.length : 0}
            </div>
          </button>
        </h1>
        <button
          onClick={HanldeOpenModal}
          type="button"
          className="relative inline-flex  animate-bounce items-center rounded-lg bg-gradient-to-r from-[#614385] to-[#4a5dab]  px-5 py-2.5 text-center text-sm font-medium text-white "
        >
          Create Group
        </button>
      </div>
      <div className="mt-10 h-[347px]  w-full overflow-y-scroll  rounded-xl shadow-xl scrollbar-thin  scrollbar-track-gray-400 scrollbar-thumb-sky-700">
        <div className=" divide-y-[1px] divide-gray-200">
          {AllGroupList?.map((item) => (
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
                <button
                  type="button"
                  onClick={() => handleJoin(item)}
                  className="relative inline-flex items-center rounded-lg bg-gradient-to-r from-[#614385] to-[#4a5dab]  px-5 py-2.5 text-center text-sm font-medium text-white "
                >
                  {GroupRequest.includes(auth.currentUser.uid + item.GroupKey)
                    ? "join Pending"
                    : "join"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* modal body  */}
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="">
          <button
            onClick={() => closeModal()}
            className="flex h-[34px]  w-[34px] items-center justify-center rounded-full  bg-red-500 text-center text-xl   text-white"
          >
            <ImCancelCircle />
          </button>

          <div>
            <h1 className="flex justify-center py-8 font-Nunito text-3xl font-bold text-black">
              Group Information
            </h1>
            <form action="#" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-y-3 ">
                <label htmlFor="groupname">
                  GroupName{" "}
                  <span className="align-text-top text-red-500">*</span>
                </label>
                <input
                  className="border-[1px] border-gray-200 p-3"
                  type="text"
                  id="groupname"
                  name="groupname"
                  placeholder="Group Name"
                  value={GroupInfo.groupname}
                  onChange={handleInput}
                />
              </div>

              <div className="flex flex-col gap-y-3 ">
                <label htmlFor="groupname">
                  GroupTagName
                  <span className="align-text-top text-red-500">*</span>
                </label>
                <input
                  className="border-[1px] border-gray-200 p-3"
                  type="text"
                  id="grouprTagName"
                  name="grouprTagName"
                  placeholder="Group TagName"
                  onChange={handleInput}
                  value={GroupInfo.grouprTagName}
                />
              </div>

              <div className="flex flex-col gap-y-3 ">
                <label htmlFor="groupname">
                  GroupPhoto
                  <span className="align-text-top text-red-500">*</span>
                </label>
                <div className="flex items-center justify-between">
                  <input
                    type="file"
                    id="groupPhoto"
                    name="groupPhoto"
                    onChange={onChange}
                  />
                  <button
                    className="rounded-lg  bg-gradient-to-r from-[#614385] to-[#4a5dab]  px-5 py-1 font-Poppins text-xl font-semibold text-white"
                    onClick={getCropData}
                  >
                    Crop Image
                  </button>
                </div>
                <div className="flex items-center justify-between gap-x-10">
                  <div className="h-[222px] w-[50%]">
                    <Cropper
                      ref={cropperRef}
                      style={{ height: "100%", width: "100%" }}
                      zoomTo={0.5}
                      initialAspectRatio={2}
                      preview=".img-preview"
                      src={image}
                      viewMode={1}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                      guides={true}
                    />
                  </div>
                  <div className="box">
                    <div className="img-preview"></div>
                  </div>
                </div>
              </div>
              <button
                className="mt-5 w-full rounded-full bg-green-600 py-8 font-Nunito font-bold  text-white"
                onClick={HandleGroup}
              >
                {loading ? "loadign ...." : "Create Group"}
              </button>
            </form>
          </div>
        </div>
      </Modal>

      {/* modal body  */}
    </div>
  );
};

export default GroupList;
