import { json, redirect } from "@remix-run/server-runtime";
import { useLoaderData, useSearchParams } from "@remix-run/react";

import { ValidatedForm, validationError } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { string, z } from "zod";

import {
  Container,
  Divider,
  NumberInput,
  Paper,
  SimpleGrid,
} from "@mantine/core";

import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  TextValidatedArea,
  TextValidatedInput,
  ValidatedButton,
} from "~/components/ValidatedForm/index";

import { marked } from "marked";
import { Post, supabase } from "~/services/supabase.server";

export const meta: MetaFunction = () => ({
  title: "Blogs - Admin",
  description: "",
});

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") as string;

  switch (id) {
    case process.env.ADMIN_ID:
      return json({ isAdmin: true });

    default:
      return json({ isAdmin: false });
  }
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();

    // Form data
    const result = await validator.validate(formData);
    if (result.error) return validationError(result.error);

    const { title, body, slug, card } = result.data;

    const { createdData, createdError, createdStatus } =
      await new Post().create({
        slug,
        title,
        body,
        card: {
          title: card.title,
          description: card.description,
          image: card.image,
        },
      });

    if (createdStatus === 201) return json({ createdData }, { status: 200 });
    throw createdError;
  } catch (err) {
    console.log("error", err);
    return json({ server: err }, { status: 500 });
  }
};

export const validator = withZod(
  z.object({
    title: z.string().nonempty("Blog title is required."),
    slug: z.string().nonempty("Blog title is required."),
    body: z.string().nonempty("Blog Content is required."),

    card: z.object({
      title: z.string().nonempty("Card title is required."),
      image: z
        .string()
        .nonempty("Card image is required.")
        .url("Card image is not a valid image URL."),
      description: z
        .string()
        .nonempty("Card description is required.")
        .min(3)
        .max(400),
    }),
  })
);

export default function AdminUser() {
  const loader = useLoaderData<{ isAdmin: boolean; error?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const if_admin = (
    <>
      <Paper shadow="lg" p={30} mt={30} radius="md" mb={30} withBorder>
        <ValidatedForm validator={validator} method="post" noValidate>
          <SimpleGrid>
            <TextValidatedInput
              label="Blog Title"
              placeholder="The blog title"
              spellCheck={false}
              name="title"
              required
            />

            <TextValidatedInput
              label="Blog Slug"
              placeholder="The blog slug"
              spellCheck={false}
              name="slug"
              required
            />

            <TextValidatedArea
              label="Blog Content"
              placeholder="The blog content"
              spellCheck={false}
              name="body"
              required
            />

            <Divider my="xs" label="Card" labelPosition="center" />

            <TextValidatedInput
              label="Card title"
              placeholder="The card title"
              spellCheck={false}
              name="card.title"
              required
            />

            <TextValidatedInput
              label="Card image"
              placeholder="The card img"
              spellCheck={false}
              name="card.image"
              required
            />

            <TextValidatedArea
              label="Card description"
              placeholder="The card description"
              spellCheck={false}
              name="card.description"
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
          </SimpleGrid>
        </ValidatedForm>
      </Paper>
    </>
  );

  return (
    <Container mb={30}>
      {loader.isAdmin ? (
        if_admin
      ) : (
        <>
          <h1>Admin</h1>
          <NumberInput
            label="Admin ID"
            description="Type the admin's id to get access of the blog panel"
            placeholder="Ex. 345610"
            onChange={(val) =>
              setSearchParams({ id: val?.toString() as string })
            }
            hideControls={true}
          />
        </>
      )}
    </Container>
  );
}
