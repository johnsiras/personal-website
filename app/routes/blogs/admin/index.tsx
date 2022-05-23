import { json } from "@remix-run/server-runtime";
import { useLoaderData, useSearchParams } from "@remix-run/react";

import { ValidatedForm, validationError } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

import { Container, NumberInput, Paper, SimpleGrid } from "@mantine/core";

import {
  TextValidatedArea,
  TextValidatedInput,
  ValidatedButton,
} from "~/components/ValidatedForm/index";

import { Post, PostType } from "~/services/supabase.server";
import { useState } from "react";
import { compile } from "~/utils/constants";

import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";

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

    const { title, body, slug } = result.data;

    const { Data, error } = await new Post().create({
      slug: slug || title.replace(/\s+/g, "-").toLowerCase(),
      title,
      body,
    });

    if (error?.code === "201") return json({ Data }, { status: 200 });
    throw error;
  } catch (err) {
    console.log("error", err);
    return json({ Error: err }, { status: 500 });
  }
};

export const validator = withZod(
  z.object({
    title: z.string().nonempty("Blog title is required."),
    slug: z.string().optional(),
    body: z.string().nonempty("Blog Content is required."),
  })
);

export default function AdminUser() {
  const loader = useLoaderData<{
    Data: PostType[] | null;
    Error: unknown;
    isAdmin: boolean;
  }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const Data = loader.Data?.find((obj) => obj.body);

  const [state, setState] = useState({
    tree: compile(Data?.body || "").tree,
    value: Data?.body || "# Head",
  });

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
            />

            <TextValidatedArea
              label="Blog Content"
              placeholder="The blog content"
              spellCheck={false}
              name="body"
              onChange={(e) => {
                setState({
                  tree: compile(e.target.value).tree,
                  value: e.target.value,
                });
              }}
              value={state.value}
              minRows={2}
              autosize
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

      <Paper shadow="lg" p={30} mt={30} radius="md" mb={30} withBorder>
        {state.tree}
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
