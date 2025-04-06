"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
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
      Placeholder.configure({ placeholder: "Whats on your mind?..." }),
    ],
  });

  return (
    <div className="border rounded-md p-2 shadow-md">
      <div className="border-b mb-4 pb-2 flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`p-2 rounded ${
                  editor?.isActive("bold") ? "bg-[#E78F8E] " : "bg-primary"
                }`}
              >
                <Bold size={16} color="white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bold</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`p-2 rounded ${
                  editor?.isActive("italic") ? "bg-[#E78F8E] " : "bg-primary"
                }`}
              >
                <Italic size={16} color="white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Italic</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none min-h-[300px] p-2 placeholder:text-muted-foreground"
      />
    </div>
  );
}
