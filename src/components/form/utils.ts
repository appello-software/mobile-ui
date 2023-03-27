import { FieldError, FieldValues, UseControllerReturn } from 'react-hook-form';

export function getFieldError<TFormValues extends FieldValues>(
  controller: UseControllerReturn<TFormValues>,
): FieldError | undefined {
  const showError =
    !controller.formState.isValid &&
    !controller.formState.isValidating &&
    !!controller.fieldState.error;

  return showError ? controller.fieldState.error : undefined;
}
