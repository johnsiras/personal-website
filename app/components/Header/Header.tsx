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
  SimpleGrid,
  ActionIcon,
  Input,
  Badge,
  Autocomplete,
} from "@mantine/core";
import { upperFirst, useBooleanToggle } from "@mantine/hooks";
import { Link } from "remix";
import { useNavigate } from "react-router-dom";
import { useSpotlight } from "@mantine/spotlight";
import {
  Sun,
  Moon,
  BrandGithub,
  Search,
  BrandTwitter,
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
          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
          />
          <Transition transition="pop-top-left" duration={200} mounted={opened}>
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {items}
              </Paper>
            )}
          </Transition>
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
          {/* <Autocomplete
            transition="scale-y"
            className={classes.search}
            onChange={(value) => navigate(value)}
            icon={<Search size={16} />}
            placeholder="Search"
            data={["Home", "About", "Blogs"]}
          /> */}
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

          <ActionIcon<"a">
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
          </ActionIcon>
          {/* <ButtonToggle
            title="Ctrl + J"
            ariaLabel="Toggle ColorScheme"
            icon={<Icon size={18} />}
            label={`${upperFirst(
              colorScheme === "light" ? "dark" : "light",
            )} theme`}
            onClick={() => toggleColorScheme()}
          /> */}
        </Group>
      </Container>
      {children}
    </Header>
  );
}
