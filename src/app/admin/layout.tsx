import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Parichay Photography",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Admin pages render without the public Navbar/Footer
  return <>{children}</>;
}
