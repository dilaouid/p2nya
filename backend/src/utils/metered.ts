import axios from "axios";
import { AxiosResponse, AxiosError } from "axios";

export const GenerateToken = async (): Promise<string|boolean> => {
    try {
        return await axios({
            method: 'post',
            url: process.env.METERED_DOMAIN + '/token',
            data: {
                globalToken: true
            },
            params: {
                secretKey: process.env.METERED_SECRET
            }
        }).then( (d: AxiosResponse) => {
            return (d.data.token);
        }).catch( (e: AxiosError) => {
            return (false);
        });
    } catch(e) {
        console.log(e);
        return (false);
    }
};

export const ValidateToken = async(token: string) : Promise<string|boolean> => {
    try {
        return await axios({
            method: 'post',
            url: process.env.METERED_DOMAIN + '/token/validate',
            data: {
                token: token
            }
        }).then( (d:AxiosResponse) => {
            return (d.data.name);
        }).catch( (e:AxiosError) => {
            return (false);
        })
    } catch(e) {
        console.log(e);
        return (false);
    }
};