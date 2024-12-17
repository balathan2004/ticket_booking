import React, {  useEffect, useState } from "react";
import { useRouter } from "next/router";
import data from "@/components/data.json";
import { Button, TextField } from "@mui/material";
import { ResponseConfig, TicketInterface } from "@/components/interfaces";
import styles from "@/styles/home.module.css";
import { useUserContext } from "@/components/context/user_context";
import { useReplyContext } from "@/components/context/reply_context";
export default function ProductPage() {
  const router = useRouter();
  const {userCred}=useUserContext()
 
  const { id } = router.query;
  const [product, setProduct] = useState<null | TicketInterface>(null);

  const [handleCost, setHandleCost] = useState(0);
  const { setReply } = useReplyContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9]/g, ""); // Strip non-numeric characters
    const parsedValue = parseInt(newValue, 10); // Parse the cleaned value

    if (!Number.isNaN(parsedValue) && parsedValue >= 0 && product) {
      setHandleCost(parsedValue * product.ticketPrice);
    } else {
      setHandleCost(0); // Reset cost if input is invalid or empty
    }
  };

  useEffect(() => {
    const filtered = data.products.filter((item) => item.ticketId == id);
    if (filtered.length > 0) {
      setHandleCost(filtered[0].ticketPrice);
      setProduct(filtered[0]);
    }
  }, [id]);

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userCred && handleCost && product) {
      console.log(userCred);

      const data = {
        productId: product.ticketName,
        productCost: handleCost,
        userId: userCred.userId,
      };

      console.log(data);

      const response = await fetch("/api/book_tickets", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = (await response.json()) as ResponseConfig;
      if (res) {
        setReply(res.message);
        router.push("/");
      }
    } else {
      console.log("check everything");
    }
  };

  return (
    <div className="main_container">
      <div className={styles.container}>
        {product && userCred ? (
          <form onSubmit={handleForm}>
            <h2>{product.ticketName}</h2>

            <h2>Price {product.ticketPrice}</h2>
            <input
              required
              defaultValue={1}
              min={1}
              onChange={handleChange}
              pattern="[0-9]*"
              inputMode="numeric"
              type="number"
            ></input>
            <h2>total cost is {handleCost}</h2>
            <Button type="submit" className={styles.button} variant="contained">
              Confirm
            </Button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
