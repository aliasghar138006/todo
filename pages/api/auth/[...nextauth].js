import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import TodoUser from "../../../model/Users";
import { VerifyPassword } from "../../../utils/auth";
import Connect from "../../../utils/connectD";


const authOptions = {
    session : {strategy : 'jwt'},
    providers : [
        CredentialsProvider(
            {
                async authorize(credentials , req){
                    const {email , password} = credentials;
                    if(!email , !password){
                        throw Error("invalid data!")
                    };

                    await Connect();

                    const user = await TodoUser.findOne({email : email});
                    if(!user) {
                        throw Error("user not found!")
                    }

                    const verifyPassword = await VerifyPassword(password , user.password);
                    if(!verifyPassword){
                        throw Error("password not correct!")
                    }

                    return {email};
                }
            }
        )
    ]
}

export default NextAuth(authOptions);