import React, { forwardRef } from "react";

type InputProps = {
  name: string;
  className?: string;
  label?: string;
  placeholder?: string;
  onChangeCallback?: (value: string) => void;
};

export const Input = forwardRef(function Input(
  props: InputProps,
  ref?: React.LegacyRef<HTMLInputElement> | undefined
) {
  const { name, className, label, placeholder, onChangeCallback } = props;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChangeCallback) return;
    const value = event.target.value;
    onChangeCallback(value);
  };

  return (
    <div className={className}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        onChange={onChangeHandler}
        id={name}
        className={
          "p-2 bg-slate-300/20 w-full shadow-sm rounded-md border border-color-accent focus:outline-none focus:bg-slate-300/40"
        }
        name={name}
        type="text"
        ref={ref}
        placeholder={placeholder}
      />
    </div>
  );
});
