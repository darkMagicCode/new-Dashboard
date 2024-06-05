'use client';
import React, { useState } from 'react';
import ImageFallback from './ui/ImageFallback';
import { Avatar, Image } from '@radix-ui/react-avatar';

const ImageUpload = ({
  setImages,
  images,
  imgFiles,
  setImgFiles,
  ...rest
}: any) => {
  const handleImageUpload = (event: any) => {
    const files = Array.from(event.target.files);
    // const newImages = files.map((file: any) => URL.createObjectURL(file));
    // setImages((prevImages: any) => [...prevImages, ...newImages]);
    // setImgFiles((prevFiles: any) => [...prevFiles, ...files]);
    files.forEach((file: any) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImages((prevImages: any) => [...prevImages, base64String]);
        setImgFiles((prevFiles: any) => [...prevFiles, file]);
      };
      reader.readAsDataURL(file);
    });
  };
  console.log('images', images);

  const removeImage = (index: any) => {
    setImages(images.filter((_: any, i: any) => i !== index));
    setImgFiles(imgFiles.filter((_: any, i: any) => i !== index));
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <div className="mb-4">
        <label className="flex cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none">
          Upload Images
          <input
            {...rest}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className=""
          />
        </label>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image: string, index: React.Key | null | undefined) => (
          <div key={index} className="group relative">
            <Avatar>
              <Image
                src={image}
                alt={`Uploaded ${index}`}
                className="h-full w-full rounded-md object-cover"
                // fallback={''}
                width={46}
                height={46}
              ></Image>
            </Avatar>

            <button
              onClick={() => removeImage(index)}
              className="absolute right-2 top-2 rounded-full bg-red-600 p-1 text-white opacity-100 transition-opacity duration-300 group-hover:opacity-100"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
