import { Container, Loader, Center, Title } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { json, LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import { useEffect } from "react";
import { supabase } from "~/services/supabase.server";

export const loader: LoaderFunction = async ({ params }) => {
  const { data } = await supabase
    .from("blogs")
    .select()
    .eq("slug", params.slug);

  return json(data);
};

export default function Slug() {
  const post = useLoaderData();
  const fetcher = useFetcher();

  const items = fetcher.data || post;

  useEffect(() => {
    if (fetcher.type === "init") {
      fetcher.load(`/blogs/${items.map((post: any) => post.slug)}`);
    }
  }, [fetcher]);

  const mapped = items?.map((post: any) => {
    const __html = marked.parseInline(post.body);

    return (
      <main key={post.slug}>
        <h1 style={{ textAlign: "center" }}>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html }} />
      </main>
    );
  });

  return (
    <Container>
      {post?.toString() ? (
        fetcher.type === "done" ? (
          mapped
        ) : (
          <Center
            style={{
              height: "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loader size="lg" />
          </Center>
        )
      ) : (
        <Center
          style={{
            height: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Title>That blog/post doesn't exist!</Title>
        </Center>
      )}
    </Container>
  );
}
