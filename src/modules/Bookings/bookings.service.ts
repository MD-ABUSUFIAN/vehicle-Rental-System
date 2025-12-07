import { pool } from "../../config/db";

const createBooking=async(payload:Record<string,unknown>)=>{
    const{customer_id,vehicle_id,rent_start_date,rent_end_date}=payload;
    const searchVehicle=await pool.query(`SELECT* FROM vehicles WHERE id=$1`,[vehicle_id])
    if(searchVehicle.rows.length===0){
        return "Vehicle Not Found"
    }
    const vehicleResult=searchVehicle.rows[0]
    const startDate=new Date(rent_start_date as any);
    const endDate=new Date(rent_end_date as any)
    const totalDay=(endDate.getTime()-startDate.getTime())/(1000*60*60*24)
    const totalPrice=vehicleResult.daily_rent_price *totalDay;

    const result=await pool.query(`INSERT INTO booking(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING*`,[customer_id,vehicle_id,rent_start_date,rent_end_date,totalPrice,"active"])
    console.log(result.rows[0])

    return {
         ...result.rows[0],
          vehicle:{
            vehicle_name:vehicleResult.vehicle_name,
            daily_rent_price:vehicleResult.daily_rent_price
        }
    }


}
// get all booking 
const getAllBooking=async()=>{
    const result=await pool.query(`SELECT 
        b.id,
        b.rent_start_date,
        b.rent_end_date,
        b.total_price,
        b.status,
        u.id AS customer_id,
        u.name AS name,
        u.email AS email,
        u.phone AS phone,
        v.id AS vehicle_id, 
        v.vehicle_name,
        v.registration_number,
        v.type 
        FROM booking b 
        JOIN users u ON u.id=b.customer_id 
        JOIN vehicles v ON v.id=b.vehicle_id`)

   return result
   
    
    
}

// update bookings 
const updateBooking=async(payload:Record<string,unknown>,id:string)=>{
     const{status}=payload;
     if(status=="cancelled"){
        const result=await pool.query(`UPDATE booking SET status=$1  WHERE id=$2 RETURNING *`,[status,id])
         return result
     }
     else if (status=="returned"){
      const result=await pool.query(`UPDATE booking SET status=$1  WHERE id=$2 RETURNING *`,[status,id])
         return result
     }
   
   

}


export const bookingservice={
    createBooking,
    getAllBooking,
    updateBooking
}