import api from "./api";

// POST /upload/resume
export const uploadResume = async (file, onProgress) => {
  // When real backend is ready, uncomment:
  // const formData = new FormData();
  // formData.append("resume", file);
  // const response = await api.post("/upload/resume", formData, {
  //   headers: { "Content-Type": "multipart/form-data" },
  //   onUploadProgress: (e) => onProgress(Math.round((e.loaded * 100) / e.total)),
  // });
  // return response.data;

  // Simulate upload with progress
  return new Promise((resolve, reject) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        onProgress(100);
        setTimeout(() => {
          resolve({
            success: true,
            fileUrl: URL.createObjectURL(file),
            fileName: file.name,
            fileSize: file.size,
            uploadedAt: new Date().toISOString(),
          });
        }, 300);
      } else {
        onProgress(progress);
      }
    }, 200);
  });
};

// POST /upload/profile-image
export const uploadProfileImage = async (file, onProgress) => {
  // When real backend is ready, uncomment:
  // const formData = new FormData();
  // formData.append("image", file);
  // const response = await api.post("/upload/profile-image", formData, {
  //   headers: { "Content-Type": "multipart/form-data" },
  //   onUploadProgress: (e) => onProgress(Math.round((e.loaded * 100) / e.total)),
  // });
  // return response.data;

  return new Promise((resolve, reject) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 20) + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        onProgress(100);
        setTimeout(() => {
          resolve({
            success: true,
            fileUrl: URL.createObjectURL(file),
            fileName: file.name,
            uploadedAt: new Date().toISOString(),
          });
        }, 300);
      } else {
        onProgress(progress);
      }
    }, 150);
  });
};

// DELETE /upload/resume
export const deleteResume = async () => {
  // const response = await api.delete("/upload/resume");
  // return response.data;
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 300));
};