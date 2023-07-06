import axios from "axios";

export const signUp = async (email: string, username: string, password: string) => {
    try {
        const signup = await axios.post(`http://localhost:5000/api/users/signup`, {email, username, password}, );
        return signup.data.data as string;
    } catch (error: any) {
        return error.data.message;
    }
}