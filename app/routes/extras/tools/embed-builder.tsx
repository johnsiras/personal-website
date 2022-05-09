import {
  Button,
  SimpleGrid,
  Paper,
  TextInput,
  Textarea,
  Text,
  Notification,
} from "@mantine/core";

import { Form, useTransition, useActionData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { MetaFunction, ActionFunction } from "@remix-run/node";

import { showNotification, updateNotification } from "@mantine/notifications";
import { Check } from "tabler-icons-react";
import createWebhook from "~/utils/createWebhook";

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
  const webhook_url = formData.get("webhook_url") as string;
  const webhook_name = formData.get("webhook_name") as string;
  const webhook_content = formData.get("webhook_content") as string;

  // Sending webhook
  const [errors] = await createWebhook({
    webhook_url,
    webhook_name,
    webhook_content,
  });

  if (errors) {
    const values = Object.fromEntries(formData);
    return json({ errors, values });
  }

  return null;
};

export default function EmbedBuilder() {
  const transition = useTransition();
  const action = useActionData();

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Webhook Builder</h1>
      <Paper shadow="lg" p={30} mt={30} radius="md" withBorder>
        <Form method="post">
          <SimpleGrid>
            {/* Webhook URL */}
            <TextInput
              label="Webhook URL"
              name="webhook_url"
              placeholder="https://discord.com/api/v9/webhooks/"
              variant="filled"
              defaultValue={action?.values.webhook_url}
              required
            />

            {/* Webhook Name */}
            <TextInput
              label="Webhook Name"
              name="webhook_name"
              placeholder="The webhook name..."
              variant="filled"
              defaultValue={action?.values.webhook_name}
              error={action?.errors.webhook_name}
            />

            {/* {action?.errors.webhook_name ? (
              <Text size="sm" color="red">
                {action.errors.webhook_name}
              </Text>
            ) : null} */}

            {/* Webhook Avatar URL */}
            <TextInput
              label="Webhook Avatar URL"
              name="webhook_avatar"
              placeholder="The webhook avatar url..."
              variant="filled"
            />
            {/* Content */}
            <Textarea
              label="Content"
              name="webhook_content"
              placeholder="The webhook content..."
              variant="filled"
              defaultValue={action?.values.webhook_content}
              error={action?.errors.webhook_content}
            />

            <Button
              type="submit"
              variant="light"
              color="teal"
              mt="md"
              fullWidth
            >
              {transition.state === "submitting"
                ? "Creating the webhook..."
                : action?.errors
                ? Object.keys(action.errors).length > 0 &&
                  "Can't create the webhook"
                : transition.state === "loading"
                ? "Webhook has been created!"
                : "Create the webhook"}
            </Button>
          </SimpleGrid>
        </Form>
      </Paper>

      <Notification
        title="Note"
        sx={(theme) => ({ margin: "5rem" })}
        disallowClose
      >
        The form isn't done yet and it's still work on progress, come back later
        ya duckie!
      </Notification>
    </>
  );
}
