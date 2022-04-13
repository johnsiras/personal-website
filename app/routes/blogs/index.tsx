import { SimpleGrid } from "@mantine/core";
import CardComponent from "~/components/Card/Card";
import { blogs } from "./blogs.items";

export default function BlogsIndex() {
  return (
    <SimpleGrid
      breakpoints={[
        { minWidth: "xs", cols: 1 },
        { minWidth: "sm", cols: 2 },
        { minWidth: "md", cols: 3 },
        { minWidth: "lg", cols: 3 },
      ]}
    >
      {blogs.map((item) => (
        <CardComponent
          key={item.label}
          author={{ name: "Johnsiras", image: item.image?.url as string }}
          image={item.image?.url as string}
          link={item.redirectTo}
          description={item.description as string}
          title={item.label}
        />
        // <Card
        //   key={item.label}
        //   sx={(theme) => ({ ":hover": { boxShadow: theme.shadows.lg } })}
        //   mt="md"
        //   mb="xl"
        //   p="lg"
        // >
        //   <Card.Section>
        //     <Image
        //       src={item.image?.url}
        //       height={160}
        //       alt={item.image?.alt}
        //     />
        //   </Card.Section>

        //   <Group
        //     position="apart"
        //     style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        //   >
        //     <Text weight={500}>{item.label}</Text>
        //     {/* <Badge color="blue" variant="light">
        //       Coming Soon
        //     </Badge> */}
        //   </Group>

        //   <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
        //     {item.description}
        //   </Text>

        //   <Button
        //     component={Link}
        //     to={item.redirectTo}
        //     color={item.color}
        //     style={{ marginTop: 14 }}
        //     variant="light"
        //     fullWidth
        //   >
        //     Go
        //   </Button>
        // </Card>
      ))}
    </SimpleGrid>
  );
}
