import { handleError } from "@/api/errorHandler";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import type { UserT } from "@/types/user";
import { updateRole } from "@/api/members";
import { toast } from "react-toastify";

interface ChangeMemberRoleProps {
  setMembers: React.Dispatch<React.SetStateAction<UserT[]>>;
  member: UserT;
}

export default function ChangeMemberRoleDialog({
  setMembers,
  member,
}: ChangeMemberRoleProps) {
  const [newRole, setNewRole] = useState<string>(member ? member.role : "");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (member) {
        const res = await updateRole(member.id, newRole);
        toast.success(res);
        setMembers((currentMembers) => {
          return (
            currentMembers &&
            currentMembers.map((m) =>
              m?.id === member.id ? { ...m, role: newRole } : m
            )
          );
        });
        setIsOpen(false);
      }
    } catch (err) {
      if (err instanceof Error) {
        handleError(err.message);
      } else {
        handleError("An error occurred. Try again later.");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Change role</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-2">
          <DialogTitle>Change role</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="role">New role</Label>
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a new role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Store manager">Store Manager</SelectItem>
                  <SelectItem value="Product manager">
                    Product Manager
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={newRole === member?.role}>
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
