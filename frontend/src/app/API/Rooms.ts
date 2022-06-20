import axios from "axios";
import { environment } from 'src/environments/environment';
import { ResponseAPI } from "./Interface";

export const CreateRoom = (password: string): Promise<ResponseAPI> => {
    return axios.post(environment.api + '/rooms', {password}, {
        withCredentials: true
    }).then(d => {
        return (d.data);
    });
};

export const CountRooms = (): Promise<ResponseAPI> => {
    return axios.get(environment.api + '/rooms/count', {
        withCredentials: true
    }).then(d => {
        return (d.data);
    });
};

export const JoinRoom = (uuid: string, password: string): Promise<ResponseAPI> => {
    return axios.put(environment.api + '/rooms', {uuid, password}, {
        withCredentials: true
    }).then(d => {
        return (d.data);
    });
};

export const GetRoomInfo = (uuid: string): Promise<ResponseAPI> => {
    return axios.get(environment.api + '/rooms/' + uuid, {
        withCredentials: true
    }).then(d => {
        return (d.data);
    });
};