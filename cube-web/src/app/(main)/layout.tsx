import BasicLayout from "@/components/layout/Basic";

export default function layout({ children }: React.PropsWithChildren) {
  return (
    <BasicLayout>
      <main>{children}</main>
    </BasicLayout>
  );
}
