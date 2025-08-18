import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import { type Schema, defaultValues, resolver } from "@/forms/algorithmInput";

export type FormContainerProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

/** 一般表單 */
export default function FormContainer({ children }: FormContainerProps) {
  const form = useForm<Schema>({ defaultValues, resolver });

  return (
    <FormProvider {...form}>
      <form>{children}</form>
    </FormProvider>
  );
}
