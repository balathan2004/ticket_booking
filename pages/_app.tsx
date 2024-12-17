import DrawerAppBar from "@/components/elements/navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ReplyHolder from "@/components/context/reply_context";
import ReplyPopup from "@/components/elements/ReplyPopup";
import UserCredHolder from "@/components/context/user_context";
import { useEffect } from "react";
import { AuthResponseConfig } from "@/components/interfaces";
import Wrapper from "@/components/context/wrapper";


export default function App({ Component, pageProps }: AppProps) {
 


 
  return (
    <div className="container">
      <UserCredHolder>
      <ReplyHolder>
        <Wrapper>
        <DrawerAppBar />
        <ReplyPopup/>
        <Component {...pageProps} />
        </Wrapper>
      </ReplyHolder>
      </UserCredHolder>
    </div>
  );
}
