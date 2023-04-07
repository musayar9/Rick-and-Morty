import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import Loading from '../../Component/Loading'
import { AiOutlineArrowLeft } from 'react-icons/ai'
function EpisodeDetail() {
    const [episode, setEpisode] = useState([])
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    console.log(id)

    useEffect(() => {
        axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/episode/${id}`)
            .then((res) => res.data)
            .then(data => setEpisode(data))
            .finally(() => setLoading(false))
    }, [id])

    console.log(id)
    console.log(episode)
    if (!episode) {
        return <Navigate to="/episode" />
    }


    return (
        <div className='container mt-5'>
              <h2 className='text-center  text-primary '> Episodes Details</h2>
            {loading && <Loading />}
            {episode && (
                <div>

                    <h5 className='text-header'><span className='fw-bold text-primary'>Episode Name: </span>{episode.name}</h5>
                    <div className='text-body mt-3'>
                        <p><span className='fw-bold text-primary'>Air Date: </span> {episode.air_date}</p>
                        <p><span className='fw-bold text-primary'>Episode: </span> {episode.episode}</p>
                        {
                        episode.characters && (<>
                            
                                    <p><span className='fw-bold text-primary'>Characters Count: </span>{episode.characters.length}</p>
                            <p>

                                <button className="btn btn-primary d-flex align-items-center justify-content-center" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                    Episode Characters
                                </button>
                            </p>
                            <div className="collapse" id="collapseExample">
                                <div className="card card-body">

                                    <ol className='list-type-'>


                                        {episode.characters.map((item, index) => (
                                            <li key={index}>
                                                <a href={item}>{item}</a>
                                            </li>
                                        ))}


                                    </ol>
                                </div>
                            </div>

                        </>)
                    }
                    </div>

                  
                    <Link to="/episode">
                        <button className='btn btn-secondary'><AiOutlineArrowLeft size={18} className='me-2'/> Episode page</button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default EpisodeDetail
