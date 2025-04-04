import RedirectIfNotAuthenticated from "@/components/redirectIfNotAuthenticated";
import { LayoutProps } from "../../../.next/types/app/layout";

export const dynamic = "force-dynamic";

export default function Layout({ children }: LayoutProps) {
    return <RedirectIfNotAuthenticated>{children}</RedirectIfNotAuthenticated>;
}
