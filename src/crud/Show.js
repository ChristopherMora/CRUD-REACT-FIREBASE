import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc, doc, addDoc } from 'firebase/firestore'
import { db } from '../configFR'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
const MySwal = withReactContent(Swal)

const Show = () => {

  const [nombre, setnombre] = useState('')

  const productsCollection = collection(db, "usuarios")

  const store = async (e) => {

    e.preventDefault()

    await addDoc(productsCollection, { nombre: nombre })
    window.location.href = window.location.href;

    window.location.replace('');
  }


  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const data = await getDocs(productsCollection)
    setProducts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

    )
  }
  //4 - Funcion para eliminar un doc
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "usuarios", id)
    await deleteDoc(productDoc)
    getProducts()
  }
  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Elimina el producto?',
      text: "Eliminar registro?",
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'si borrar'
    }).then((result) => {
      if (result.isConfirmed) { 
        //llamamos a la fcion para eliminar   
        deleteProduct(id)               
        Swal.fire(
          'Borrado',
        )
      }
    })    
  }
  //6 - usamos useEffect
  useEffect(() => {
    getProducts()
    // eslint-disable-next-line
  }, [])
  //7 - devolvemos vista de nuestro componente
  return (
    <div class="container">
      <div class="row">

        <div class="col">
          <h1>INGRESA TU NOMBRE</h1>

          <form onSubmit={store}>
            <div className='mb-3'>
              <label className='form-label'>Nombre</label>
              <input
                value={nombre}
                onChange={(e) => setnombre(e.target.value)}
                type="text"
                className='form-control'
                required
              />
            </div>
            <button type='submit' className='btn btn-primary'>Enviar</button>
          </form>
        </div>
        <div class="col">
          <br/><br/>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.nombre}</td>
                  <td>
                    <Link to={`/edit/${product.id}`} className="btn btn-warning">Editar</Link>
                    <button onClick={() => { confirmDelete(product.id) }} className="btn btn-danger">Borrar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Show