import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage";
import ChatPage from "./Pages/ChatPage";
import NotificationPage from "./Pages/NotificationPage";
import SettingsPage from "./Pages/SettingsPage";
import Homepage from "./Pages/Homepage";
import EmailVerified from "./Component/HomeConponent/EmailVerified";
import { ToastContainer } from "react-toastify";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Home />}>
        <Route index path="" element={<Homepage />}></Route>
        <Route path="/chat" element={<ChatPage />}></Route>
        <Route path="/notification" element={<NotificationPage />}></Route>
        <Route path="/settings" element={<SettingsPage />}></Route>
      </Route>
      <Route path="/email-verified" element={<EmailVerified />} />
      <Route path="/*" element={<h1>Error page</h1>} />
    </Route>,
  ),
);

function App() {
  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>;
    </div>
  );
}

export default App;
