import axios from "axios";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: "https://blood-donate-backend-six.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
