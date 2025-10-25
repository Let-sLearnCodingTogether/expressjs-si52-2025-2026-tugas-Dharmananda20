import passport from "passport";
import {ExtractJwt, Strategy} from "passport-jwt"
import UserModel from "../model/User.js";

const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : "JWT_SECRET_KEY",
};

passport.use(
    new Strategy(opts, async(payload, done)=>{
        try{
            // melakukan query kedalam model user berdasarkan email
            const user = await UserModel.findOne({
                email:payload.email
            })

            // jika usert tidak ditemukan
            if(!user){
                return done(null, false)
            }

            // jika user ditemukan masukkan payload berikut ini: 
            return done (null, {
                id : user._id,
                email : user.email,
                username : user.username
            })

        } catch(error){
            return done (null, false)
        }
    })
)