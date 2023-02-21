import React from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../component/PrivateRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewTicket from "../pages/NewTicket";
import Tickets from "../pages/Tickets";
import Ticket from "../pages/Ticket";

function RoutList() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-ticket" element={<PrivateRoute />}>
          <Route path="/new-ticket" element={<NewTicket />} />
        </Route>
        <Route path="/tickets" element={<PrivateRoute />}>
          <Route path="/tickets" element={<Tickets />} />
        </Route>
        <Route path="/tickets/:ticketId" element={<PrivateRoute />}>
          <Route path="/tickets/:ticketId" element={<Ticket />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default RoutList;
