import React from 'react'

function ping() {
  return (
    <div className='relative'>
      <div className='absolute -left-4 top-1'>
        <span className='flex size-[11px]'>
            <span className='absolute rounded-full animate-ping inline-flex w-full h-full bg-primary opacity-75'></span>
            <span className='relative rounded-full bg-primary h-full w-full inline-flex size-[11px]'></span>
                </span>
      </div>
    </div>
  )
}

export default ping
