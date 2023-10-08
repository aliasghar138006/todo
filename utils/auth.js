import { compare, hash } from "bcryptjs";
async function HashedPassword(password){
    const hashedPassword = await hash(password , 12);
    return hashedPassword;
}

async function VerifyPassword(password , hashedPassword){
    const verifyPass = await compare(password , hashedPassword);
    return verifyPass;
}


export {HashedPassword , VerifyPassword};