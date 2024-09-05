import axios from "axios";
import { setToken } from "./store";

export const getToken = async () => {
  try {
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("token_expiration");
    const tokenData =
      token && tokenExpiration
        ? { token, expiration: parseInt(tokenExpiration, 10) }
        : null;
    if (!tokenData || new Date().getTime() > tokenData.expiration) {
      const res = await axios.post(
        `${import.meta.env.PUBLIC_FORMS_API_URL}/auth/login`,
        {
          username: import.meta.env.PUBLIC_FORMS_API_USERNAME,
          password: import.meta.env.PUBLIC_FORMS_API_PASSWORD,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.status !== 200) {
        throw new Error("Erro ao obter token.");
      }

      localStorage.setItem("token", res.data.result.token);
      localStorage.setItem(
        "token_expiration",
        new Date().getTime() + res.data.result.expiresIn * 1000,
      );
      setToken(res.data.result.token);
    }
  } catch (error) {
    console.error(error);
  }
};

export const sendEmail = async (name, email, message) => {
  try {
    const res = await axios.post(
      `${import.meta.env.PUBLIC_FORMS_API_URL}/email/sendMe`,
      { name, email, message },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.PUBLIC_FORMS_API_KEY}`,
        },
      },
    );
    if (res.status !== 200) {
      throw new Error("Erro ao enviar e-mail.");
    }
  } catch (error) {
    console.error(error);
  }
};
