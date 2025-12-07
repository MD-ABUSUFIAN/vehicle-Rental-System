import { Secret } from './../../../node_modules/@types/jsonwebtoken/index.d';
import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { config } from '../../config';


const authSignupService=async(payload:Record<string,unknown>)=>{
    const{name,email,password,phone,role}=payload;
    const hashPassword = bcrypt.hashSync(password as string, 10);
    const result=await pool.query(`INSERT INTO users (name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING*`,[name,email,hashPassword,phone,role])
    return result
}
const authSignInService=async(payload:Record<string,unknown>)=>{
    const{email,password}=payload;
    const searchUser=await pool.query(`SELECT * FROM users WHERE email=$1`,[email])
    if(searchUser.rows.length===0){
        return false
    }
    const matchPassword=bcrypt.compareSync(password as string,searchUser.rows[0].password); 
   if(!matchPassword){
    return false
   }
   const result=searchUser.rows[0]
    const secret=config.secret;
       const user={
      id:result.id,
      name:result.name,
      email:result.email,
      phone:result.phone,
      role:result.role
   }
   const token = jwt.sign(user,secret as string,{
    expiresIn:"7d"
   });

   return {token,user}


}

export const authService={
    authSignupService,
    authSignInService
}