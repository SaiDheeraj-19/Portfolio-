import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing({
    errorFormatter: (err) => {
        console.log("Uploadthing Error:", err);
        return { message: err.message };
    },
});

export const ourFileRouter = {
    // Route for uploading images (Profile, Projects, etc.)
    imageUploader: f({ image: { maxFileSize: "32MB", maxFileCount: 1 } })
        .onUploadComplete(async ({ file }) => {
            console.log("Image uploaded:", file.url);
        }),

    // Route for uploading Resumes (PDF)
    resumeUploader: f({ pdf: { maxFileSize: "32MB", maxFileCount: 1 } })
        .onUploadComplete(async ({ file }) => {
            console.log("Resume uploaded:", file.url);
        }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
