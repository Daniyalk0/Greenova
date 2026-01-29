import { prisma } from "@/lib/prisma";
import VerifyClient from "./Verify-client";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams?: any;
}) {
  const token = searchParams?.token;
  if (!token) {
    return <VerifyClient status="invalid" />;
  }

  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!record || record.expires < new Date()) {
    return <VerifyClient status="expired" />;
  }

  // Update only if not already verified
  await prisma.user.updateMany({
    where: {
      email: record.identifier,
      emailVerified: null,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  // Delete token AFTER successful verification
  await prisma.verificationToken.delete({
    where: { token },
  });

  return <VerifyClient status="success" />;
}
