"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSAToastMutation } from "@/hooks/useSAToastMutation";
import type { ValidSAPayload } from "@/types";
import { Plus } from "lucide-react";
import { useState } from "react";

export const AppAdminCreateUserDialogPreview = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const { mutate: createUser, isLoading } = useSAToastMutation(
    async (email: string): Promise<ValidSAPayload<{ email: string }>> => {
      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return {
        status: "success",
        data: {
          email,
        },
      };
    },
    {
      loadingMessage: "Creating user...",
      successMessage: "User created!",
      errorMessage(error) {
        try {
          if (error instanceof Error) {
            return String(error.message);
          }
          return `Failed to create user ${String(error)}`;
        } catch (_err) {
          console.warn(_err);
          return "Failed to create user";
        }
      },
      onSuccess: () => {
        setOpen(false);
      },
    },
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus className="mr-2" /> Create User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 rounded-lg">
            <Plus className="w-6 h-6" />
          </div>
          <div className="p-1">
            <DialogTitle className="text-lg">Create User</DialogTitle>
            <DialogDescription className="text-base">
              Create a new user by entering their email address.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="grid gap-4">
          <Label className="space-y-2">
            <span>Email</span>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Label>
        </div>
        <DialogFooter className="mt-8">
          <Button
            onClick={() => {
              if (email.length > 0) {
                createUser(email);
              }
            }}
            aria-disabled={isLoading}
            type="button"
            className="w-full"
          >
            {isLoading ? "Loading..." : "Create User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
