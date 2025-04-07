"use client";

import { PenLine } from "lucide-react";
import { Button } from "../ui/button";
import { X, Save, Users, Globe, Lock } from "lucide-react";
import { Switch } from "../ui/switch";
import JournalEditor from "../layout/JournalEditor";
// import { useState } from "react";
// import { createJournalEntry } from "@/services/journalServices";

export default function CreateEntry() {
  //   const [formData, setFormData] = useState({
  //     title: "",
  //     content: "",
  //     publishImmediately: false,
  //     postAnonymously: true,
  //     visibility: "private",
  //   });

  const currentDateAndTime = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = currentDateAndTime.toLocaleString("en-US", options);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-2">
        <PenLine size={30} />
        <h1 className="text-2xl md:text-3xl">New Entry</h1>
      </div>
      <div>
        <p className="text-lg md:text-xl text-muted-foreground mt-2">
          Dont think, just write it down.
        </p>
      </div>

      <div className="flex items-center justify-between mt-10">
        <input
          placeholder="Add a title"
          className="placeholder:text-muted-foreground text-xl py-4 pl-2 border-none shadow-none focus:ring-0 focus:outline-none focus:border-none"
          type="text"
        />
        <p className="hidden md:inline text-[#E78F8E]">{formattedDate}</p>
      </div>

      <div className="mt-6">
        <JournalEditor />
      </div>

      <div className="p-4 mt-6 rounded-lg">
        <div>
          <h1 className="text-center md:text-lg">Publishing Options</h1>
          <p className="text-sm text-muted-foreground text-center">
            Choose how you want to publish your entry.
          </p>
        </div>

        <section className="flex flex-col itmes-center space-y-6 max-w-3xl mx-auto">
          {/* Publishing Options */}
          <div className="">
            <div className="flex items-center justify-between mt-14">
              <div className="gap-3">
                <h2 className="font-medium">Publish Immediately</h2>
                <p className="text-sm text-muted-foreground">
                  Or save as draft.
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between mt-10">
              <div className="gap-3">
                <h2 className="font-medium">Post Anonymously</h2>
                <p className="text-muted-foreground text-sm">
                  Hide your identity.
                </p>
              </div>
              <Switch className="cursor-pointer" />
            </div>
          </div>

          {/* Privacy Options */}
          <div className="mt-10">
            <h1 className="font-medium text-center md:text-lg">Visibility</h1>
            <p className="text-sm text-muted-foreground text-center">
              Choose who can see your entry.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="flex flex-col items-center justify-center border py-2 rounded-md cursor-pointer shadow-lg dark:bg-secondary">
                <Lock size={20} />
                <p className="">Private</p>
              </div>
              <div className="flex flex-col items-center justify-center border py-2 rounded-md cursor-pointer shadow-lg dark:bg-secondary">
                <Users size={20} />
                <p className="">Followers</p>
              </div>
              <div className="flex flex-col items-center justify-center border py-2 rounded-md cursor-pointer shadow-lg dark:bg-secondary">
                <Globe size={20} />
                <p className="">Public</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between my-8">
            <Button variant="secondary" className="cursor-pointer">
              <X />
              Cancel
            </Button>
            <Button className="ml-2 cursor-pointer">
              <Save /> Save As Draft
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
