import { NextApiRequest, NextApiResponse } from "next";
import { doc, getDoc } from "firebase/firestore";
import { AuthResponseConfig, UserDataInterface } from "@/components/interfaces";
import { firestore } from "@/components/firebase";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<AuthResponseConfig>
) {
  if (req.method !== "GET") {
    res.json({ status: 300, message: "error", userCredentials: null });
    return
  }

  const userId = req.cookies.booking_uid || "";
  console.log(userId)

  if (!userId) {
    res.json({ status: 300, message: "error", userCredentials: null });
 return
  }


  const docRef = doc(firestore, "users", userId);
  const userData = (await getDoc(docRef)).data();
  if(userData){
    res.json({ status: 200, message: "success", userCredentials: (userData.userCred  as UserDataInterface) });
  }else{
    res.json({ status: 300, message: "error", userCredentials: null });
 return
  }

  
}