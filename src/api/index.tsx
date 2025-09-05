// src/api/index.tsx
import axios from "axios";

const API_URL = "https://dummyjson.com";

interface LoginPayload {
  username: string;
  password: string;
  expiresInMins?: number;
}

export const login = async ({ username, password }: LoginPayload) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
      expiresInMins: 30
    });
    console.log("Login Successful", res.data);
    return res.data;
  } catch (error) {
    console.error("Login Failed", error);
    throw error;
  }
};
