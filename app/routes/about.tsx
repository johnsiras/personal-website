import { Alert, createStyles } from "@mantine/core";
import { InfoCircle } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  title: {
    backgroundImage: theme.fn.linearGradient(
      45,
      theme.colors.indigo[5],
      theme.colors.cyan[5],
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

export default function About() {
  const { classes } = useStyles();

  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        Hello 👋! My name's james aka{" "}
        <span className={classes.title}>johnsiras</span>
      </h1>
      <p className={classes.description}>
        I'm a <span className={classes.block}>designer</span>,{" "}
        <span className={classes.block}>developer</span>, and a{" "}
        <span className={classes.block}>self taught student</span>!
      </p>

      <Alert
        sx={(theme) => ({ marginTop: "20rem" })}
        icon={<InfoCircle size={16} />}
        title="NOTE"
      >
        This isn't finished yet, will make more progress soon :)
      </Alert>
    </>
  );
}
