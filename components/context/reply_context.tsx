import React, { useContext, useState } from "react";

export type replyType = string | boolean;

export interface ReplyContextType {
  reply: replyType;
  setReply: React.Dispatch<React.SetStateAction<replyType>>;
}

export const ReplyContext = React.createContext<ReplyContextType>({
  reply: false,
  setReply: () => {},
});

const ReplyHolder = ({ children }: { children: React.ReactNode }) => {
  const [reply, setReply] = useState<replyType>(false);

  return (
    <ReplyContext.Provider value={{ reply, setReply }}>
      {children}
    </ReplyContext.Provider>
  );
};

export const useReplyContext = () => useContext(ReplyContext);
export default ReplyHolder