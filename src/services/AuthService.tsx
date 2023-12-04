import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthService() {
  const [user, setUser] = useState({ name: '', email: '', role: ''});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const fetchData = async () => {
    try {
      const response = await axios.post(apiUrl + '/api/auth/me', null, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      handleFetchError(error as AxiosError);
    }
  };

  const handleFetchError = (error: AxiosError) => {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 429) {
        console.error('Too Many Requests. Please try again later.');
      } else {
        console.error('Error fetching data:', error.message);
      }
    } else {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        navigate('/login');
      } else {
        await fetchData();
      }
    };
    checkToken();
  }, [token]);

  return { user };
}