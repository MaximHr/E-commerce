import type { UserT } from "@/types/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ChangeMemberRoleDialog from "../dialogs/ChangeMemberRoleDialog";
import { KickMemberAlert } from "../alerts/KickMemberAlert";

interface MembersTableProps {
  members: UserT[];
  setMembers: React.Dispatch<React.SetStateAction<UserT[]>>;
  currentUser: UserT;
}

export default function MembersTable({
  members,
  setMembers,
  currentUser,
}: MembersTableProps) {
  return (
    <div className="rounded-md border w-fit max-w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-5">Email</TableHead>
            <TableHead className="px-5">Role</TableHead>
            {currentUser && currentUser.role === "Owner" && (
              <>
                <TableHead className="px-5">Assign role</TableHead>
                <TableHead className="px-5">Remove member</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => {
            return (
              member && (
                <TableRow key={member.id}>
                  <TableCell className="px-5 max-w-[220px] whitespace-normal wrap-break-word">{member.email}</TableCell>
                  <TableCell className="px-5">{member.role}</TableCell>
                  {currentUser &&
                    currentUser.id != member.id &&
                    currentUser.role === "Owner" && (
                      <>
                        <TableCell className="px-5">
                          <ChangeMemberRoleDialog
                            setMembers={setMembers}
                            member={member}
                          />
                        </TableCell>
                        <TableCell className="px-5">
                          <KickMemberAlert
                            setMembers={setMembers}
                            id={member.id}
                          />
                        </TableCell>
                      </>
                    )}
                </TableRow>
              )
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
