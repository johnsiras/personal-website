import { Container, SimpleGrid, Loader, Center } from "@mantine/core";
import { json, LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import CardComponent from "~/components/Card/Card";
import { supabase } from "~/services/supabase.server";

export const loader: LoaderFunction = async () => {
  const { data, error } = await supabase.from("blogs").select();

  if (error) throw error;

  return json({ data });
};

export default function Blogs() {
  const loader = useLoaderData<{ data: any[] | null }>();
  const post = useFetcher();

  const items = post.data || loader;

  useEffect(() => {
    if (post.type === "init") {
      post.load(`/blogs`);
    }
  }, [post]);

  const mapped = items.data?.map((post: any) => (
    <CardComponent
      link={`/blogs/${post.slug}`}
      key={post.slug}
      description={post.card.description}
      title={post.card.title}
      image={post.card.image}
    />
  ));

  return (
    <Container>
      {items.data.toString() ? (
        post.type === "done" ? (
          <SimpleGrid cols={5}>{mapped}</SimpleGrid>
        ) : (
          <Center style={{ marginBottom: 50 }}>
            <Loader size="md" />
          </Center>
        )
      ) : null}
    </Container>
  );
}
