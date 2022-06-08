import axios from "axios";
import { environment } from 'src/environments/environment';
import { ResponseAPI } from "./Interface";

export const CreateRoom = (password: string): Promise<ResponseAPI> => {
    return axios.post(environment.api + '/api/rooms', {password}, {
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

export const IsInRoom = (uuid: string): Promise<Boolean> => {
    return axios.get(environment.api + '/api/rooms/' + uuid, {
        withCredentials: true
    }).then(d => { return (true); })
    .catch(e => { return (false); });
};