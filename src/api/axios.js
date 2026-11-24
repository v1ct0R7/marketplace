// =====================================================
// AXIOS - lidhja e frontend-it me backend-in
// Në vend që të shkruajmë gjithë adresën çdo herë, shkruajmë vetëm:
//   api.get('/products')   ->   http://localhost:5000/api/products
// =====================================================
import axios from "axios";

// Adresa e serverit merret nga skedari .env (VITE_SERVER_URL)
export const SERVER_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: SERVER_URL + "/api",
});

// "Interceptor" = funksion që ekzekutohet PARA çdo kërkese.
// Këtu shtojmë token-in automatikisht, që të mos e shkruajmë në çdo faqe.
api.interceptors.request.use((config) => {
  // Token-i ruhet te localStorage ("Më mbaj mend") ose te sessionStorage
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

// Nxjerr mesazhin e gabimit nga përgjigjja e serverit
export function getErrorMessage(error) {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  return "Nuk u lidh dot me serverin. Provoni përsëri.";
}

// Kthen adresën e plotë të një foto. "/uploads/a.jpg" -> "http://localhost:5000/uploads/a.jpg"
export function getImageUrl(imagePath) {
  if (!imagePath) return null;
  return SERVER_URL + imagePath;
}

export default api;
