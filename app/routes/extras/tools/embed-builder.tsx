import {
  Button,
  createStyles,
  SimpleGrid,
  Paper,
  TextInput,
  Textarea,
} from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { json, Form, useActionData } from "remix";
import { Check } from "tabler-icons-react";

import type { MetaFunction, ActionFunction } from "remix";

// Meta
export const meta: MetaFunction = () => {
  return {
    title: "Johnsiras - Embed Builder",
    description: "Embed builder",
  };
};

// Loader
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const webhook_url = formData.get("webhook_url") as any;
  const username = formData.get("webhook_name");
  const content = formData.get("webhook_content");

  // Sending webhook
  const data = await fetch(webhook_url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      content,
    }),
  });

  return json(data.json());
};

// Custom Styles
const useStyles = createStyles((theme) => ({
  title: {
    margin: theme.spacing.lg,
  },
}));

export default function EmbedBuilder() {
  const status = useActionData();
  const { classes } = useStyles();

  return (
    <>
      <h1 className={classes.title}>Webhook Builder</h1>
      <Paper shadow="lg" p={30} mt={30} radius="md" withBorder>
        <Form method="post">
          <SimpleGrid>
            <TextInput
              label="Webhook URL"
              name="webhook_url"
              placeholder="https://discord.com/api/v9/webhooks/"
              variant="filled"
              required
            />
            <TextInput
              label="Webhook Name"
              name="webhook_name"
              placeholder="The webhook name..."
              variant="filled"
              required
            />
            <Textarea
              label="Webhook Name"
              name="webhook_content"
              placeholder="The webhook name..."
              variant="filled"
              required
            />

            <Button
              type="submit"
              variant="light"
              color="teal"
              mt="md"
              onClick={() => {
                showNotification({
                  id: "load-data",
                  loading: true,
                  title: "Creating the webhook...",
                  message:
                    "Webhook will be created in the background, please wait.",
                  autoClose: false,
                  disallowClose: true,
                });

                status.status
                  ? true
                    ? updateNotification({
                        id: "load-data",
                        color: "teal",
                        title: "Data was loaded",
                        message:
                          "Notification will close in 2 seconds, you can close this notification now",
                        icon: <Check />,
                        autoClose: 2000,
                      })
                    : null
                  : false;
              }}
              fullWidth
            >
              Submit
            </Button>
          </SimpleGrid>
        </Form>
      </Paper>
    </>
  );
}
