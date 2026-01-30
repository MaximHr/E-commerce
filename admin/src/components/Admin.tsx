import { AppSidebar } from "./sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import type { UserT } from "@/types/user";
import { handleError } from "@/api/errorHandler";
import { getProfile } from "@/api/members";

import { Outlet } from "react-router";

const Admin = () => {
  const [user, setUser] = useState<UserT>(undefined);

  const loadUser = async () => {
    try {
      const data = await getProfile();
      setUser(data);
    } catch (err) {
      handleError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <ToastContainer />
      <div className="p-7 w-full">
        <Outlet context={{ user }} />
      </div>
    </SidebarProvider>
  );
};

export default Admin;
