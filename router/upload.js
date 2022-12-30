import express  from 'express'
const router = express.Router()

// -------------------------------------------------------
//https://www.npmjs.com/package/multer
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        //cb(null, 'public/uploads')
        cb(null, 'uploads')
    },
    filename: function(req,file,cb) {
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

// -------------------------------------------------------
import ftp from "basic-ftp"
import config from '../config.js'

async function subirArchivoFTP(file) {
    const timeout  =0
    const client = new ftp.Client(timeout)
    client.ftp.verbose = !true

    try {
        await client.access({
            host: "files.000webhost.com",
            user: config.FTP_USER,
            password: config.FTP_PASS,
            secure: true
        })

        console.log('*** FTP conection OK! ***\n')

        //console.log(stats)
        let bytesTotal = file.size
        client.trackProgress(info => process.stdout.write('\r' + parseInt((info.bytesOverall * 100) / bytesTotal) + '%'))

        console.log('*** subiendo archivos por FTP ***')
        const src = file.path
        const dst =  `public_html/uploads-0/${file.filename}`
        await client.uploadFrom(src,dst)
        console.log(' -> upload OK!')

        client.trackProgress()            

        return `https://danielsanchez1968.000webhostapp.com/uploads-0/${file.filename}`
    }
    
    catch(err) {
        console.log(err)
    }
    client.close()
}

/* ------------------------ RUTAS POST -------------------------- */
router.post('/', upload.single('foto'), async (req,res,next) => {
    const file = req.file

    //console.log(file)
    if(!file) {
        const error = new Error('Error subiendo el archivo')
        error.httpStatuscode = 400
        return next(error)
    }

    let ftpfilename = await subirArchivoFTP(file)

    res.json({ nombre: ftpfilename })
})

export default router


