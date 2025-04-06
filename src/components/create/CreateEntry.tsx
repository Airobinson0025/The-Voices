"use client";

import { PenLine } from "lucide-react";
import { Button } from "../ui/button";
import { X, Save, Users, Globe, Lock } from "lucide-react";
import { Switch } from "../ui/switch";
import JournalEditor from "../layout/JournalEditor";
import { useState } from "react";
import { createJournalEntry } from "@/services/journalServices";

export default function CreateEntry() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    publishImmediately: false,
    postAnonymously: true,
    visibility: "private",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToggle = (e: React.FormEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, checked } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <section className="flex items-center gap-2">
        <PenLine size={30} />
        <h1 className="text-2xl md:text-3xl">New Entry</h1>
      </section>
      <div>
        <p className="text-lg md:text-xl text-muted-foreground mt-2">
          Dont think, just write it down.
        </p>
      </div>

      <div className="">
        <input
          placeholder="Title"
          className="placeholder:text-muted-foreground text-xl py-4 pl-2 w-full border-none shadow-none mt-10 focus:ring-0 focus:outline-none focus:border-none"
          type="text"
        />
      </div>

      <div className="mt-6">
        <JournalEditor />
      </div>

      <div className="p-4 mt-6 rounded-lg">
        <div>
          <h1 className="text-center">Publishing Options</h1>
        </div>

        <section className="flex flex-col itmes-center space-y-6 max-w-3xl mx-auto">
          {/* Publishing Options */}
          <div className="">
            <div className="flex items-center justify-between mt-8">
              <div className="gap-3">
                <h2 className="font-medium">Publish Immediately</h2>
                <p className="text-sm text-muted-foreground">
                  Or save as draft.
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="gap-3">
                <h2 className="font-medium">Post Anonymously</h2>
                <p className="text-muted-foreground text-sm">
                  Hide your identity.
                </p>
              </div>
              <Switch
                checked={formData.postAnonymously}
                onChange={handleToggle}
                onClick={() => {
                  setFormData((prevData) => ({
                    ...prevData,
                    postAnonymously: !formData.postAnonymously,
                  }));
                }}
                name="postAnonymously"
                className="cursor-pointer"
              />
            </div>
          </div>

          {/* Privacy Options */}
          <div className="mt-10">
            <h2 className="font-medium text-center">Visibility</h2>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="flex flex-col items-center justify-center border border-primary py-2 rounded-md cursor-pointer">
                <Lock size={20} />
                <p className="">Private</p>
              </div>
              <div className="flex flex-col items-center justify-center border border-primary py-2 rounded-md cursor-pointer">
                <Users size={20} />
                <p className="">Followers</p>
              </div>
              <div className="flex flex-col items-center justify-center border border-primary py-2 rounded-md cursor-pointer">
                <Globe size={20} />
                <p className="">Public</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
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
