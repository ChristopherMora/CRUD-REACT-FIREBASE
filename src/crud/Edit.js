import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc, deleteDoc, collection, getDocs} from "firebase/firestore"
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { db } from "../configFR"
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
const Edit = () => {
  const [nombre, setnombre] = useState('')


    const navigate = useNavigate()    
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        const product = doc(db, "usuarios", id)
        const data = {nombre: nombre, }
        await updateDoc(product, data)
        navigate('/')
    }

    const getProductById = async (id) => {
        const product = await getDoc( doc(db, "usuarios", id) )
        if(product.exists()) {
            //console.log(product.data())
            setnombre(product.data().nombre)   
            
        }else{
            console.log('El producto no existe')
        }
    }

    useEffect( () => {
        getProductById(id)
        // eslint-disable-next-line
    }, [])

    //1 - configuramos los hooks
  const [products, setProducts] = useState( [] )

  //2 - referenciamos a la DB firestore
  const productsCollection = collection(db, "usuarios")

  //3 - Funcion para mostrar TODOS los docs
  const getProducts = async ()   => {
   const data = await getDocs(productsCollection)
   //console.log(data.docs)
   setProducts(
       data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
   )
   //console.log(products)
  }
  //4 - Funcion para eliminar un doc
  const deleteProduct = async (id) => {
   const productDoc = doc(db, "usuarios", id)
   await deleteDoc(productDoc)
   getProducts()
  }
  //5 - Funcion de confirmacion para Sweet Alert 2
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
  useEffect( () => {
    getProducts()
    // eslint-disable-next-line
  }, [] )


    

    return (

        <div class="container">
  <div class="row">
    <div class="col">
    <h1>Editar Nombre</h1>
                 <form onSubmit={update}>
                    <div className='mb-3'>
                        <label className='form-label'>Nombre</label>
                        <input
                            value={nombre}
                            onChange={ (e) => setnombre(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
                    </div>  
       
                   
            
                    
                    <button type='submit' className='btn btn-primary'>Actualizar</button>
                 </form>   
    </div>
    <div class="col">
     <table className='table table-hover'>
            <thead>
              <tr>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              { products.map( (product) => (
                <tr key={product.id}>
                  <td>{product.nombre}</td>
                  <td>
                 
                    <Link to={`/edit/${product.id}`} className="btn btn-warning">Editar</Link>
                    <button onClick={ () => { confirmDelete(product.id) } } className="btn btn-danger">Eliminar</button>
                  </td>
                </tr>                
              )) }
            </tbody>
          </table>
    </div>
  </div>
  </div>
        
    )
}

export default Edit