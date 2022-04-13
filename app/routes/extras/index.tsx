import { Anchor } from "@mantine/core";
import { Link } from "remix";

export default function ExtrasIndex() {
  return (
    <>
      <h1>Extras</h1>

      <ul>
        <li>
          <Anchor<typeof Link> component={Link} to="/extras/changelogs">
            Changelogs
          </Anchor>
        </li>
        <li>
          <Anchor<typeof Link>
            component={Link}
            to="/extras/tools/embed-builder"
          >
            Tools
          </Anchor>
        </li>
      </ul>
    </>
  );
}
