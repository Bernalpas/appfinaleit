//https://www.npmjs.com/package/joi
//https://joi.dev/

import Joi from 'joi'

class ProductoValidation {
    static validar(producto) {
        const productoSchema = Joi.object({
            nombre : Joi.string().min(3).max(20).required(),
            precio: Joi.number().required(),
            stock: Joi.number().required(),
            marca:  Joi.string().required(),
            categoria: Joi.string().required(),
            detalles: Joi.string().required(),
            foto: Joi.string().empty(''),
            envio: Joi.boolean().required()
        })

        //const error = productoSchema.validate(producto).error //sin destructuring object
        const { error } = productoSchema.validate(producto) //con destructuring object

        return error
    }
}

/*
let error = ProductoValidation.validar({
    nombre: "Avión",
    precio: 123,
    stock: 55,
    marca: "Avión",
    categoria: "Entretenimiento",
    detalles: "Papel",
    //foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/plane-paper-toy-science-school-128.png",
    foto: "",
    envio: false
})

console.log('-------------------------------------------------------')
console.log('ProductoValidation.validar', error?.details[0].message)
console.log('-------------------------------------------------------')
*/

export default ProductoValidation