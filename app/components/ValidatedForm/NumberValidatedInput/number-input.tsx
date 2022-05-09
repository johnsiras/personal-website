import { useField } from "remix-validated-form";
import { NumberInput } from "@mantine/core";

import type { NumberInputProps } from "@mantine/core";

export default function NumberValidatedInput({ ...props }: NumberInputProps) {
  const { error, getInputProps } = useField(props.name as string);

  return (
    <>
      <NumberInput
        {...getInputProps({ ...props, id: props.name })}
        error={error}
      />
    </>
  );
}
