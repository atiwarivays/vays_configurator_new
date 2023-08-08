import { Route, createHashRouter, createRoutesFromElements, RouterProvider, createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import ErrorPage from "../components/ErrorPage";
import Home from "../pages/home/Home";
import SmartHouseDetail from "../pages/smart-house-detail/SmartHouseDetail";
import Typography from "../components/Typography";

export default function MainRouter() {

  // const router = createHashRouter(
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" errorElement={<ErrorPage />} element={<UserLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="/angebot" element={<SmartHouseDetail />}></Route>
          <Route path="/angebot/:id" element={<SmartHouseDetail />}></Route>
          <Route path="/angebot/:id1/:id2" element={<SmartHouseDetail />}></Route>
          <Route path="/modals" element={<Typography />}></Route>
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}
