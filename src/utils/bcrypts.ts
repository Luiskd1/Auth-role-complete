import * as bcrypt from 'bcrypt';

export function encodePassword(password: string){
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, SALT);
}


export function comparePasswords(password: string, hashedPassword: string){
    return bcrypt.compareSync(password, hashedPassword);
}