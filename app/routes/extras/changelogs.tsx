import { Avatar, Text, Timeline } from "@mantine/core";
import { json, LoaderFunction, MetaFunction, useLoaderData } from "remix";

export const meta: MetaFunction = () => {
  return {
    title: "Johnsiras - changelogs",
    description: "Github changelogs",
  };
};

export const loader: LoaderFunction = async () => {
  const res = await fetch(
    "https://api.github.com/repos/Johnsiras/johnsiras-website/commits",
  );
  return json(await res.json());
};

export default function Changelogs() {
  const commits = useLoaderData();

  return (
    <>
      <h1>♻ Change Logs</h1>
      <Timeline>
        {commits.map(
          ({ commit, committer }: { commit: any; committer: any }) => (
            <Timeline.Item
              title={commit.message}
              bulletSize={28}
              bullet={
                <Avatar size={26} radius="xl" src={committer.avatar_url} />
              }
              key={commit.message}
            >
              <Text color="dimmed" size="sm">
                {commit.committer.date}
              </Text>
              <Text size="xs" mt={4}>
                committed by {commit.committer.name}
              </Text>
            </Timeline.Item>
          ),
        )}
      </Timeline>
    </>
  );
}
