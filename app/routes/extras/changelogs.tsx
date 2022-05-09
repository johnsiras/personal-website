import {
  Anchor,
  Avatar,
  Container,
  Text,
  Timeline,
  Title,
} from "@mantine/core";
import moment from "moment";

import { json } from "@remix-run/server-runtime";
import { useLoaderData, Link } from "@remix-run/react";
import { LoaderFunction, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return {
    title: "Johnsiras - changelogs",
    description: "Github changelogs",
  };
};

export const loader: LoaderFunction = async () => {
  const res = await fetch(
    "https://api.github.com/repos/Johnsiras/johnsiras-website/commits"
  );
  return json(await res.json());
};

export default function Changelogs() {
  const commits = useLoaderData();

  return (
    <Container>
      <Title align="center" m={30}>
        ♻ Change Logs
      </Title>
      <Timeline>
        {commits.map(
          ({
            html_url,
            commit,
            committer,
          }: {
            html_url: string;
            commit: any;
            committer: any;
          }) => (
            <Timeline.Item
              title={
                <Anchor component="a" href={html_url} target="_blank">
                  {commit.message}
                </Anchor>
              }
              bulletSize={28}
              bullet={
                <Avatar size={26} radius="xl" src={committer.avatar_url} />
              }
              key={commit.message}
            >
              <Text size="sm" color="dimmed">
                {moment(commit.committer.date).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
              </Text>
              <Text size="xs">committed by {commit.committer.name}</Text>
            </Timeline.Item>
          )
        )}
      </Timeline>
    </Container>
  );
}
