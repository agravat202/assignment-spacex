import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexLayout from "../layouts";
import NotFoundPage from "../views/404";
import Loader from "../components/Loader";

const Dashboard = lazy(() => import("../containers/DashboardContainer"));

const Router = () => {
  return (
    <BrowserRouter>
      <IndexLayout>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </IndexLayout>
    </BrowserRouter>
  );
};
export default Router;
