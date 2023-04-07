import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllEpisode } from '../../redux/episodeSlice'
import Error from '../../Component/Error'
import Loading from '../../Component/Loading'
import { AiOutlineArrowUp } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function Episode() {
    const data = useSelector((state) => state.episode.items)
    const status = useSelector(state => state.episode.status)
    const error = useSelector((state) => state.episode.error)
    const downloadPage = useSelector((state) => state.episode.page)
    const hasDownloadPage = useSelector(state => state.episode.newPage)

 
    const dispatch = useDispatch()

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchAllEpisode())
        }

    }, [dispatch, status])


    if (status === "failed") {
        return <Error message={error} />
    }

    const bactoTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <div className="container mt-5">
            <h2 className='text-center fw-bold text-primary mb-3 text-uppercase'>Episodes</h2>

            <div className='row  row-cols-1 row-cols-md-3 g-0 d-flex align-align-items-center justify-content-center'>
                {data.map((item) => (
                    <div className='card m-2 bg-teal' style={{ width: "15rem" }} key={item.id}>
                        <div className='card-body'>
                            <h5 className='text-header'>{item.air_date}</h5>
                            <ul>
                                <li>{item.name}</li>
                                <li>{item.episode}</li>
                            </ul>

                        </div>
                        <div className='d-flex align-items-center justify-content-center mb-2'>
                            <Link className="btn btn-outline-primary text-decoration-none text-center flex-shrink-0 w-75  " style={{ fontSize: "14px" }} to={`/episode/${item.id}`}>Episode Details</Link>
                        </div>

                    </div>

                ))}

            </div>
            <div>
                {status === "loading" && <Loading />}
                {hasDownloadPage && status !== "loading" && (
                    <div className='text-center'>


                        <button className='btn btn-primary mb-4' onClick={() =>
                            dispatch(fetchAllEpisode(downloadPage))}>Load Episodes</button>

                        {data.length > 20 && (


                            <button className='btn btn-outline-secondary'
                                style={{
                                    position: "fixed", bottom:
                                        "20px", right: "40px"
                                }}
                                onClick={bactoTop}> <AiOutlineArrowUp className='me-1' size={18} />Back to Top </button>
                        )
                        }

                    </div>
                )}
                {
                    !hasDownloadPage && (
                        <>
                            <div className=' d-flex align-items-center justify-content-center '>
                                <p className='alert alert-danger text-center w-75'> Episode Not Found</p>
                            </div>

                            <button className='btn btn-outline-secondary' style={{ position: "fixed", bottom: "20px", right: "40px" }} onClick={bactoTop}>
                                <AiOutlineArrowUp className='me-1' size={18} />   Back to Top</button>


                        </>

                    )
                }
            </div>

        </div>
    )
}

export default Episode
