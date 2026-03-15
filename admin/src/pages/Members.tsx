import type { UserT } from "@/types/user";
import { useState, useEffect } from "react";
import AddMemberDialog from "@/components/dialogs/AddMemberDialog";
import { listMembers } from "@/api/members";
import { handleError } from "@/api/errorHandler";
import { useOutletContext } from "react-router";
import type { AdminContext } from "@/types/context";
import MembersTable from "@/components/tables/MembersTable";
import { ToastContainer } from "react-toastify";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Members = () => {
  const [members, setMembers] = useState<UserT[]>([]);
  const { user } = useOutletContext<AdminContext>();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await listMembers();
        setMembers(res);
      } catch (err) {
        if (err instanceof Error) {
          handleError(err.message);
        } else {
          handleError("An error occurred. Try again later.");
        }
      }
    };

    fetchMembers();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="flex items-center gap-3 justify-between mb-7">
        <div className="flex gap-2">
          <SidebarTrigger className="md:hidden " />
          <h1 className="text-xl md:text-2xl special-font">
            Members
            <span>{members.length > 0 ? ` (${members.length})` : ``}</span>
          </h1>
        </div>
        {user && user.role == "Owner" && (
          <AddMemberDialog setMembers={setMembers} />
        )}
      </div>
      <MembersTable
        currentUser={user}
        members={members}
        setMembers={setMembers}
      />
    </>
  );
};

export default Members;
