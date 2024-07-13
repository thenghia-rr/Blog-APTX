import { EditorContent, useEditor } from "@tiptap/react";
import "highlight.js/styles/atom-one-dark.css";
import MenuBar from "./MenuBar";
import { extensions } from "../../constants/tiptapExtensions";
// import { useEffect } from "react";

const Editor = ({ onDataChange, content, editable }) => {
  // const themeCurrent = localStorage.getItem("theme") || "light";

  const editor = useEditor({
    editable,
    extensions: extensions,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none m-5 focus:outline-none prose-pre:bg-[#282c34] prose-pre:text-[#abb2bf]",
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onDataChange(json);
    },
    content: content,
  });

  // useEffect(() => {
  //   const handleDarkMode = () => {
  //     const editorContent = document.querySelector(".ProseMirror");
  //     if (editorContent) {
  //       // Select all elements
  //       editorContent.querySelectorAll("*").forEach((element) => {
  //         const color = getComputedStyle(element).color;
  //         if (color === "rgb(36, 36, 36)") {
  //           element.style.color = "";
  //         }
  //       });
  //     }
  //   };

  //   handleDarkMode();
  //   window.addEventListener("darkmodechange", handleDarkMode);

  //   return () => {
  //     window.removeEventListener("darkmodechange", handleDarkMode);
  //   };
  // }, [editor, themeCurrent]);

  return (
    <div className="w-full relative">
      {editable && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
