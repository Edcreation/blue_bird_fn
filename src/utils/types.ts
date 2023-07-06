import { MouseEventHandler, ReactNode } from "react";

export interface CustomButtonType {
    text: string;
    styles?: string;
    action?: MouseEventHandler<HTMLButtonElement>;
}

export interface TextCardType {
    text: string;
    profile: {
        image: string;
        username: string;
    }
    time: string;
    id: string;
    likes: string;
    shares: string;
    comments: string; 
}
export interface ImageCardType {
    image: string;
    profile: {
        image: string;
        username: string;
    }
    time: string;
    id: string;
    likes: string;
    shares: string;
    comments: string; 
}

export interface ProtectComponentProps {
    children: ReactNode;
    replace?: ReactNode;
  }
  