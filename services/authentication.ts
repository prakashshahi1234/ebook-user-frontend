import {Axios} from '@/utils/axios'
export const logout =  async() => {
    await Axios.get("/logout")
    localStorage.removeItem("user")
    window.location.href = "/login"
  }

  

