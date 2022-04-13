import { DefaultMantineColor } from "@mantine/core";

type BlogProps = {
  image?: {
    url: string;
    height?: number | string;
    alt?: string;
  };
  
  label: string;
  description?: string;
  redirectTo: string;
  color?: DefaultMantineColor;
  // id: number;
}[];

export type { BlogProps };
