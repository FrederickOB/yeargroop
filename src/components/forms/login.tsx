"use client";
import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { TextInput, InputError, Button } from "..";
import { signIn } from "next-auth/react";
import { LoginFormType } from "@/types";
import { useRouter } from "next/navigation";

/**
 * Login form component.
 * @param {boolean} googleSignIn - Determines if Google Sign In is enabled.
 * @returns {JSX.Element} The login form component.
 */
export default function LoginForm() {
  const { push } = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>();

  /**
   * Handles the form submission.
   * @param {Object} data - The form data.
   */

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    const { email, password } = data;
    console.log("data", data);

    try {
      const signInData = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      if (signInData?.error) {
        console.log(signInData.error);
      } else {
        push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center  w-full space-y-5 lg:w-1/3 p-10 border-2 border-blue-600 rounded-xl">
      <div className="flex flex-col space-y-2 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Hello Again!</h2>
        <p className="text-md md:text-xl">Welcome Back</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
      >
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Please enter your email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Please enter a valid email!",
            },
          }}
          render={({ field }) => (
            <TextInput
              icon={<AtSymbolIcon className="w-5 h-5" />}
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              onChange={field.onChange}
            />
          )}
        />
        {errors?.email && <InputError>{errors?.email.message}</InputError>}
        <Controller
          name="password"
          control={control}
          rules={{ required: "Please enter a password" }}
          render={({ field }) => (
            <div className="relative">
              <TextInput
                icon={<LockClosedIcon className="w-5 h-5" />}
                type="password"
                withPassword
                name="password"
                id="password"
                placeholder="Password"
                onChange={field.onChange}
              />
            </div>
          )}
        />
        {errors?.password && (
          <InputError>{errors?.password.message}</InputError>
        )}
        <Button variant="contained" type="submit" size="md">
          Login
        </Button>
        <div className="flex flex-col w-full space-y-5">
          {/* {googleSignIn && (
            <> */}
          <div className="flex items-center justify-center">
            <span className="w-full border border-black"></span>
            <span className="px-4">Or</span>
            <span className="w-full border border-black"></span>
          </div>
          {/* <GoogleSignIn /> */}
          {/* </>
          )} */}
          {/* <AccountRecovery /> */}
        </div>
      </form>
    </div>
  );
}
