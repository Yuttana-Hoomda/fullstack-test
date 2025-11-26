import React from 'react'
import TablePaginate from '../components/Table'

const Transaction = () => {
  return (
    <div className='flex flex-col gap-4 justify-center max-md:h-full'>
      <h2 className='text-2xl max-md:text-center'>ประวัติรายการฝากถอน</h2>
      <div><TablePaginate/></div>
    </div>
  )
}

export default Transaction