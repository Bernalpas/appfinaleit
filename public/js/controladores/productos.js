class ProductosController {
    actualizar = false
    idActActualizar = null
    idAntActualizar = null

    async obtenerProductos() {
        let productos = await productosService.obtenerProductos()
        return productos
    }

    async guardarProducto(producto) {

        if(!this.actualizar) {
            //persisto en el backend
            let productoGuardado = await productosService.guardarProducto(producto)

            //actualizo modelo local
            productosModel.guardar(productoGuardado)

            //recargo la vista
            renderProds(productosModel.obtener())
            
            return productoGuardado
        }
        else {
            //actualizo el backend
            let id = this.idActActualizar
            if(id) {
                //console.log(id, producto)

                let productoActualizado = await productosService.actualizarProducto(id, producto)
                //console.log(productoActualizado)

                //actualizar producto en modelo local
                productosModel.actualizar(id, productoActualizado)

                //recargo la vista
                renderProds(productosModel.obtener())

                this.actualizar = false
                document.querySelectorAll('.btn-actualizar').forEach( boton => boton.textContent = 'Actualizar')

                return productoActualizado
            }
        }
    }

    async actualizarProducto(id) {
        //console.log('actualizarProducto', id)
        this.idActActualizar = id

        if(id != this.idAntActualizar) {
            this.idAntActualizar = id
            this.actualizar = true
        }
        else {
            this.actualizar = !this.actualizar
        }
        
        document.querySelectorAll('.btn-actualizar').forEach( boton => boton.textContent = 'Actualizar')
        document.getElementById(`btn-actualizar-${id}`).textContent = this.actualizar? 'Cancelar' : 'Actualizar'

        if(this.actualizar) {
            let producto = productosModel.obtener(id)
            //console.log(producto)
            setFormulario(producto)
            previewFileURL(producto.foto)
            setCamposValidos()
        }
        else {
            limpiarFormulario()
        }
    }


    async borrarProducto(id) {
        //console.log('borrarProducto', id)

        //borro en el backend
        let productoBorrado = await productosService.borrarProducto(id)

        //borro producto en modelo local
        productosModel.borrar(id)

        //recargo la vista
        renderProds(productosModel.obtener())

        return productoBorrado
    }
}

const productosController = new ProductosController()