import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const UploadBlogImage = ({
  onUpload,
}: {
  onUpload: (path: string) => void;
}) => {
  const toastRef = React.useRef<string | undefined>(undefined);
  const uploadImageMutation = useMutation<
    {
      publicUrl: string;
    },
    unknown,
    File
  >(
    async (file) => {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axios.post(
        '/api/app_admin/internal_blog/uploadImage',
        formData,
        {
          withCredentials: true,
        },
      );

      return data as unknown as {
        publicUrl: string;
      };
    },
    {
      onMutate: () => {
        toastRef.current = toast.loading('Uploading image...');
      },
      onSuccess: (data) => {
        onUpload(data.publicUrl);
        toast.success('Successfully uploaded image', {
          id: toastRef.current,
        });

        toastRef.current = undefined;
      },
      onError: () => {
        toast.error('Failed to upload image', {
          id: toastRef.current,
        });
        toastRef.current = undefined;
      },
    },
  );

  const onDrop = React.useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];
      // check if file is of type File and is an image
      if (!(file instanceof File) || !file.type.startsWith('image/')) return;

      uploadImageMutation.mutate(file);
    },
    [uploadImageMutation],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.gif', '.jpg', '.jpeg'],
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
