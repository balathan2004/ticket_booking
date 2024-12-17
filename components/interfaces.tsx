export interface ResponseConfig {
  status: 200 | 300;
  message: string;
}

export interface AuthResponseConfig extends ResponseConfig {
  userCredentials: UserDataInterface | null;
}

export interface BookingResponseConfig extends ResponseConfig {
  bookings: BookingInterface[];
}

export interface BookingInterface{
    userId: string;
    productCost: string;
    productId: string;
    createdAt: number;
  
}

export interface UserDataInterface {
  userId: string;
  email: string;
}

export interface TicketInterface {
  ticketId: string;
  ticketName: string;
  ticketPrice: number;
  ticketDesc: string;
}
