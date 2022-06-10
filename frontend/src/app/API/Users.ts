import axios from "axios";
import { environment } from 'src/environments/environment';
import { ResponseAPI } from "./Interface";

export const InitUser = (): Promise<ResponseAPI> => {
    return axios.get(environment.api + '/', {
        withCredentials: true
    }).then(d => {
        return (d.data);
    });
};

export const GetMe = (): Promise<any> => {
    return axios.get(environment.api + '/api/users/me', {
        withCredentials: true
    }).then(d => {
        return (d.data);
    });
};