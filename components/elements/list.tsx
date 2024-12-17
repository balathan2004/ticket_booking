import React, { FC } from "react";
import { BookingInterface } from "../interfaces";
import styles from "@/styles/home.module.css";

interface Props {
  data: BookingInterface;
}

const TicketList: FC<Props> = ({ data }) => {
  return (
    <div className={styles.ticket_list}>
      <span>{data.productId}</span>
      <span>cost {data.productCost}</span>
   
    </div>
  );
};

export default TicketList
