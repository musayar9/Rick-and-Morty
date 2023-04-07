import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Navigate, Link } from 'react-router-dom'
import Loading from '../Component/Loading'
import { AiOutlineArrowLeft } from 'react-icons/ai'
function LocationDetail() {
    const { id } = useParams()
    const status = useSelector((state) => state.locations.status)
    const items = useSelector((state) => state.locations.items)
    const location = items.find((item) => item.id === Number(id))
    if (!location) {
        return <Navigate to={`/location`} />
    }
    return (
        <div className='container mt-5'>
            <h2 className='text-header text-center text-primary'>Location Details</h2>

            {status === "loading" && <Loading />}

            {location && (
                <>
                    <h5 className='text-header mt-5'><span className='fw-bold text-primary'>Location Name: </span> {location.name}</h5>
                    <div className='text-body mt-3'>
                        {location.dimension !== "unknown" ?
                            <p><span className='fw-bold text-primary'>Dimension: </span> {location.dimension} </p>
                            : null}
                        <p><span className='fw-bold text-primary'>Location Type: </span>{location.type}</p>

                        <>
                            {location.residents.length !== 0 && <>

                                <p><span className='fw-bold text-primary'>Residents:</span> {location.residents.length}  </p>

                                <p>
                                    <button className="btn btn-primary d-flex align-items-center justify-content-center" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                     Location Residents
                                    </button>
                                </p>
                               <div className="collapse" id="collapseExample">
                                    <div className="card card-body">
                                        <ol className='list-type-'>
                                            {
                                                location.residents.map((local, index) => (
                                                    <li key={index}>
                                                        <a href={local}>{local}</a>
                                                    </li>
                                                ))
                                            }


                                        </ol>
                                    </div>
                                </div>
                            </>

                            }

                            {location.residents.length === 0 && (
                                <p className='alert alert-danger'>Not found residents İnformation</p>
                            )}
                        </>

                    </div>

                </>

            )}
            <Link to="/location">
                <button className='btn btn-secondary'> <AiOutlineArrowLeft size={18} className='me-2' /> Location Page</button>
            </Link>
        </div>
    )
}

export default LocationDetail
