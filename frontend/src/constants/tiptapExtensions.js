import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";
import Dropcursor from '@tiptap/extension-dropcursor';
import Image from '@tiptap/extension-image';

import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

export const extensions = [
  Color.configure({ types: [TextStyle.name] }),
  TextStyle,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
    listItem: {
      HTMLAttributes: {
        style: 'color: inherit;',
      },
    },
    paragraph: {
      HTMLAttributes: {
        style: 'color: inherit;',
      },
    },
    textStyle: {
      HTMLAttributes: {
        style: 'color: inherit;',
      },
    },
  }),
  CodeBlockLowlight.configure({
    lowlight,
  }),
  Dropcursor,
  Image.configure({
    HTMLAttributes: {
      class: 'w-full object-cover object-center',
    },
  }),
];
