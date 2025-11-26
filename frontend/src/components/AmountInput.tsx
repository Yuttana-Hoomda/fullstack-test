import React from 'react'
import type { AmountInputProps } from '../types/type'

const AmountInput: React.FC<AmountInputProps> = ({
    value,
    err,
    onChange
}) => {
    return (
        <div> <h2>จำนวนเงิน *</h2>
            <input
                placeholder='กรอกจำนวนเงิน'
                type='number'
                className='border p-2 border-gray-500 rounded-lg w-full appearance-none'
                value={ value ?? ''}
                onChange={(e) => 
                    onChange(e.target.value == '' ? undefined : Number(e.target.value))
                }
                required
            />
            {err && <p className='text-red-500'>{err}</p>}
        </div>
    )
}

export default AmountInput