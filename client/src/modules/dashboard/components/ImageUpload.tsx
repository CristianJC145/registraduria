import React, { useCallback } from 'react';

import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const ImageUpload = ({ field, form }: any) => {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const newImages = [...(field.value ?? []), ...acceptedFiles].slice(0, 5);
            form.setFieldValue(field.name, newImages);
            console.log('image uploaded', newImages);
        },
        [form, field.name]
    );
    
    const { getRootProps, getInputProps } = useDropzone({
    //   accept: 'image/*',
      onDrop,
      maxFiles: 5
    });
  
    return (
        <StyleImageUpload>
            <div className='vs-form-updateImage'>
                {field.value && field.value.length > 0 && (
                    <div className='vs-updateImage-container'>
                        {field.value.map((file: File) => (
                            <div className='vs-container-image' key={file.name}>
                                <img 
                                    src={URL.createObjectURL(file)}
                                    alt={file.name} 
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                                />
                            </div>
                        ))}
                    </div>
                )}
                <div {...getRootProps()} className='position-relative d-flex align-items-center justify-content-center px-4'>
                    <input multiple className='w-100 position-absolute' {...getInputProps()} />
                    <p>Arrastra y suelta hasta 5 imágenes</p>
                </div>
            </div>
        </StyleImageUpload>
    );
};
export default ImageUpload

const StyleImageUpload = styled.div`
    .vs-form-updateImage {
        border: 2px dashed rgba(var(--color-gray-300-rgb), 0.2);
        border-radius: 8px;
        flex: 1 1 0;
        width: 100%;
        padding-top: var(--p-4);
        cursor: pointer;
    }
    .vs-updateImage-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(7rem,1fr));
        gap: 1.25rem;
        padding: 0 var(--p-4);
    }
    .vs-container-image {
        height: 8.5rem;
    }
    .vs-container-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 12px;
    }
`