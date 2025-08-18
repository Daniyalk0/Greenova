import { redirect } from "next/navigation";
import SetPasswordForm from "@/components/SetPasswordForm";

interface PageProps {
  searchParams?: {
    email?: string;
    provider?: string;
  };
}

export default function SetPasswordPage({ searchParams }: PageProps) {
  const email = searchParams?.email;
  const provider = searchParams?.provider;

  if (!email || !provider) {
    // Redirect if missing required params to block direct access
    redirect("/login");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    redirect("/login");
  }

  return <SetPasswordForm email={email} provider={provider} />;
}
