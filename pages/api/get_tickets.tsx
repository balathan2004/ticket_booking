import { NextApiRequest, NextApiResponse } from "next";
import {
  BookingInterface,
  BookingResponseConfig,
} from "@/components/interfaces";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/components/firebase";
export default async function (
  req: NextApiRequest,
  res: NextApiResponse<BookingResponseConfig>
) {
  if (req.method != "GET") {
    res.json({ status: 300, message: "error", bookings: [] });
    return   
}

  const userId = req.cookies.booking_uid || "";

  if (!userId) {
    res.json({ status: 300, message: "error", bookings: [] });
return  
}

  const docRef = doc(firestore, "docs", userId);
  const docData = (await getDoc(docRef)).data();

  if (docData) {
    res.json({
      status: 200,
      message: "sucess",
      bookings: docData.tickets as BookingInterface[],
    });
  }
}
