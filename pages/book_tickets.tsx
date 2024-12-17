import React from "react";
import { useUserContext } from "@/components/context/user_context";
import { TicketInterface } from "@/components/interfaces";
import Ticket from "@/components/elements/tickets";
import styles from "@/styles/home.module.css";
import data from "@/components/data.json"
export default function BookTickets() {

  const { userCred } = useUserContext();

  const dummyTickets:TicketInterface[]=data.products

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
      <h1>book tickets</h1>
      <div className={styles.tickets_container}>
        {dummyTickets.map((item) => (
          <Ticket key={item.ticketId} data={item} />
        ))}
        </div>
      </div>
    </div>
  );
}
