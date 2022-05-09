import { useField } from "remix-validated-form";
import { TextInput } from "@mantine/core";

import type { TextInputProps } from "@mantine/core";

export default function TextValidatedInput({ ...props }: TextInputProps) {
  const { error, getInputProps } = useField(props.name as string);

  return (
    <>
      <TextInput
        {...getInputProps({ ...props, id: props.name })}
        error={error}
      />
    </>
  );
}
