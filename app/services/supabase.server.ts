import { createClient } from "@supabase/supabase-js";
import type { PostgrestResponse } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Blog
export class Post {
  async create(data: any) {
    const {
      data: createdData,
      error: createdError,
      status: createdStatus,
    } = await supabase.from("blogs").insert(data);

    return { createdData, createdError, createdStatus };
  }

  async get(slug: any) {
    const {
      data: getData,
      error: getError,
      status: getStatus,
    } = await supabase.from("blogs").select().eq("slug", slug);

    return { getData, getError, getStatus };
  }

  async update(values: any, slug: any) {
    const {
      data: updatedData,
      error: errorData,
      status: updatedStatus,
    } = await supabase.from("blogs").update(values).match({ slug });

    return { updatedData, errorData, updatedStatus };
  }
}
