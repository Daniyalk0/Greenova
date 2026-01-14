import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useAuthSource() {
  const { data: session, status } = useSession();
  const [isNextAuthUser, setIsNextAuthUser] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setIsNextAuthUser(true);
    } else {
      setIsNextAuthUser(false);
    }
  }, [status, session]);

  return { isNextAuthUser, status };
}
