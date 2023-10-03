import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { ButtonBaseProps, ButtonGroupProps, ButtonProps } from "@mui/material";
import { FieldError, FieldErrorsImpl } from "react-hook-form";

export type organization = {
  name: string;
  logo?: string;
  color:
    | "red"
    | "yellow"
    | "blue"
    | "orange"
    | "purple"
    | "green"
    | "black"
    | "white";
};

export type InputType = {
  label?: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  name?: string;
  id?: string;
};
export type TextInputType = InputType &
  JSX.IntrinsicElements["input"] & {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    icon?: JSX.Element;
    withPassword?: boolean;
    type?: HTMLInputTypeAttribute;
  };
export type TextAreaType = InputType & {
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export type InputErrorType = {
  children:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
};

export type ButtonProps = {
  children: ReactNode;
  variant?: "contained" | "outlined" | "text";
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  size?: "sm" | "md" | "lg";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type LoginFormType = { email: string; password: string };

type PaymentInput = {
  email: string;
  amount: number;
  currency?: "GHS" | "USD";
  reference?: string;
  callback_url?: string;
  callback_url?: string;
  metadata?: string;
};
