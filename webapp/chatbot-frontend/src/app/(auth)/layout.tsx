import { Card } from "@/components/ui/card";
import { LayoutProps } from "../../../.next/types/app/layout";

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="grid place-items-center h-dvh">
      <div className="w-1/2 max-w-[500px] min-w-[300px]">
        <Card>{children}</Card>
      </div>
    </div>
  );
}
