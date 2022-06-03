import axios from "axios";
import { environment } from 'src/environments/environment';
import { ResponseAPI } from "./Interface";

export const CreateRoom = (uuid: string): Promise<ResponseAPI> => {
    return axios.post(environment.api + '/api/rooms', {uuid}, {
        withCredentials: true
    }).then(d => {
        return (d.data);
    });
};

export const CountRooms = (): Promise<ResponseAPI> => {
    return axios.get(environment.api + '/api/rooms/count', {
        withCredentials: true
    }).then(d => {
        return (d.data);
    });
};

export const JoinRoom = (uuid: string, password: string): Promise<ResponseAPI> => {
    return axios.put(environment.api + '/api/rooms', {uuid, password}, {
        withCredentials: true
    }).then(d => {
        return (d.data);
    });
};