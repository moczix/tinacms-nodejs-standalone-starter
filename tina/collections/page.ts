import type { Collection } from "tinacms";

export const PageCollection: Collection = {
  name: "pages",
  label: "Pages",
  path: "content/pages",
  ui: {
    // @ts-ignore
    defaultItem: {
      layout: "layout",
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "layout",
      label: "Layout",
      options: [
        "layout",
        // add more layouts here
      ],
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
    },
  ],
};
