import api from "./api";

// POST /auth/login
export const loginUser = async (email, password) => {
  // When your real backend is ready, uncomment this:
  // const response = await api.post("/auth/login", { email, password });
  // return response.data;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password.length >= 6) {

        // Admin test account
        if (email === "admin@zecpath.com") {
          resolve({
            token: "jwt-admin-token-123",
            user: { name: "Admin", email, role: "admin" },
          });
          return;
        }

        // Employer test account
        if (email.includes("employer")) {
          resolve({
            token: "jwt-employer-token-123",
            user: { name: email.split("@")[0], email, role: "employer" },
          });
          return;
        }

        // Default → candidate
        resolve({
          token: "jwt-demo-token-123",
          user: { name: email.split("@")[0], email, role: "candidate" },
        });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
};

// POST /auth/register
export const registerUser = async (name, email, password, role) => {
  // When your real backend is ready, uncomment this:
  // const response = await api.post("/auth/register", { name, email, password, role });
  // return response.data;

    //name && email && password.length >= 6
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name && email && password.length >= 6) {
        resolve({
          token: "jwt-demo-token-123",
          user: { name, email, role },
        });
      } else {
        reject(new Error("Registration failed"));
      }
    }, 1000);
  });
};