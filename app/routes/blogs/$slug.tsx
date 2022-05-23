import { Container, Loader, Center, Title, Divider } from "@mantine/core";
import { json, LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { PostType, supabase } from "~/services/supabase.server";
import { compile } from "~/utils/constants";

/* Loader */
export const loader: LoaderFunction = async ({ params }) => {
  const { data } = await supabase
    .from("blogs")
    .select()
    .eq("slug", params.slug);

  return json(data);
};

/* Page */
export default function Slug() {
  const post = useLoaderData<PostType[] | null>();
  const fetcher = useFetcher<PostType[] | null>();

  const items = fetcher.data || post;

  useEffect(() => {
    if (fetcher.type === "init") {
      fetcher.load(`/blogs/${items?.map((post) => post.slug)}`);
    }
  }, [fetcher]);

  const mapped = items?.map((post) => {
    return (
      <main key={post.slug}>
        <h1 style={{ fontSize: 45 }}>{post.title}</h1>

        <Divider />

        {compile(post.body).tree}
      </main>
    );
  });

  return (
    <Container>
      {items?.find((x) => x.slug) ? (
        fetcher.type === "done" ? (
          mapped
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loader size="lg" />
          </div>
        )
      ) : (
        <Title align="center" mt={20}>
          That blog/post doesn't exist!
        </Title>
      )}
    </Container>
  );
}
