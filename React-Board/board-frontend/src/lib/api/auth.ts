import client from "./client";
import { UserForm } from "../../modules/auth";

// 로그인
export const login = async ({ username, password }: UserForm) =>
  await client.post("/api/auth/login", { username, password });

// 회원가입
export const register = async ({ username, password }: UserForm) =>
  await client.post("/api/auth/register", {
    username,
    password,
  });

export const check = async () => await client.get("/api/auth/check");

export const logout = async () => await client.post("/api/auth/logout");
