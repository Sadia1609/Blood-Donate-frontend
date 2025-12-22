// import { createBrowserRouter } from "react-router";
// import RootLayout from "../RootLayout/RootLayout";
// import Home from "../Pages/Home/Home";
// import Login from "../Pages/Login";
// import Register from "../Pages/Register";
// import DashboardLayout from "../DashboardLayout/DashboardLayout";
// import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";

// import AddRequest from "../Pages/Dashboard/AddRequest/AddRequest";
// import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
// import PrivateRoute from "./PrivateRoute";
// import MyRequest from "../Pages/Dashboard/MyRequest/MyRequest";

// import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
// import PaymentCancel from "../Pages/PaymentCancel/PaymentCancel";
// import SearchRequest from "../Pages/SearchRequest/SearchRequest";
// import Donate from "../Pages/Donate/Donate";


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout></RootLayout>,
//     children:[
//         {
//             path:'/',
//             Component:Home
//         },
//         {
//             path:'/login',
//             Component: Login
//         },
//         {
//             path:'/signup',
//             Component: Register

//         },
//         {
//           path:'/donate',
//          Element: <PrivateRoute><Donate></Donate></PrivateRoute>
//         },
//         {
//           path:'payment-success',
//           Component: PaymentSuccess
//         },
//         {
//           path:'payment-cancelled',
//           Component: PaymentCancel
//         },
//         {
//           path:'/search',
//           Component: SearchRequest
//         }
//     ]
//   },

//   //for dashboard layout
//   {
//     path:'dashboard',
//     element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
//     children:[
//       {
//         path:'/dashboard',
//        element:<MainDashboard></MainDashboard>
//       },
//       {
//         path:'add-request',
//        element:<AddRequest></AddRequest>
//       },
//       {
//         path:'all-users',
//         element:<AllUsers></AllUsers>
//       },
//       {
//         path:'my-request',
//         element:<MyRequest></MyRequest>
//       }
//     ]
//   }
// ]);

// export default router;

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


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancel />,
      },
      {
        path: "search",
        element: <SearchRequest />,
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
        path: "request-details/:id",
        element: <RequestDetails />,
      },
      {
        path: "edit-request/:id",
        element: <EditRequest />,
      }


     

    ],
  },
]);

export default router;
