import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLocations } from '../../redux/locationsSlice'
import { Link } from 'react-router-dom'
import {RiUserLocationFill} from 'react-icons/ri'
import Error from '../../Component/Error'
import Loading from '../../Component/Loading'
import { AiOutlineArrowUp } from 'react-icons/ai'

function Location() {

    const locations = useSelector(state => state.locations.items)
    const status = useSelector(state => state.locations.status)
    const nextLocal = useSelector(state => state.locations.page)
    const error = useSelector((state)=>state.locations.error)
    const locationNewPage = useSelector(state=>state.locations.locationNewPage)
    const dispatch = useDispatch()

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchLocations())

        }
    }, [dispatch, status])

    if(status === "failed"){
        return <Error message={error}/>
    }

    const backtoTop = ()=>{
        window.scrollTo({top:0, behavior:"smooth"})
    }
    return (
        <div className='container mt-5'>
            <h2 className='text-center fw-bold mt-5 mb-3 text-primary text-uppercase'>Locations</h2>
            <div className=' row row-cols-1 row-cols-md-3 g-0 mt-4 d-flex align-items-center justify-content-center'>
                {
                    locations.map((local) => (
                        <div className='card text-center m-2 bg-white' style={{width:"15rem"}} key={local.id}>
                            <div className='card-body'>
                            <h6 className='text-header  text-truncate'><RiUserLocationFill className='me-2'/>{local.name} </h6>
                                 <p className='text-body'><span className='fw-bold'> Type:</span> {local.type}</p>
                            </div>
                                

                            <div className='d-flex align-items-center justify-content-center mb-2'>
                            <Link className='text-decoration-none btn btn-primary text-center w-75 flex-shrink-0' style={{fontSize:"14px"}} to={`/location/${local.id}`}>
                             Local Details
                            </Link>
                            </div>
                            
                        </div>
                    ))
                }

            </div>

            <div style={{textAlign:"center"}}>
                {status === "loading" && <Loading/>}
                {locationNewPage && status !== "loading" &&(
                    <>
                      <button className='btn btn-primary mt-4 mb-5' onClick={() => dispatch(fetchLocations(nextLocal))}>New Location Load</button>

                      {
                        locations.length > 20 && (
                            <button className='btn btn-outline-secondary' style={{position:"fixed", bottom:"20px", right:"40px"}}
                            onClick={backtoTop}
                            >
                                <AiOutlineArrowUp className='me-1' size={18}/>
                               Back to Top
                            </button>
                        )
                      }
                    </>
                )}

                {
                    !locationNewPage &&(
                        <>
                         <div className=' d-flex align-items-center justify-content-center '>
                                <p className='alert alert-danger text-center w-75'> Locations Not Found</p>
                        </div>
                        {
                            locations.length > 20 && (
                                <button className='btn btn-outline-secondary' style={{position:"fixed", bottom:"20px", right:"40px"}}
                                onClick={backtoTop}
                                >
                                    <AiOutlineArrowUp className='me-1' size={18}/>
                                   Back to Top
                                </button>
                            )
                        }
                        </>
                    )
                }
            </div>
          
        </div>
    )
}

export default Location
