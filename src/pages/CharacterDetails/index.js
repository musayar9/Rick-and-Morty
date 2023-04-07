/* eslint-disable jsx-a11y/anchor-has-content */
import axios from 'axios';
import { useEffect, useState } from 'react'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../../Component/Loading';
import { AiOutlineArrowLeft } from 'react-icons/ai'
function Detail() {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/character/${id}`)
      .then((res) => res.data,)
      .then(data => setChar(data))
      .finally(() => setLoading(false))
  }, [id])

  return (

    <div className='container mt-5'>
      {loading && <Loading />}
      <h2 className='text-header text-center text-primary'>Character Details</h2>
      <div className=' d-flex align-items-center justify-content-center'>

        {
          char && (

            <div className="card mb-3 m-4  " style={{ width: "54rem" }}>
              <div className="row  no-gutters">
                <div className=" col-md-4">
                  <img src={char.image} alt={char.name} className='card-img-top' />
                </div>
                <div className="col-md-8 ">
                  <div className="card-body">
                    <h4 className='text-header  text-primary'>{char.name}</h4>
                    <ul className='list-unstyled'>
                      <li className="card-text "><span className='fw-bold text-primary'>Gender: </span>{char.gender}</li>
                      <li className="card-text "><span className='fw-bold text-primary'>Status: </span>{char.status}</li>
                      <li className="card-text "><span className='fw-bold text-primary'>Species: </span>{char.species}</li>

                      {char.origin.name !== "unknown" ? <li className="card-text "><span className='fw-bold text-primary'>Origin Name: </span>{char.origin.name}</li> : null}

                      {char.type !== "" ?
                        <li className='card-text '><span className='fw-bold text-primary'>Type </span>: {char.type}</li>
                        : null}

                      <li className='card-text'><span className='fw-bold text-primary'>Location Name: </span> {char.location.name}</li>
                      <li className='card-text '><span className='fw-bold text-primary'>Number of episodes played: </span> {char.episode.length}</li>
                    </ul>

                  </div>
                </div>
              </div>
            </div>
          )
        }

      </div>
      <div className='d-flex align-items-center justify-content-center'>
        <button className='btn btn-secondary ms-4 mt-2'>
          <AiOutlineArrowLeft className='me-2' size={18} />
          <Link to="/" className='text-white text-decoration-none'>Character Page</Link>
        </button>
      </div>

    </div>
  )
}

export default Detail
