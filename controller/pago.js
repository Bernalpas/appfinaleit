// SDK de Mercado Pago
import mercadopago from "mercadopago"
import config from '../config.js'


if(config.MERCADO_PAGO) {
    // Agrega credenciales
    mercadopago.configure({
        access_token: "ACÁ VA LA CLAVE PRIVADA DE MERCADO PAGO",
    });

    console.log(`
    *********************************************
    Configuración del SDK de Mercado Pago OK!
    *********************************************  
    `)
}

const feedBack = (req, res) => {
	let info = {
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	}

    console.log(info)

    res.redirect('/')
}

export default {
    feedBack
}