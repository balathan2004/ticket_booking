import React, { useEffect } from "react";
import { useUserContext } from "./user_context";
import { AuthResponseConfig } from "../interfaces";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const { setUserCred } = useUserContext();

  useEffect(() => {
    const getCred = async () => {
      const response = await fetch("/api/auth/login_cred", { method: "GET" });
      const res = (await response.json()) as AuthResponseConfig;

      if (res ) {
        console.log(res)
        if(res.userCredentials){
            setUserCred(res.userCredentials);
        }
        
      }
    };
    getCred();
  }, []);
  return <>{children}</>;
}
