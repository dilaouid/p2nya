import { v4 as uuidv4 } from 'uuid';
import db from "../../Sequelize/models"
import { UserAttributes } from '../../Sequelize/models/user';

const prefix: Array<string> = [
    'Super',
    'Long',
    'Happy',
    'Sad',
    'Extended',
    'Supreme',
    'Lovely',
    'Enjoyer',
    'Rich',
    'Poor',
    'Explosive'
];

const suffix: Array<string> = [
    'Fruit',
    'Apple',
    'Banana',
    'Cucumber',
    'Fire',
    'Water',
    'Leaf',
    'Wind',
    'Biscuit',
    'Chocolate',
    'Flavor',
    'Mountain',
    'Sky',
    'Tree',
    'Cave',
    'Juice',
    'Demon',
    'Angel',
    'Fighter'
];

export const createUser = (ip: string): Promise<UserAttributes> => {
    const pickedSuffix: string = suffix[Math.floor(Math.random() * suffix.length)];
    const pickedPrefix: string = prefix[Math.floor(Math.random() * prefix.length)];
    const randomNumber: number = Math.floor(Math.random() * (100 - 12 + 1)) + 12;
    return db.User.create({
        uuid: uuidv4(),
        username: pickedPrefix + pickedSuffix + randomNumber,
        ip: ip,
        inRoom: false,
        lastActive: new Date()
    });
};