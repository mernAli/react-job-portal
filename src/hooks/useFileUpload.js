import { useState, useRef } from "react";

const useFileUpload = ({
  accept = [],
  maxSizeMB = 5,
  onSuccess,
  onError,
  uploadFn,
}) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const validate = (file) => {
    if (accept.length > 0 && !accept.includes(file.type)) {
      return `Invalid file type. Allowed: ${accept.join(", ")}`;
    }
    if (file.size > maxSizeBytes) {
      return `File too large. Maximum size is ${maxSizeMB}MB`;
    }
    return null;
  };

  const processFile = async (file) => {
    const validationError = validate(file);
    if (validationError) {
      setError(validationError);
      onError?.(validationError);
      return;
    }

    setError(null);
    setFile(file);
    setProgress(0);
    setUploaded(false);

    // Generate preview for images
    if (file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      setPreview(null);
    }

    // Run upload
    try {
      setUploading(true);
      const result = await uploadFn(file, (pct) => setProgress(pct));
      setUploaded(true);
      onSuccess?.(file, result);
    } catch (err) {
      const msg = err.message || "Upload failed. Please try again.";
      setError(msg);
      onError?.(msg);
      setFile(null);
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) processFile(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) processFile(dropped);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setProgress(0);
    setUploaded(false);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const openFilePicker = () => {
    if (fileRef.current) fileRef.current.click();
  }

  return {
    file,
    preview,
    progress,
    uploading,
    uploaded,
    error,
    isDragging,
    fileRef,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    clearFile,
    openFilePicker,
  };
};

export default useFileUpload;