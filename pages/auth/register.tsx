import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useRouter } from "next/router";
import styles from "../../styles/auth.module.css"
import { AuthResponseConfig } from "@/components/interfaces";
import { useUserContext } from "@/components/context/user_context";
export default function SignUp() {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  

  const {setUserCred}=useUserContext()
  const [msg,setMsg]=useState("")
  const router=useRouter()

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (!value) {
      console.log("Enter Value");
      return;
    }
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userInput),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res=await response.json() as AuthResponseConfig

    if(res){
        setMsg(res.message)
        if(res.status==200 && res.userCredentials){
            setUserCred(res.userCredentials)
            router.push('/book_tickets')
        }
    }

  };

  return (
    <div className="main_container">
      <div className={styles.container}>
        <h1>Signup </h1>
        <span>{msg}</span>
        <form onSubmit={handleSubmit}>
          <label>Your email</label>
          <TextField
            className={styles.input}
            required
            fullWidth
            name="email"
            multiline={false}
            onChange={handleInput}
          />
          <label>Your password</label>
          <TextField
            className={styles.input}
            required
            fullWidth
            name="password"
            multiline={false}
            onChange={handleInput}
          />
          <Button
            className={styles.button}
            type="submit"
            fullWidth
            variant="outlined"
          >
            {" "}
            Signup
          </Button>
        </form>
      </div>
    </div>
  );
}
