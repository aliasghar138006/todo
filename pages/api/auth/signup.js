import TodoUser from "../../../model/Users";
import { HashedPassword } from "../../../utils/auth";
import Connect from "../../../utils/connectD";

export default async function handler(req , res){
    if(req.method !== 'POST') return;

    const {email , password} = req.body;

    if(!email || !password){
        return res.status(500).json({status:'failed' , message:'invalid data!'})
    }

    await Connect();

    const user = await TodoUser.findOne({email : email});

    if(user){
        return res.status(500).json({status:'failed' , message:'user already exist!'})
    }

    const hashedPassword = await HashedPassword(password);

    const newUser = await TodoUser.create({email:email , password:hashedPassword});

    res.status(201).json({status:'success' , message:'user created'})
}