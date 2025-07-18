import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const [isAdmin, setIsAdmin] = useState(null); // null to handle loading state
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/auth/getUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIsAdmin(res.data.user.isAdmin);
    } catch (err) {
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); // empty dependency array — only run once

  if (loading) return <p>Loading...</p>; // or spinner

  return isAdmin ? <Outlet /> : <Navigate to="/home" />;
};

export default AdminRoute;
