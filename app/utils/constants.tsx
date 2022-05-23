import marksy from "marksy";
import React from "react";
import { Prism } from "@mantine/prism";
import { Divider } from "@mantine/core";

export const compile = marksy({
  createElement: React.createElement,

  elements: {
    code({ language, code }) {
      return (
        <Prism withLineNumbers language={language as any}>
          {code}
        </Prism>
      );
    },

    hr() {
      return <Divider />;
    },
  },
});
