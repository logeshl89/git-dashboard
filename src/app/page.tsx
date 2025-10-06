import { LoginForm } from "@/components/login-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-grid-slate-100/[0.05]">
      <LoginForm />
    </main>
  );
}
