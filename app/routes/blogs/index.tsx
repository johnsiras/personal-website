import { Container, Loader, Center, Anchor } from "@mantine/core";
import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { PostType, supabase } from "~/services/supabase.server";

export const meta: MetaFunction = () => ({
  title: "Blogs",
});

export const loader: LoaderFunction = async () => {
  const { data, error } = await supabase.from("blogs").select();

  if (error) throw error;

  return json(data);
};

export default function Blogs() {
  const loader = useLoaderData<PostType[] | null>();
  const post = useFetcher<PostType[] | null>();

  const items = post.data || loader;

  useEffect(() => {
    if (post.type === "init") {
      post.load(`/blogs?index`);
    }
  }, [post]);

  return (
    <Container>
      {items ? (
        post.type === "done" ? (
          <div>
            <h1>Posts</h1>
            <ul>
              {items?.map((item) => (
                <li key={item.slug}>
                  <Anchor component={Link} to={item.slug!}>
                    {item.title}
                  </Anchor>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Center
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Loading Data...
          </Center>
        )
      ) : null}
    </Container>
  );
}
