import { Center, Container, createStyles } from "@mantine/core";
import Particles from "react-tsparticles";

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

export default function Demo() {
  const { classes } = useStyles();

  return (
    <Center style={{ height: 200 }}>
      <h1 style={{ textAlign: "center" }}>
        Hello 👋! My name's james aka{" "}
        <span className={classes.title}>johnsiras</span>
      </h1>

      {/* Description */}
      <p className={classes.description}>
        I'm a <span className={classes.block}>designer</span>,{" "}
        <span className={classes.block}>developer</span>, and a{" "}
        <span className={classes.block}>self taught student</span>! I live in
        the philippines
      </p>
    </Center>
  );
}
