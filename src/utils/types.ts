import { MouseEventHandler, ReactNode } from 'react';

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
    poster: string;
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

export type POST = {
	id: string;
	userId: {
		_id: string;
		username: string;
	};
	profileId: {
		_id: string;
		image: string;
	};
	text: string;
	date: string;
	movieId: string;
};
