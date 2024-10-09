import React from 'react'

function Footer() {
    const date=new Date()
    const ss=date.getFullYear()
  return (
    <div className='bg-zinc-800 text-white px-8 py-4'> 
      <h1 className='text-xl font-semibold text-center'>
        &copy; {ss} Book Glaxciy. All rights reserved
      </h1>
    </div>
  )
}

export default Footer
