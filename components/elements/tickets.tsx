import React, { Component } from "react";
import { TicketInterface } from "../interfaces";
import Link from "next/link";

interface Props {
  data: TicketInterface;
}

const Ticket = ({ data }: Props) => {
  return (
    <article>
      <h1>{data.ticketName}</h1>
      <p>{data.ticketDesc}</p>
      <Link href={`/products/${data.ticketId}`}>{data.ticketPrice}Rupees</Link>
    </article> 
  );
};


export default Ticket