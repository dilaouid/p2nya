import db from "../Sequelize/models";

export const getUserByUUID = async (uuid: string, attr: string[]): Promise<any> => {
    return db.User.findOne({
        where: {
            uuid: uuid
        },
        attributes: attr
    }).then(d => {
        return (d);
    }).catch(e => {
        console.log(e);
        return (null);
    });
};