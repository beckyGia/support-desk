import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewTicket from "./pages/NewTicket";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-ticket" element={<PrivateRoute />}>
          <Route index element={<NewTicket />} />
        </Route>
        <Route path="/tickets" element={<PrivateRoute />}>
          <Route index element={<Tickets />} />
        </Route>
        <Route path="/ticket/:ticketId" element={<PrivateRoute />}>
          <Route index element={<Ticket />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
