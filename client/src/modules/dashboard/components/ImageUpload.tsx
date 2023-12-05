import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import styled from "styled-components";

import AppIcon from "../../../shared/components/AppIcon";
import AppButton from "../../../shared/components/Buttons/AppButton";

interface ImageUploadProps {
  images: [];
  onRemoveImage: (index: number) => void;
  onAddImages: (newImages: File[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  onRemoveImage,
  onAddImages,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const invalidFiles = acceptedFiles.filter(
        (file) => !isValidImageType(file)
      );
      const totalImages = images.length + acceptedFiles.length;
      const newImages = [...images, ...acceptedFiles].slice(0, 5);
      if (invalidFiles.length > 0) {
        console.log("error");

        toast.error(
          "Solo se admiten archivos con las extensiones .jpg, .png y .webp"
        );
      } else {
        if (totalImages > 5) {
          toast.warn("Solo puedes subir maximo 5 archivos");
        } else {
          onAddImages(newImages);
        }
      }
    },
    [images, onAddImages]
  );
  const isValidImageType = (file: File) => {
    const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
    const extension = (file.name || "").split(".").pop()?.toLowerCase();
    return (
      extension !== undefined &&
      file.type.startsWith("image/") &&
      allowedExtensions.includes(extension)
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    // accept: 'image/*' as any,
    onDrop,
    maxFiles: 5,
  });

  return (
    <StyleImageUpload>
      {images && images.length > 0 && (
        <div className="vs-updateImage-container">
          {images.map((image: string, index: number) => (
            <div className="vs-container-image" key={index}>
              {typeof image === "string" ? (
                <img src={image} alt={`Image ${index + 1}`} />
              ) : (
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index + 1}`}
                />
              )}
              <button
                className="vs-btnDelete-image"
                type="button"
                onClick={() => onRemoveImage(index)}
              >
                <AppIcon icon="times"></AppIcon>
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="vs-form-updateImage">
        <input
          multiple
          className="w-100 h-100 position-absolute"
          {...getInputProps()}
        />
        <div {...getRootProps()} className="vs-updateImage-dropzone">
          <AppIcon className="fs-4" icon="cloud-upload-alt"></AppIcon>
          <h6 className="ms-2 mb-0 fw-bold">Arrastra y suelta aqui o</h6>
          <AppButton
            className="ms-2"
            label="Selecciona Archivo"
            onClick={() => {}}
          ></AppButton>
        </div>
      </div>
    </StyleImageUpload>
  );
};
export default ImageUpload;

const StyleImageUpload = styled.div`
  .vs-form-updateImage {
    position: relative;
    border: 2px dashed rgba(var(--color-gray-300-rgb), 0.2);
    border-radius: 8px;
    width: 100%;
    padding-top: var(--p-4);
    cursor: pointer;
  }
  .vs-updateImage-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
    gap: 1.25rem;
  }
  .vs-updateImage-dropzone {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    padding: 0 var(--p-4);
    padding-bottom: var(--p-4);
  }
  .vs-form-updateImage:hover {
    background-color: rgba(var(--color-gray-300-rgb), 0.02);
  }
  .vs-container-image {
    position: relative;
    height: 7rem;
    width: 7rem;
    margin-bottom: 1rem;
  }
  .vs-container-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
  .vs-btnDelete-image {
    position: absolute;
    top: 0rem;
    right: 0rem;
    margin-top: -0.5rem;
    margin-right: -0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: rgb(253 47 47);
    width: 25px;
    height: 25px;
    border-radius: 999px;
    border: unset;
  }
  @media (min-width: 768px) {
    .vs-updateImage-dropzone {
      flex-direction: row;
      gap: 0;
    }
  }
`;
