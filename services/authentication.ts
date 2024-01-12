import { RegisterData } from "@/types/authentication";
import { Axios } from "@/utils/axios";
export async function registerWithEmail(name:string ,email:string , password:string){
    // console.log("called on server")
    try {
        let {data} = await Axios.post('/register',{name ,email , password});
 
        return data;

    } catch (error) {
    
        return error;
    }

}