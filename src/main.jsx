import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import store from "./store";
import { ConfigProvider } from "antd";
import { RouterProvider, createHashRouter } from "react-router-dom";
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
import LoginPage from "./components/Login/LoginPage";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import {
  getJWT,
  setLoginRequested,
  storeJWT,
  storeLogin,
} from "./store/slices/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TopicMapContextProvider from "react-cismap/contexts/TopicMapContextProvider";
import {
  additionalLayerConfiguration,
  backgroundConfigurations,
  backgroundModes,
  extendBaseLayerConf,
  offlineConfig,
} from "./constants/backgrounds";
import { defaultLayerConf } from "react-cismap/tools/layerFactory";
const baseLayerConf = extendBaseLayerConf({ ...defaultLayerConf });

const NavBarWrapper = () => {
  const jwt = useSelector(getJWT);
  if (!jwt) {
    return <Navigate to="/login" />;
  }

  return <AppLayout />;
};
const productionMode = process.env.NODE_ENV === "production";

const router = createHashRouter([
  {
    path: "/",
    element: <NavBarWrapper />,
    errorElement: productionMode && <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Overview />,
      },
      {
        path: "/verwaltungsbereiche",
        element: <Offices />,
      },
      {
        path: "/miet",
        element: <RentAndLease />,
      },
      {
        path: "/rechte",
        element: <RightsPage />,
      },
      {
        path: "/nutzung",
        element: <UsagePage />,
      },
      {
        path: "/vorgange",
        element: <OperationsPage />,
      },
      {
        path: "/historie",
        element: <HistoryPage />,
      },
      {
        path: "/kassenzeichen",
        element: <Transaction />,
      },
      {
        path: "/dms",
        element: <DMSPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
const queryClient = new QueryClient();
const persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider locale={locale}>
      <PersistGate locale={locale} loading={null} persistor={persistor}>
        <Provider store={store}>
          <TopicMapContextProvider
            appKey="lagis-desktop.map"
            backgroundModes={backgroundModes}
            backgroundConfigurations={backgroundConfigurations}
            baseLayerConf={baseLayerConf}
            offlineCacheConfig={offlineConfig}
            additionalLayerConfiguration={additionalLayerConfiguration}
          >
            <RouterProvider router={router} />
          </TopicMapContextProvider>
        </Provider>
      </PersistGate>
    </ConfigProvider>
  </React.StrictMode>
);
