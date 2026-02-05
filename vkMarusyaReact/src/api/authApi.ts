import { api } from "./axios";
import type { AuthInfo, RegisterData } from "../types/auth";

export const login = (data: AuthInfo) =>
  api.post("/auth/login", data);

export const logout = () =>
  api.get("/auth/logout");

export const register = (data: RegisterData) =>
  api.post("/user", data);

export const getProfile = () =>
  api.get("/profile");
