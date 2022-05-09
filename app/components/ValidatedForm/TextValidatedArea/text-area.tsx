import { useField } from "remix-validated-form";
import { Textarea } from "@mantine/core";

import type { TextareaProps } from "@mantine/core";

export default function TextValidatedArea({ ...props }: TextareaProps) {
  const { error, getInputProps } = useField(props.name as string);

  return (
    <>
      <Textarea
        {...getInputProps({ ...props, id: props.name })}
        error={error}
      />
    </>
  );
}
