import dotenv from 'dotenv'

//dotenv.config() // lee desde el archivo default .env
dotenv.config({
    //path : 'miconfig.env'
    path : process.env.NODE_ENV? (process.env.NODE_ENV + '.env') : '.env'
    //path : process.env.NODE_ENV + '.env'
}) // lee desde otro archivo

export default {
    PORT: process.env.PORT || 8080,
    TIPO_DE_PERSISTENCIA: process.env.TIPO_P || 'MONGODB', // 'MEM', 'FILE', 'MONGODB'
    STR_CNX: process.env.STR_CNX || 'mongodb://localhost',
    MERCADO_PAGO: false,
    FTP_USER: process.env.FTP_USER,
    FTP_PASS: process.env.FTP_PASS,
}

