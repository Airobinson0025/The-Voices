"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Paragraph from "@tiptap/extension-paragraph";
import { Bold, Italic } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../ui/tooltip";

export default function JournalEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Paragraph,
      Placeholder.configure({ placeholder: "Whats on your mind?..." }),
    ],
  });

  return (
    <div className="border-2 rounded-md p-2 shadow-sm dark:bg-secondary">
      <div className="border-b mb-4 pb-2 flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-[#E78F8E] dark:hover:hover:bg-[#E78F8E] ${
                  editor?.isActive("bold")
                    ? "bg-[#E78F8E] "
                    : "bg-primary dark:bg-secondary"
                }`}
              >
                <Bold size={16} color="white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bold (Cmd/Ctrl + B)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-[#E78F8E] dark:hover:bg-[#E78F8E] ${
                  editor?.isActive("italic")
                    ? "bg-[#E78F8E] "
                    : "bg-primary dark:bg-secondary"
                }`}
              >
                <Italic size={16} color="white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Italic (Cmd/Ctrl + I)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none min-h-[500px] pl-2 placeholder:text-muted-foreground"
      />
    </div>
  );
}
