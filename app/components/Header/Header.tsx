import React from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Title,
  Text,
  Burger,
  Paper,
  Transition,
  useMantineColorScheme,
  ActionIcon,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { openSpotlight } from "@mantine/spotlight";
import { Link } from "react-router-dom";
import {
  Sun,
  Moon,
  BrandGithub,
  BrandTwitter,
  Search,
} from "tabler-icons-react";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  header: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  others: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    transitionDuration: "300ms",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },
}));

interface HeaderActionProps {
  links: {
    link: string;
    label: string;
  }[];
  children: React.ReactNode;
}

export default function HeaderAction({ links, children }: HeaderActionProps) {
  const { classes } = useStyles();
  const [opened, toggleOpened] = useBooleanToggle(false);

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const Icon = colorScheme === "dark" ? Sun : Moon;

  const items = links.map((link) => {
    return (
      <Link
        key={link.label}
        to={link.link}
        className={classes.link}
        draggable={false}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
      <Container className={classes.header} fluid>
        <Group>
          {/* <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
          /> */}
          {/* <Transition transition="fade" duration={200} mounted={opened}>
            {(styles) => (
              <Paper className={classes.dropdown} withBorder>
                {items}
              </Paper>
            )}
          </Transition> */}
          <Title order={3}>
            <Text
              component={Link}
              to="/"
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              inherit
            >
              Johnsiras
            </Text>
          </Title>
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <Group>
          <ActionIcon
            variant="light"
            color={colorScheme === "dark" ? "yellow" : "blue"}
            size="lg"
            title="Ctrl + J"
            onClick={() => toggleColorScheme()}
            aria-label="Toggle ColorScheme"
          >
            <Icon size={16} />
          </ActionIcon>

          <ActionIcon
            variant="outline"
            size="lg"
            title="Search..."
            onClick={() => openSpotlight()}
          >
            <Search size={16} />
          </ActionIcon>

          {/*<ActionIcon<"a">
            variant="outline"
            size="lg"
            className={classes.others}
            component={"a"}
            target="_blank"
            href="https://github.com/Johnsiras"
            title="Github Link"
          >
            <BrandGithub size={18} />
          </ActionIcon>

          <ActionIcon<"a">
            variant="outline"
            size="lg"
            className={classes.others}
            component={"a"}
            target="_blank"
            href="https://twitter.com/John_siras"
            title="Twitter Link"
          >
            <BrandTwitter size={18} />
          </ActionIcon> */}
        </Group>
      </Container>
      {children}
    </Header>
  );
}
