interface createWebhookProps {
  webhook_url: string;
  webhook_name: string;
  webhook_content?: string;
}

type errors = {
  webhook_name?: string;
  webhook_content?: string;
};

type ReturnedValue = [errors];

async function createWebhook({
  webhook_url,
  webhook_name,
  webhook_content,
}: createWebhookProps): Promise<ReturnedValue> {
  await fetch(webhook_url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: webhook_name,
      content: webhook_content,
    }),
  });

  let errors: errors = {};

  if (webhook_name && webhook_name < "2") errors.webhook_name = "Something!!!!";
  if (!webhook_content) errors.webhook_content = "Content is required..";

  return [errors];
}

export default createWebhook;
