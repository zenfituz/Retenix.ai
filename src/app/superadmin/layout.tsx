import { AppShell } from "@/components/layout/app-shell";

export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell role="superadmin">{children}</AppShell>;
}
