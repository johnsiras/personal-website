import React from "react";
import { Bookmark, Heart, Share } from "tabler-icons-react";
import { Link } from "remix";
import {
  Avatar,
  Card,
  Center,
  createStyles,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { CardProps } from "./Card.types";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transitionDuration: "500ms",

    ":hover": {
      boxShadow: `0 0 10px ${theme.colors.blue[5]}`,
    },
  },

  title: {
    display: "block",
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs / 2,
  },

  action: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}));

export default function CardComponent({
  className,
  image,
  link,
  title,
  description,
  author,
  ...others
}: CardProps & Omit<React.ComponentPropsWithoutRef<"div">, keyof CardProps>) {
  const { classes, cx } = useStyles();

  return (
    <Card
      withBorder
      radius="md"
      className={cx(classes.card, className)}
      {...others}
    >
      <Card.Section>
        <Link to={link}>
          <Image src={image} height={180} />
        </Link>
      </Card.Section>

      <Text className={classes.title} weight={500} component={Link} to={link}>
        {title}
      </Text>

      <Text size="sm" color="dimmed" lineClamp={4}>
        {description}
      </Text>

      <Group position="apart" className={classes.footer}>
        <Center>
          <Avatar src={author.image} size={24} radius="xl" mr="xs" />
          <Text size="sm" inline>
            {author.name}
          </Text>
        </Center>

        {/* <Group spacing={8} mr={0}>
          <ActionIcon
            className={classes.action}
            style={{ color: theme.colors.red[6] }}
          >
            <Heart size={16} />
          </ActionIcon>
          <ActionIcon
            className={classes.action}
            style={{ color: theme.colors.yellow[7] }}
          >
            <Bookmark size={16} />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <Share size={16} />
          </ActionIcon>
        </Group> */}
      </Group>
    </Card>
  );
}
