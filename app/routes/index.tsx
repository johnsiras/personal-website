import { createStyles, Mark } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  title: {
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      fontSize: 20,
    },
  },

  highlightedTitle: {
    backgroundImage: theme.fn.linearGradient(
      45,
      theme.colors.indigo[5],
      theme.colors.cyan[5]
    ),
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  description: {
    textAlign: "center",
    fontFamily: "Roboto Mono",
    marginTop: 10,
  },

  block: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.dark[2],

    color:
      theme.colorScheme === "light"
        ? theme.colors.gray[2]
        : theme.colors.gray[4],
  },
}));

export default function Demo() {
  const { classes } = useStyles();

  return (
    <>
      <h1 className={classes.title}>
        Hello 👋! My name is james aka{" "}
        <span className={classes.highlightedTitle}>johnsiras</span>
      </h1>

      {/* Description */}
      <p className={classes.description}>
        I'm a <Mark color="gray">developer</Mark>,{" "}
        <Mark color="blue">designer</Mark>, and a{" "}
        <Mark>self taught student</Mark>.
      </p>
    </>
  );
}
