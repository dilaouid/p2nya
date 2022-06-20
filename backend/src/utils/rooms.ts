import { getUserUUID } from '../API/mw'

export const parseCookies = (cookies: string): string => {
    var list: string[] = cookies.split(';') || [];
    var token: string;
    for (let i = 0; i < list?.length; i++) {
        const el = list[i].split('=');
        for (let i = 0; i < el.length; i++) {
            if (el[i].trim() == 'token')
                token = el[i + 1];
        }
    }
    return (token);
};

export const getUserUUIDByHandshake = async (handshake: string): Promise<string> => {
    let token = parseCookies(handshake) || '';
    return token ? await getUserUUID(token) : '';
};