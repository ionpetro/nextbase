import { useSAToastMutation } from "@/hooks/useSAToastMutation";
import type { ValidSAPayload } from "@/types";
import axios from "axios";
import React from "react";
import { useDropzone } from "react-dropzone";

const UploadBlogImage = ({
  onUpload,
}: {
  onUpload: (path: string) => void;
}) => {
  const toastRef = React.useRef<string | undefined>(undefined);
  const uploadImageMutation = useSAToastMutation(
    async (file: File): Promise<ValidSAPayload<{ publicUrl: string }>> => {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const { data } = await axios.post(
          "/api/app_admin/internal_blog/uploadImage",
          formData,
          {
            withCredentials: true,
          },
        );

        return data as unknown as {
          status: "success";
          publicUrl: string;
        };
      } catch (error) {
        return {
          status: "error",
          message: error.message,
        };
      }
    },
    {
      loadingMessage: "Uploading image...",
      successMessage: "Image uploaded!",
      errorMessage(error) {
        try {
          if (error instanceof Error) {
            return String(error.message);
          }
          return `Failed to upload image ${String(error)}`;
        } catch (_err) {
          console.warn(_err);
          return "Failed to upload image";
        }
      },
      onSuccess: (response) => {
        if (response.status === "success" && response.data) {
          onUpload(response.data.publicUrl);
        }
      },
    },
  );

  const onDrop = React.useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];
      // check if file is of type File and is an image
      if (!(file instanceof File) || !file.type.startsWith("image/")) return;

      uploadImageMutation.mutate(file);
    },
    [uploadImageMutation],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".gif", ".jpg", ".jpeg"],
    },
  });

  return (
    <div
      className="border-dashed border-blue-300 border h-40 max-h-full flex items-center justify-center"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export { UploadBlogImage };
