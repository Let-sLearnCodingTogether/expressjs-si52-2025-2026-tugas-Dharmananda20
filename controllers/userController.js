import UserModel from "../model/User.js";
import { hash } from "../utils/hashUtil.js";
import { jwtSignUtil } from "../utils/jwtSignUtil.js";
import { compare } from "../utils/hashUtil.js";
export const register = async (req, res) => {
  try {
    const registerdata = req.body
    

    console.log(registerdata.username);

    const hashPassword = hash(registerdata.password)

    await UserModel.create({
      username : registerdata.username,
      email : registerdata.email,
      password : hashPassword
      
    })

    res.status(201).json({
      message: "Berhasil register, silahkan login",
      data: null
    })
  } catch (e) {
    res.status(500).json({
      message: e.message,
      data: null
    })
  }
}

export const UserProfile = async (req, res) => {
  try {
    res.status(200).json({
      message: "Profil pengguna berhasil diambil",
      user: req.user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req,res) => {
  try{
    const loginData = req.body

    //mencari user bedasarkan email
    const user = await UserModel.findOne({
      email : loginData.email

    })

  if (!user) {
   return res.status(404).json({
      message: "User tidak di temukan",
      data:null

    })
  }

// membandingkan password yang ada didalam db dengan request
  if(compare(loginData.password, user.password)){
    return res.status(200).json({
      message : "Login Berhasil",
      data : {
        username : user.username,
        email : user.email,
        token : jwtSignUtil(user)
      }
    })

  }

  // membandingkan password yang ada didalam db dengan request

    return res.status(200).json({
      message : "Login Gagal",
      data : null
        
    })

  } catch (error) {
    res.status(500).json({
      message : error,
      data : null
    }
)
  }
}