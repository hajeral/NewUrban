import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Urban Transition Boardroom",
  description: "Executive simulation for sustainability in smart cities"
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
