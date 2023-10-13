import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
const BUCKET_NAME = "course-material";

export const uploadFileToSupabse = async (file: File): Promise<string> => {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    // will be courseName/fileName
    .upload(file.name, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error(error);
    throw error;
  } else {
    const { data: publicUrlObj } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);
    if (!publicUrlObj) {
      throw new Error("Failed to get public url");
    } else {
      return publicUrlObj.publicUrl;
    }
  }
};

// const getPDFFilePath = async (fileName: string) =>
//   supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);
