import React from 'react'

const AlertSuccess = ({ msg }) => {
  return (
    <div id="alert-border-2" className="flex p-4 mb-1 text-green-800 border-t-4 border-green-300 bg-green-50" role="alert">
      <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
      <div className="ml-3 mr-3 text-sm font-medium">
        {msg}
      </div>
    </div>
  )
}

export default AlertSuccess