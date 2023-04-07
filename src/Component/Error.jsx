import React from 'react'

function Error({ message }) {
    return (
        <div className='d-flex align-items-center justify-content-center'>
            <p className='text-center alert alert-danger'>
                Sayfa Bulunamadı arakadaşlar malesef: {message}
            </p>


        </div>
    )
}

export default Error
