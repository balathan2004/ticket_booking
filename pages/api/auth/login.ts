import {
  AuthResponseConfig,
  ResponseConfig,
  UserDataInterface,
} from "@/components/interfaces";
import { NextApiRequest, NextApiResponse } from "next";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/components/firebase";
import { setCookie } from "cookies-next";
export default async function (
  req: NextApiRequest,
  res: NextApiResponse<AuthResponseConfig>
) {
  const isSecure = process.env.NODE_ENV == "production" ? true : false;

  if (req.method !== "POST") {
    return;
  }

  const { email, password } = req.body;

  if (!email || !password) {
    res.json({ status: 300, message: "error", userCredentials: null });
    return;
  }

  try {
    const userData = (await signInWithEmailAndPassword(auth, email, password))
      .user;

    if (!userData) {
      res.json({ status: 300, message: "error", userCredentials: null });
      return;
    }

    const userCred: UserDataInterface = {
      email: userData.email || "",
      userId: userData.uid,
    };

    setCookie("booking_uid", userCred.userId, {
      req,
      res,
      maxAge: 2592000000,
      httpOnly: true,
      sameSite: "none",
      secure: isSecure,
    });

    res.json({ status: 200, message: "logged in ", userCredentials: userCred });
  } catch (err:any) {
    console.log(err)
    res.json({ status: 300, message: err.message, userCredentials: null });
  }
}
