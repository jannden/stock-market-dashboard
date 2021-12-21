import React from "react";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute = function ProtectedRoute() {
  const currentUser = useAuth();
  if (currentUser) return <div>cool</div>;
  return <div>not cool</div>;
};

export default ProtectedRoute;
