import { Dispatch, SetStateAction, useCallback } from "react"

type FileUploaderProps = {
    imageUrl: string,
    onFieldChange: (value: string) => void,
    setFile: Dispatch<SetStateAction<File[]>>
}

// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { convertFileToUrl } from "@/lib/utils";
import { Button } from "../ui/button";
import Image from "next/image";

function FileUploader({ imageUrl, onFieldChange, setFile }: Readonly<FileUploaderProps>) {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFile(acceptedFiles);
        onFieldChange(convertFileToUrl(acceptedFiles[0]));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
    });

    return (
        <div {...getRootProps()}
            className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50">
            <input {...getInputProps()} />
            {imageUrl ? (
                <div className="flex h-full w-full flex-1 justify-center ">
                    <Image
                        src={imageUrl}
                        alt="image"
                        width={250}
                        height={250}
                        className="w-full object-cover object-center"
                    />
                </div>
            ) : (
                <div className="flex-center flex-col py-5 text-grey-500">
                    <Image src="/assets/icons/upload.svg" width={77} height={77} alt="file upload" />
                    <h3 className="mb-2 mt-2">Drag photo here</h3>
                    <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
                    <Button type="button" className="rounded-full">
                        Select from computer
                    </Button>
                </div>
            )}
        </div>
    );
}
export default FileUploader