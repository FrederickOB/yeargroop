"use client";
import { Controller, useForm } from "react-hook-form";
import { TextInput, Button } from "..";

/**
 * Login form component.
 * @param {boolean} googleSignIn - Determines if Google Sign In is enabled.
 * @returns {JSX.Element} The login form component.
 */
export default function RegisterForm() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  /**
   * Handles the form submission.
   * @param {Object} data - The form data.
   */

  return (
    <div className="flex flex-col justify-center  w-full space-y-5 lg:w-2/3 p-10 border-2 border-blue-600 rounded-xl">
      <div className="flex flex-col space-y-2 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Hello Again!</h2>
        <p className="text-md md:text-xl">Welcome Back</p>
      </div>
      <form className="flex flex-col space-y-10">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Controller
            name="first_name"
            control={control}
            rules={{
              required: "Please enter your first name",
            }}
            render={({ field }) => (
              <TextInput
                label="first name"
                type="first_name"
                name="first_name"
                id="first_name"
                error={errors?.first_name?.message}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="last_name"
            control={control}
            rules={{
              required: "Please enter your last name",
            }}
            render={({ field }) => (
              <TextInput
                label="last name"
                type="last_name"
                name="last_name"
                id="last_name"
                error={errors?.last_name?.message}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="other_names"
            control={control}
            render={({ field }) => (
              <TextInput
                label="other names"
                type="other_names"
                name="other_names"
                id="other_names"
                onChange={field.onChange}
              />
            )}
          />

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
                label="E-Mail"
                type="email"
                name="email"
                id="email"
                error={errors?.email?.message}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="phone_number"
            control={control}
            rules={{
              required: "Please enter your phone number",
            }}
            render={({ field }) => (
              <TextInput
                label="Phone Number"
                type="phone_number"
                name="phone_number"
                id="phone_number"
                error={errors?.phone_number?.message}
                onChange={field.onChange}
              />
            )}
          />
          <div className="hidden lg:flex"></div>
          <Controller
            name="password"
            control={control}
            rules={{ required: "Please enter a password" }}
            render={({ field }) => (
              <div className="relative">
                <TextInput
                  label="Password"
                  type="password"
                  withPassword
                  name="password"
                  id="password"
                  error={errors?.password?.message}
                  onChange={field.onChange}
                />
              </div>
            )}
          />
          <Controller
            name="confirm_password"
            control={control}
            rules={{
              required: "please input a confirm_password",
              validate: (value) =>
                value === watch("password") || "The passwords do not match",
            }}
            render={({ field }) => (
              <div className="relative">
                <TextInput
                  label="confirm password"
                  type="confirm_password"
                  withPassword
                  name="confirm_password"
                  id="confirm_password"
                  error={errors?.confirm_password?.message}
                  onChange={field.onChange}
                />
              </div>
            )}
          />
        </div>
        <Button variant="contained" type="submit" size="md">
          Join Us
        </Button>
        <div className="flex flex-col w-full space-y-5">
          {
            <>
              <div className="flex items-center justify-center">
                <span className="w-full border border-black"></span>
                <span className="px-4">Or</span>
                <span className="w-full border border-black"></span>
              </div>
              {/* <GoogleSignIn /> */}
            </>
          }
          {/* <AccountRecovery /> */}
        </div>
      </form>
    </div>
  );
}
