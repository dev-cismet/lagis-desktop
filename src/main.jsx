import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import store from "./store";
import { ConfigProvider } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import locale from "antd/locale/de_DE";
import ErrorPage from "./components/ui/errors-template/ErrorsPage";
import Overview from "./pages/Overview";
import AppLayout from "./pages/AppLayout";
import Offices from "./pages/Offices";
import RentAndLease from "./pages/RentAndLease";
import RightsPage from "./pages/RightsPage";
import UsagePage from "./pages/UsagePage";
import OperationsPage from "./pages/OperationsPage";
import HistoryPage from "./pages/HistoryPage";
import Transaction from "./pages/Transaction";
import DMSPage from "./pages/DMSPage";
import LoginPage from "./components/login/LoginPage";
import PrivateRoute from "./components/routes/PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Overview />
          </PrivateRoute>
        ),
      },
      {
        path: "/verwaltungsbereiche",
        element: (
          <PrivateRoute>
            <Offices />
          </PrivateRoute>
        ),
      },
      {
        path: "/miet",
        element: (
          <PrivateRoute>
            <RentAndLease />
          </PrivateRoute>
        ),
      },
      {
        path: "/rechte",
        element: (
          <PrivateRoute>
            <RightsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/nutzung",
        element: (
          <PrivateRoute>
            <UsagePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/vorgänge",
        element: (
          <PrivateRoute>
            <OperationsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/historie",
        element: (
          <PrivateRoute>
            <HistoryPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/kassenzeichen",
        element: (
          <PrivateRoute>
            <Transaction />
          </PrivateRoute>
        ),
      },
      {
        path: "/dms",
        element: (
          <PrivateRoute>
            <DMSPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider locale={locale}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
