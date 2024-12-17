import React, { useState, useEffect } from "react";
import {
  BookingInterface,
  BookingResponseConfig,
} from "@/components/interfaces";
import styles from "@/styles/home.module.css";
import { useReplyContext } from "@/components/context/reply_context";
import TicketList from "@/components/elements/list";
import { useUserContext } from "@/components/context/user_context";

export default function YourTicket() {
  const { setReply } = useReplyContext();
  const [bookings, setBookings] = useState<BookingInterface[]>();
  const { userCred } = useUserContext();

  useEffect(() => {
    const getCred = async () => {
      const response = await fetch("/api/get_tickets", {
        method: "GET",
      });

      const res = (await response.json()) as BookingResponseConfig;

      if (res) {
        setReply(res.message);
        if (res.bookings) {
          setBookings(res.bookings);
        }
      }
    };
    getCred();
  }, []);

  if (!userCred) {
    return (
      <div className="main_container">
        <h1>Login First</h1>
      </div>
    );
  }

  return (
    <div className="main_container">
      <div className={styles.container}>
        <h1>Your Tickets</h1>
        {bookings?.map((item) => (
          <TicketList key={item.createdAt} data={item} />
        ))}
      </div>
    </div>
  );
}
