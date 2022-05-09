import { Paper, SimpleGrid } from "@mantine/core";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";
import {
  TextValidatedInput,
  TextValidatedArea,
  ValidatedButton,
} from "~/components/ValidatedForm";
import { Post, supabase } from "~/services/supabase.server";

export const loader: LoaderFunction = async ({ params }) => {
  const { data } = await supabase
    .from("blogs")
    .select()
    .eq("slug", params.slug);

  return json(data);
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();

  // Form data
  const result = await validator.validate(formData);
  if (result.error) return validationError(result.error);

  const { title, body, slug } = result.data;

  const foundedSlug = await supabase
    .from("blogs")
    .select()
    .eq("slug", params.slug);

  foundedSlug.data?.map(async (post: any) => {
    const { updatedData, errorData } = await new Post().update(
      { title, body, slug },
      post.slug
    );

    if (errorData) throw new Response(errorData.message, { status: 400 });

    return json(updatedData);
  });
};

export const validator = withZod(
  z.object({
    title: z.string().nonempty("Blog title is required."),
    slug: z.string().nonempty("Blog title is required."),
    body: z.string().nonempty("Blog Content is required."),
  })
);

export default function EditPost() {
  const post = useLoaderData();

  return (
    <Paper shadow="lg" p={30} mt={30} radius="md" mb={30} withBorder>
      <ValidatedForm validator={validator} method="post" noValidate>
        <SimpleGrid>
          {post?.map((mapped: any) => (
            <>
              <TextValidatedInput
                label="Blog Title"
                placeholder="The blog title"
                spellCheck={false}
                name="title"
                defaultValue={mapped.title}
                required
              />

              <TextValidatedInput
                label="Blog Slug"
                placeholder="The blog slug"
                spellCheck={false}
                name="slug"
                defaultValue={mapped.slug}
                required
              />

              <TextValidatedArea
                label="Blog Content"
                placeholder="The blog content"
                spellCheck={false}
                name="body"
                defaultValue={mapped.body}
                required
              />

              <ValidatedButton
                type="submit"
                variant="light"
                mt="md"
                submitting="Posting..."
                defaultText="Post blog"
                fullWidth
              />
            </>
          ))}
        </SimpleGrid>
      </ValidatedForm>
    </Paper>
  );
}
