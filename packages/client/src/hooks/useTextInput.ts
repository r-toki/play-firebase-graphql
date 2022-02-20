import { ChangeEventHandler, useState } from "react";

type Target = HTMLInputElement | HTMLTextAreaElement;

type UseTextInputReturn = [
  { value: string; onChange: ChangeEventHandler<Target> },
  (resetValue?: string) => void
];

export const useTextInput = (initValue = ""): UseTextInputReturn => {
  const [value, setValue] = useState(initValue);
  const onChange: ChangeEventHandler<Target> = (e) => {
    setValue(e.target.value);
  };
  const reset = (resetValue = "") => setValue(resetValue);
  return [{ value, onChange }, reset];
};
