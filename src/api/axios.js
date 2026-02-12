import axios from "axios";

export const openaiClient = axios.create({
  baseURL: "https://api.openai.com/v1/chat/completions",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
    "Content-Type": "application/json"
  }
});
