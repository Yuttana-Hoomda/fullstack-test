import React from 'react'
import type { AmountInputProps } from '../types/type'

const AmountInput: React.FC<AmountInputProps> = ({
    value,
    err,
    onChange
}) => {
    return (
        <div className='space-y-2'> 
            <h2 className='text-lg'>จำนวนเงิน *</h2>
            <input
                placeholder='กรอกจำนวนเงิน'
                type='number'
                className='formInput'
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