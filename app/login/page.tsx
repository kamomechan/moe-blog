import LoginForm from "@/app/ui/login/login-form";

export default function Page() {
  return (
    <>
      <h1 className="text-center text-[13vw] text-[#3f80b5] pt-[17.8vw] lg:text-[5.2vw] lg:pt-[2.9vw] lg:dark:text-[#4284b9]">
        Login
      </h1>
      <LoginForm />
    </>
  );
}
