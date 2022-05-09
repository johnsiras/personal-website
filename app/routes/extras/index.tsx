import { Anchor, Container } from "@mantine/core";

import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => ({
  title: "Johnsiras - Extra Pages",
});

export default function ExtrasIndex() {
  return (
    <Container>
      <h1>Extras</h1>

      <ul>
        <li>
          <Anchor<typeof Link> component={Link} to="/extras/changelogs">
            Changelogs
          </Anchor>
        </li>
      </ul>
    </Container>
  );
}
