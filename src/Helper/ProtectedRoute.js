import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom/dist";
import { toast } from "react-toastify";

const ProtectedRoute = ({ file }) => {
  const isLogin = useSelector((state) => state?.authReducer?.isLogin);
  if (!isLogin) {
    return [<Navigate to="/" replace />, toast.error("Please Login First")];
  } else {
    return file;
  }
  return <></>;
};

export default ProtectedRoute;
