import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "./useQueries";

export const useUserAuth = () => {
  const navigate = useNavigate();
  const { data: user, error, isLoading } = useUserInfo();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If no token, redirect to login
    if (!token) {
      navigate("/login");
      return;
    }

    // If there's an error fetching user info and we're not loading, redirect to login
    if (error && !isLoading) {
      console.error("Failed to fetch user info:", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [user, error, isLoading, navigate]);

  return { user, isLoading, error };
};
