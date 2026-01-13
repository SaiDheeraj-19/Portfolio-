"use client";

import { UploadButton } from "@/utils/uploadthing";
// Wait, I need to create utils first if not exist, or import from lib?
// usually utils is: import { generateUploadButton } from "@uploadthing/react";
// let's define it inline or use a new utils file.

import { generateUploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButtonField = generateUploadButton<OurFileRouter>();

export default function TestUploadPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-black text-white">
            <h1 className="mb-8 text-4xl font-bold">Upload Test</h1>

            <div className="p-8 border border-white/20 rounded-xl bg-neutral-900">
                <UploadButtonField
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        console.log("Files: ", res);
                        alert("Upload Completed! URL: " + res[0].url);
                    }}
                    onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                        console.error("Upload Error:", error);
                    }}
                />
            </div>

            <p className="mt-8 text-neutral-500">
                If this works, the backend is fine.
            </p>
        </div>
    );
}
