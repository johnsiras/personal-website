import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useNavigate,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import {
  Button,
  ColorScheme,
  ColorSchemeProvider,
  Container,
  createStyles,
  Divider,
  Global,
  Group,
  MantineProvider,
  Paper,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";

import PrismRenderer from "prism-react-renderer/prism";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import HeaderAction from "./components/Header/Header";
import { SpotlightAction, SpotlightProvider } from "@mantine/spotlight";
import { Home, InfoCircle, Inbox, Search, PaperBag } from "tabler-icons-react";
import { NotificationsProvider } from "@mantine/notifications";

import type { MetaFunction } from "@remix-run/node";

declare global {
  var Prism: string;
}

(typeof global !== "undefined" ? global : window).Prism = PrismRenderer;
require("prismjs/components/prism-lua");

/* Meta */
export const meta: MetaFunction = () => ({
  title: "Johnsiras | Home",
});

function Document({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["Ctrl+J", () => toggleColorScheme()]]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{ colorScheme }}
            withGlobalStyles
            withNormalizeCSS
          >
            <Global
              styles={(theme) => ({
                scrollbarColor: theme.colors.gray[5],
              })}
            />
            {children}
          </MantineProvider>
        </ColorSchemeProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const links: LinksFunction = () => {
  return [
    {
      href: "https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap",
      rel: "stylesheet",
    },
  ];
};

/////////////////////
// Error Boundary //
///////////////////
const useErrorStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  title: {
    fontSize: 50,
    margin: 25,

    [theme.fn.smallerThan("md")]: {
      fontSize: 40,
    },

    [theme.fn.smallerThan("sm")]: {
      fontSize: 27,
    },
  },
}));
export function ErrorBoundary({ error }: { error: Error }) {
  const { classes } = useErrorStyles();
  console.error(error);

  return (
    <Document>
      <Container className={classes.root}>
        <Title className={classes.title} align="center">
          An error has occurred
        </Title>
        <Paper color="red" shadow="md" radius="md" p="lg" withBorder>
          <Text weight="bold">{error.message}</Text>

          <Divider />

          <Text>{error.stack}</Text>
        </Paper>
      </Container>
    </Document>
  );
}

/////////////////////
// Catch Boundary //
///////////////////
const useCatchStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color:
      theme.colorScheme === "light"
        ? theme.colors.gray[2]
        : theme.colors.dark[4],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));
export function CatchBoundary() {
  const caught = useCatch();
  const { classes } = useCatchStyles();

  switch (caught.status) {
    case 404:
      return (
        <Document>
          <Container className={classes.root}>
            <div className={classes.label}>404</div>
            <Title className={classes.title}>
              You have found a secret place.
            </Title>
            <Text
              color="dimmed"
              size="lg"
              align="center"
              className={classes.description}
            >
              Unfortunately, this is only a 404 page. You may have mistyped the
              address, or the page has been moved to another URL.
            </Text>
            <Group position="center">
              <Button<"a"> component="a" href="/" variant="subtle" size="md">
                Take me back to home page
              </Button>
            </Group>
          </Container>
        </Document>
      );

    default:
      break;
  }
}

export default function App() {
  const navigate = useNavigate();

  const actions: SpotlightAction[] = [
    {
      title: "Home",
      description: "Get to home page",
      onTrigger: () => navigate("/"),
      icon: <Home size={18} />,
      group: "main",
    },
    {
      title: "About Me",
      description: "Get the information about me :)",
      onTrigger: () => navigate("/about"),
      icon: <InfoCircle size={18} />,
      group: "main",
    },
    {
      title: "Blogs",
      description: "Snippets, learn, examples and etc.",
      onTrigger: () => navigate("/blogs"),
      icon: <Inbox size={18} />,
      group: "main",
    },
    {
      title: "Extras",
      description: "Extra pages",
      onTrigger: () => navigate("/extras"),
      icon: <PaperBag size={18} />,
      group: "main",
    },

    // Sections
    {
      title: "Changelogs",
      onTrigger: () => navigate("/extras/changelogs"),
      group: "extras",
    },
  ];

  return (
    <Document>
      <SpotlightProvider
        actions={actions}
        shortcut={["Ctrl+k", "/"]}
        nothingFoundMessage="Nothing found..."
        searchIcon={<Search size={18} />}
        searchPlaceholder="Search..."
        styles={(theme) => ({
          root: {
            [theme.fn.smallerThan("sm")]: {
              padding: 5,
            },
          },
          spotlight: {
            overflowY: "auto",
            maxHeight: "90vh",

            [theme.fn.smallerThan("sm")]: {
              maxHeight: "75vh",
            },
          },
        })}
        transition="fade"
        centered
        highlightQuery
      >
        <NotificationsProvider>
          <HeaderAction
            links={[
              { label: "Home", link: "/" },
              { label: "About", link: "/about" },
              { label: "Blogs", link: "/blogs" },
              { label: "Extras", link: "/extras" },
            ]}
          >
            <Outlet />
          </HeaderAction>
        </NotificationsProvider>
      </SpotlightProvider>
    </Document>
  );
}
