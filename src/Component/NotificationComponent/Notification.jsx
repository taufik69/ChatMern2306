import React, { useEffect, useState } from "react";
import img from "../../assets/HomepageImage/Friends/f3.gif";
import { getDatabase, ref, onValue } from "firebase/database";
import moment from "moment/moment";
import { getAuth } from "firebase/auth";
const Notification = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [notification, setnotification] = useState([]);
  /**
   * todo : fetch all friend in friends database
   *
   */
  useEffect(() => {
    const friendsDbRef = ref(db, "notification/");
    onValue(friendsDbRef, (snapshot) => {
      let notificationblankArr = [];
      snapshot.forEach((item) => {
        notificationblankArr.push({
          ...item.val(),
          notificationKey: item.key,
        });
      });
      setnotification(notificationblankArr);
    });
  }, []);

  return (
    <div className="mt-10 flex h-[79vh] flex-col  items-stretch justify-start gap-y-10 overflow-y-scroll">
      {notification?.map((notification) => (
        <div class="flex items-start gap-2.5">
          <img
            class="h-10 w-10 rounded-full shadow"
            src={notification.NotificationNamePhoto}
            alt={notification.NotificationNamePhoto}
          />
          <div class="leading-1.5 flex w-full  flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700">
            <div class="flex items-center space-x-2 rtl:space-x-reverse">
              <span class="text-sm font-semibold text-gray-900 dark:text-white">
                {notification.NotificationName}
              </span>
              <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                {moment(notification.createdAtDate).calendar()}
              </span>
            </div>
            <p class="py-2.5 text-sm font-normal text-gray-900 dark:text-white">
              {notification.NotificationMessage}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
