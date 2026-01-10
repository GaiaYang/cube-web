import BasicLayout from "@/components/layout/Basic";
import PageLayout from "@/components/layout/Page";

export default function layout({ children }: React.PropsWithChildren) {
  return (
    <BasicLayout>
      <PageLayout>{children}</PageLayout>
    </BasicLayout>
  );
}
