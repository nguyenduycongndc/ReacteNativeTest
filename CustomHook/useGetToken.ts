import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";


export const useGetToken = () =>{
    const [Token, setToken] = useState("");
    const handleSetToken = async () => {
    try {
        const token = await AsyncStorage.getItem('Token') || '';
        setToken(JSON.parse(token as string));
    } catch (error) {
        console.log({ error });
    }
}
useEffect(() => {
    handleSetToken();
}, []);
    return Token;
}