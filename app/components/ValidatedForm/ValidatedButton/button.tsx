import { useIsSubmitting } from "remix-validated-form";
import { Button } from "@mantine/core";

import type { SharedButtonProps } from "@mantine/core";

type Props = SharedButtonProps & {
  submitting: string;
  defaultText: string;
};

export default function ValidatedButton({
  submitting,
  defaultText,
  ...props
}: Props) {
  const isSubmitting = useIsSubmitting();

  return (
    <>
      <Button
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
        {...props}
      >
        {isSubmitting ? submitting : defaultText}
      </Button>
    </>
  );
}
