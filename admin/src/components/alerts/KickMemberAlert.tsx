import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { kickMember } from "@/api/members";
import { toast } from "react-toastify";
import type { UserT } from "@/types/user";
import { handleError } from "@/api/errorHandler";

interface KickMemberAlertProps {
  id: number;
  setMembers: React.Dispatch<React.SetStateAction<UserT[]>>;
}

export function KickMemberAlert({ id, setMembers }: KickMemberAlertProps) {
  const [open, setOpen] = useState(false);

  const handleKickMember = async () => {
    try {
      await kickMember(id);
      toast.success("Member kicked successfully.");
      setMembers(prev => prev.filter((member) => member?.id !== id));
      setOpen(false);
    } catch (err) {
      if (err instanceof Error) {
        handleError(err.message);
      } else {
        handleError("An error occurred. Try again later.");
      }
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
          Kick member
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white" onClick={handleKickMember}>
            Kick member
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
