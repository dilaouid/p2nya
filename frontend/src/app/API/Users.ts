import axios from "axios";
import { environment } from 'src/environments/environment';
import { ResponseAPI } from "./Interface";

interface EditUserInput {
    username: string;
    picture: string | undefined | null;
}

interface Emoji {
    alias: string;
    base64: string;
}

const url = environment.api + '/users';

export const InitUser = (): Promise<ResponseAPI> => {
    return axios.get(environment.api, {
        withCredentials: true
    }).then(d => {
        return (d.data);
    });
};

export const GetMe = (): Promise<any> => {
    return axios.get(url + '/me', {
        withCredentials: true
    }).then(d => {
        return (d.data);
    });
};

export const EditUser = (input: EditUserInput) => {
    return axios.put(url, input, {
        withCredentials: true
    }).then(d => {
        return (d.data);
    });
};

export const ManageEmojis = (emojis: Emoji[]) => {
    return axios.post(url + '/emoji', emojis, {
        withCredentials: true
    }).then(d => {
        return (d.data);
    });
};