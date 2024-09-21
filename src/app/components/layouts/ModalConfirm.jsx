import React from 'react'

const ModalConfirm = ({ onCancel, onConfirm, nominal, name }) => {
  return (
    <>
      <div className='fixed flex z-[9999] top-50 w-full justify-center'>
        <div className='relative bg-white w-full max-w-md max-h-full rounded-lg shadow-lg border border-zinc-400'>
          <div className='text-center p-3'>
            <svg aria-hidden="true" className="mx-auto mb-4 mt-6 text-zinc-400 w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h3 className='text-xl text-textPrimary font-medium mb-2'>{name} senilai</h3>
            <h3 className='text-3xl text-textPrimary font-bold mb-8'>Rp{nominal} ?</h3>
            <div className=''>
              <button onClick={onConfirm} data-modal-hide="popup-modal" type="button" className="text-white bg-bgButton hover:bg-bgHoverButton focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Ya, lanjutkan Bayar
              </button>
              <button onClick={onCancel} data-modal-hide="popup-modal" type="button" className="text-textPrimary hover:text-textSecondary hover:border-1 hover:border-bgButton bg-white rounded-lg border border-borderButton text-sm font-medium px-5 py-2.5 focus:z-10 mb-5">Batalkan</button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-30 fixed inset-0 z-[60] bg-black"></div>
    </>
  )
}

export default ModalConfirm