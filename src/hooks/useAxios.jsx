import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend11-nine.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
