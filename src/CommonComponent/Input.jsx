import React from "react";

const Input = ({
  labelText,
  inputType,
  placeholderText,
  id,
  name,
  className,
  onChangeInput,
}) => {
  return (
    <>
      <div className="my-10">
        <label
          htmlFor="email"
          className="font-semibold  text-[12px] text-dark-blue  opacity-50 font-Nunito"
        >
          {labelText}
        </label>
        <input
          type={inputType}
          placeholder={placeholderText}
          id={id}
          name={name}
          autoComplete="off"
          className={className}
          onChange={onChangeInput}
        />
      </div>
    </>
  );
};

export default Input;
