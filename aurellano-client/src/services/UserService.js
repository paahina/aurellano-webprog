import constants from "../constant";
import axios from "axios";

const API = axios.create({
  baseURL: `${constants.HOST}/user`,
});

export const fetchUsers = () => API.get("/");
export const createUser = (user) => API.post("/", user);
export const updateUser = (id, user) => API.put(`/${id}`, user);
export const deleteUser = (id) => API.delete(`/${id}`);
export const loginUser = (credentials) => API.post("/login", credentials);
