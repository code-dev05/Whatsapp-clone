import axios from "axios";
const useAxios = axios.create({
  withCredentials: true,
});

export default useAxios;
