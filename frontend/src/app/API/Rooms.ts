import axios, { Axios } from "axios";
import { environment } from 'src/environments/environment';

export const CreateRoom = (uuid: string): Promise<Axios> => {
    return axios.post(environment.api + '/api/rooms', {uuid}, {
        withCredentials: true
    });
};

export const JoinRoom = (uuid: string, password: string): Promise<Axios> => {
    return axios.put(environment.api + '/api/rooms', {uuid, password}, {
        withCredentials: true
    });
};