import { User } from '../types';

const API_URL = "http://localhost:8080/api/auth";

export const authService = {

  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      // Si el backend responde con success = false
      if (!data.success) {
        throw new Error(data.message || "Error en login");
      }

      // Guardar JWT y usuario en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return {
        user: data.user,
        token: data.token
      };

    } catch (error) {
      console.error("Error en login:", error);

      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error("No se pudo conectar con el servidor");
    }
  },

  register: async (name: string, email: string, password: string): Promise<User> => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: name,
          email,
          password
        })
      });

      if (!response.ok) {
        throw new Error("Error en la petición");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Error en registro");
      }

      return data.user;

    } catch (error) {
      console.error("REGISTER ERROR:", error);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
};