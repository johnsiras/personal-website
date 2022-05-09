import {
  AppShell,
  Burger,
  Center,
  Container,
  createStyles,
  Group,
  Header,
  Menu,
  Navbar,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  inner: {
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  links: {
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

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

export default function Nav({ children }: { children: React.ReactNode }) {
  const { classes } = useStyles();
  const [opened, toggleOpened] = useBooleanToggle(false);

  return (
    <AppShell
      // navbarOffsetBreakpoint="sm"
      header={
        <Header height={60} sx={{ borderBottom: 0 }} mb={120}>
          <Container className={classes.inner} fluid>
            <Group>
              <Burger
                opened={opened}
                onClick={() => toggleOpened()}
                className={classes.burger}
                size="sm"
              />
              Johnsiras
            </Group>
            <Group spacing={5} className={classes.links}>
              <a href="/" className={classes.link}>
                <Center>
                  <span className={classes.linkLabel}>Smth</span>
                </Center>
              </a>
            </Group>
          </Container>
        </Header>
      }
      fixed
    >
      {children}
    </AppShell>
  );
}
