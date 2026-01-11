import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";
import AddRequest from "../Pages/Dashboard/AddRequest/AddRequest";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import MyRequest from "../Pages/Dashboard/MyRequest/MyRequest";
import PrivateRoute from "./PrivateRoute";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import PaymentCancel from "../Pages/PaymentCancel/PaymentCancel";
import SearchRequest from "../Pages/SearchRequest/SearchRequest";
import Donate from "../Pages/Donate/Donate";
import Profile from "../Pages/Dashboard/Profile/Profile";
import RequestDetails from "../Pages/Dashboard/RequestDetails/RequestDetails";
import EditRequest from "../Pages/Dashboard/EditRequest/EditRequest";
import AllBloodDonationRequest from "../Pages/Dashboard/AllBloodDonationRequest/AllBloodDonationRequest";
import PublicRequests from "../Pages/PublicRequests/PublicRequests";
import DonationRequestDetails from "../Pages/DonationRequestsDetails/DonationRequestDetails";
import Funding from "../Pages/Dashboard/Funding/Funding";
import Error from "../Pages/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Register />,
      },
      {
        path: "donate",
        element: (
          <PrivateRoute>
            <Donate />
          </PrivateRoute>
        ),
      },
      {
        path: "request-details/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        ),
      },
       {
        path: "request-details/:id",
        element: <PrivateRoute><RequestDetails /></PrivateRoute>,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancel />,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancel />,
      },
      {
        path: "search",
        element: <SearchRequest />,
      },
      {
        path: "/donation-requests",
        element: <PublicRequests />,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <MainDashboard />,
      },
      {
        path: "create-donation-request",
        element: <AddRequest />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "my-donation-request",
        element: <MyRequest />,
      },
      {
        path: "profile",
        element: <Profile />,
      },

      {
        path: "edit-request/:id",
        element: <EditRequest />,
      },
      {
        path: "all-blood-donation-request",
        element: <AllBloodDonationRequest />,
      },
      {
        path: "funding",
        element: <Funding />,
      },
    ],
  },
]);

export default router;
