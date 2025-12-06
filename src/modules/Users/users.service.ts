import { pool } from "../../config/db"

const userGetService=async()=>{
    const result=await pool.query(`SELECT * FROM users`)
    return result
}

const updateUsers=async(payload:Record<string,unknown>,id:string)=>{
     const{name,email,password,phone,role}=payload;
    const result=await pool.query(`UPDATE users SET name=$1,email=$2,password=$3,phone=$4,role=$5  WHERE id=$6 RETURNING *`,[name,email,password,phone,role,id])
    return result

}
const deleteUsers=async(id:string)=>{
    const result=await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`,[id])
    if(result.rowCount===0){
        return null
    }
    else{
        return result
    }
}


export const userService={
    userGetService,
    updateUsers,
    deleteUsers
}