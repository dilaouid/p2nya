import { UserInformation } from "./User";

export interface MessageStack {
    date: string;
    content: string;
    picture: boolean;
};
  
export interface MessagesHistory {
    author: UserInformation;
    stack: MessageStack[];
};