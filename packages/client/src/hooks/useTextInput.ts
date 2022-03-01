import { ChangeEventHandler, useState } from "react";

type Target = HTMLInputElement | HTMLTextAreaElement;

export type TextInput = { value: string; onChange: ChangeEventHandler<Target> };

type UseTextInputReturn = [TextInput, (resetValue?: string) => void];

export const useTextInput = (initValue = ""): UseTextInputReturn => {
  const [value, setValue] = useState(initValue);
  const onChange: ChangeEventHandler<Target> = (e) => {
    setValue(e.target.value);
  };
  const reset = (resetValue = "") => setValue(resetValue);
  return [{ value, onChange }, reset];
};
