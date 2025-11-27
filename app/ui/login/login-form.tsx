"use client";

import { authenticate, LoginState } from "@/app/lib/actions";
import { useActionState } from "react";

export default function LoginForm() {
  const initialState: LoginState = { errors: {}, message: null };
  const [state, formAction] = useActionState(authenticate, initialState);
  return (
    <form
      action={formAction}
      className="w-[80vw] m-[12vw_auto_0_auto] lg:m-[5vw_auto_0_auto] lg:w-[34vw]"
    >
      <label htmlFor="username" className="sr-only">
        username
      </label>
      <input
        type="text"
        id="username"
        name="username"
        className="w-full bg-[#a7c4dc69] rounded-[7vw] p-[2vw_0_2vw_5vw] lg:p-[1vw_0_1vw_2vw] dark:text-[#ccc] dark:bg-[#5e707d69]"
        placeholder="username"
        aria-label="username"
        aria-describedby="username-error"
      />
      {state.errors?.username && (
        <p
          id="username-error"
          aria-live="polite"
          className="text-[#8e4141] text-sm ml-[1vw] dark:text-[#d98787]"
        >
          {state.errors.username.map((item) => item)}
        </p>
      )}
      <label htmlFor="password" className="sr-only">
        password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        className="w-full bg-[#a7c4dc69] mt-[4vw] rounded-[7vw] p-[2vw_0_2vw_5vw] lg:p-[1vw_0_1vw_2vw] lg:mt-[1vw] dark:text-[#ccc] dark:bg-[#5e707d69]"
        placeholder="password"
        aria-label="password"
        aria-describedby="password-error"
      />
      {state?.errors?.password && (
        <p
          id="password-error"
          aria-live="polite"
          className="text-[#8e4141] text-sm ml-[1vw] dark:text-[#d98787]"
        >
          {state.errors.password.map((item) => item)}
        </p>
      )}
      {/* Prevents basic bots */}
      <input type="hidden" id="email" name="email" />
      <button
        type="submit"
        className="w-full bg-[#5c95bf70] mt-[8vw] rounded-[7vw] text-[#314a5f] p-[2vw_0_2vw_0vw] lg:p-[1vw_0_1vw_0] lg:mt-[3vw] dark:text-[#ccc] dark:bg-[#3d6e9370]"
        aria-describedby="submit-error"
      >
        Login
      </button>
      {state?.message && (
        <p
          id="password-error"
          aria-live="polite"
          className="text-[#8e4141] text-sm ml-[1vw] dark:text-[#d98787]"
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
