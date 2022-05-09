import { Text, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  title: {
    textAlign: "center",
    fontWeight: 900,
    lineHeight: 1,
    fontSize: 50,
    marginBottom: theme.spacing.xl * 1.5,
  },

  [theme.fn.smallerThan("sm")]: {
    fontSize: 48,
  },

  description: {
    textAlign: "center",
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

// const useStyles = createStyles((theme) => ({
//   title: {
//     backgroundImage: theme.fn.linearGradient(
//       45,
//       theme.colors.indigo[5],
//       theme.colors.cyan[5],
//     ),
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//   },

//   description: {
//     textAlign: "center",
//     fontFamily: "Roboto Mono",
//     marginTop: 10,
//   },

//   block: {
//     backgroundColor:
//       theme.colorScheme === "dark"
//         ? theme.colors.dark[5]
//         : theme.colors.dark[2],

//     color:
//       theme.colorScheme === "light"
//         ? theme.colors.gray[2]
//         : theme.colors.gray[4],
//   },
// }));

export default function About() {
  const { classes } = useStyles();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.title}>Work In Progress!</div>
        <Text className={classes.description}>
          This page is work in progress, pls come back soon or later...
        </Text>
      </div>
      {/* <h1 style={{ textAlign: "center" }}>
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
      </Alert> */}
    </>
  );
}
