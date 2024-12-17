import { AuthResponseConfig, UserDataInterface } from "@/components/interfaces";
import { NextApiRequest, NextApiResponse } from "next";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "@/components/firebase";
import { setCookie } from "cookies-next";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<AuthResponseConfig>
) {
  const isSecure = process.env.NODE_ENV === "production" ? true : false;
  if (req.method !== "POST") {
    return;
  }

  const { email, password } = req.body;

  if (!(email && password)) {
    res.json({ status: 300, message: "error", userCredentials: null });
    return;
  }

  try {
    const userData = (
      await createUserWithEmailAndPassword(auth, email, password)
    ).user;

    if (!userData) {
      res.json({ status: 300, message: "error", userCredentials: null });
      return;
    }

    const userCred: UserDataInterface = {
      email: userData.email || "",
      userId: userData.uid,
    };

    const docRef = doc(firestore, "users", userCred.userId);

    await setDoc(docRef, { userCred });

    setCookie("booking_uid", userCred.userId, {
      req,
      res,
      maxAge: 2592000000,
      httpOnly: true,
      sameSite: "none",
      secure: isSecure,
    });

    res.json({
      status: 200,
      message: "account created",
      userCredentials: userCred,
    });
  } catch (err: any) {
    res.json({
      status: 200,
      message: err.message,
      userCredentials: null,
    });
  }
}
