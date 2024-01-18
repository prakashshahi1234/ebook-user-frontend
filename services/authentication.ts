import {Axios} from '@/utils/axios'
export const logout =  async() => {
    await Axios.get("/logout")
    window.location.href = "/login"
  }

  

