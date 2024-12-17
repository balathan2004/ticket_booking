
import { setDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "@/components/firebase";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseConfig } from "@/components/interfaces";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  if (req.method !== "POST") {
    res.json({ status: 300, message: "error" });
    return;
  }

  const { userId, productId, productCost } = req.body;
  console.log(req.body)

  if (!userId || !productId || !productCost) {
    res.json({ status: 300, message: "not all values present" });
    return;
  }

  const docRef = doc(firestore, "docs", userId);

  const docData = await getDoc(docRef);

  if (docData.exists()) {
    await updateDoc(docRef, {
      tickets: arrayUnion({
        userId: userId,
        productCost: productCost,
        productId: productId,
        createdAt:new Date().getTime()
      }),
    });
  } else {
    setDoc(docRef, {
      tickets: [
        { userId: userId, productCost: productCost, productId: productId, createdAt:new Date().getTime() },
      ],
    });
  }
  res.json({ status: 200, message: "success" });
}
