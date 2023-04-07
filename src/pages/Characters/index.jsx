import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCharacters } from '../../redux/charactersSlice'
import './style.css'
import Loading from '../../Component/Loading'
import Error from '../../Component/Error'
import { Link } from 'react-router-dom'
import { AiOutlineArrowUp } from 'react-icons/ai'

function Characters() {
    const characters = useSelector(state => state.characters.items)
    const status = useSelector(state => state.characters.status)
    const nextPage = useSelector(state => state.characters.page)
    const hasNextPage = useSelector(state => state.characters.hasNextPage)
    const error = useSelector(state => state.characters.error)

console.log(characters)
    const dispatch = useDispatch()

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCharacters())
        }

    }, [dispatch, status])

    if (status === "failed") {
        return <div><Error message={error} /></div>
    }

    const bactoTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }


    return (
        <div className='container '>
            <h1 className='text-center mt-5 mb-3 fw-bold text-uppercase text-primary'>Characters</h1>

            <div className='row row-cols-1 row-cols-md-3 g-0 d-flex align-align-items-center justify-content-center '
            >
                {
                    characters.map((character) => (
                        <div className='card  m-2 character    bg-white ' style={{ width: "12rem" }} key={character.id}>
                            <Link className="text-decoration-none " to={`/character/${character.id}`}>
                                <img className="card-img-top " src={character.image} alt={character.name} />
                                <div className='card-body'>
                                    <p className='card-title text-center'>
                                        {character.name}
                                    </p>
                                </div>

                            </Link>
                        </div>
                    ))
                }

            </div>
            <  >
                {status === "loading" && <Loading />}
                {hasNextPage && status !== "loading" && (

                    < div className=' text-center'>

                        <button className='btn btn-primary mt-2 mb-4' onClick={() =>
                            dispatch(fetchCharacters(nextPage))}>Load New Characters
                        </button>

                        {characters.length > 20 && (
                            <button className='btn btn-outline-secondary  ' style={{
                                bottom:
                                    "20px", right: "40px", position: "fixed"
                            }} onClick={bactoTop}> <AiOutlineArrowUp className='me-1' size={18} /> Back to Top</button>


                        )}

                    </div>


                )}


                {
                    !hasNextPage && (
                        <>

                            <div className='d-flex align-items-center justify-content-center'>
                                <p className='alert alert-danger text-center w-75'>There is not thing anything shown bro</p>
                            </div>

                            <button className='btn btn-outline-secondary mb-4  fixed-bottom ms-4 ' style={{ width: "10%" }} onClick={bactoTop}>  
                              <AiOutlineArrowUp className='me-1' size={18} />Back to Top</button>

                        </>
                    )

                }
            </>

        </div>
    )
}

export default Characters
