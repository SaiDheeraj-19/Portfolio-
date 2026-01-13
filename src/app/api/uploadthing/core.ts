import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    // Route for uploading images (Profile, Projects, etc.)
    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .onUploadComplete(async ({ file }) => {
            console.log("Image uploaded:", file.url);
        }),

    // Route for uploading Resumes (PDF)
    resumeUploader: f({ pdf: { maxFileSize: "8MB", maxFileCount: 1 } })
        .onUploadComplete(async ({ file }) => {
            console.log("Resume uploaded:", file.url);
        }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
