import dotenv from 'dotenv';
import passport from 'passport';
import JwtStrategy from 'passport-jwt';

dotenv.config();

const jwtOptions = {
    jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secret: process.env.JWT_SECRET
}

const verifyUser = (payload, done) => {
    try {

    }catch(err){

    }
}

passport.use(new JwtStrategy(jwtOptions, verifyUser));