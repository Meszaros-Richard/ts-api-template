require('dotenv').config();

export default {
    port: process.env.PORT || 3000,
    db: {
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    },
    jwtSecret: process.env.JWT_SECRET
}