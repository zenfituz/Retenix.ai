import { AppShell } from "@/components/layout/app-shell";

export default function TrainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell role="trainer">{children}</AppShell>;
}
