import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdminUser } from "@/lib/auth";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdminUser();
  return <AdminShell userEmail={user?.email ?? "admin@silongo.id"}>{children}</AdminShell>;
}
