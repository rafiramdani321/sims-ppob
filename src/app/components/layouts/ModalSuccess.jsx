import React from 'react'

const ModalSuccess = ({ msg, nominal, name }) => {
  return (
    <>
      <div className='fixed flex z-[9999] top-50 w-full justify-center'>
        <div className='relative bg-white w-full max-w-md max-h-full rounded-lg shadow-lg border border-zinc-400'>
          <div className='text-center p-3'>
            <svg fill="#06b6d4" className='mx-auto mb-4 mt-6 w-14 h-14' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52">
              <g>
                <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26
		S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z" strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
                <path d="M38.252,15.336l-15.369,17.29l-9.259-7.407c-0.43-0.345-1.061-0.274-1.405,0.156c-0.345,0.432-0.275,1.061,0.156,1.406
		l10,8C22.559,34.928,22.78,35,23,35c0.276,0,0.551-0.114,0.748-0.336l16-18c0.367-0.412,0.33-1.045-0.083-1.411
		C39.251,14.885,38.62,14.922,38.252,15.336z"  strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
              </g>
            </svg>
            <h3 className='text-xl text-textPrimary font-medium mb-4'>Pembayaran {name}</h3>
            <h3 className='text-2xl text-textPrimary font-bold mb-3'>{nominal}</h3>
            <h3 className='text-xl text-textPrimary font-medium mb-5'>{msg}</h3>

          </div>
        </div>
      </div>
      <div className="opacity-30 fixed inset-0 z-[60] bg-black"></div>
    </>
  )
}

export default ModalSuccess