import React, { useState } from 'react'
import { nfObject, type Amount } from '../types/type'
import Modal from '../components/Modal'
import { useBankStore } from '../stores/bankStore'
import { useUser } from '../stores/userStore'
import AmountInput from '../components/AmountInput'

const DepositAndWithdraw = () => {
  const [form, setForm] = useState<Amount>({ "amount": undefined })
  const [open, setOpen] = useState(true)
  const [err, setErr] = useState("")
  const bankStore = useBankStore()
  const userStore = useUser()
  const [modalContent, setModalContent] = useState<{
    title: string;
    onSubmit: () => void;
  } | null>(null)

  const handleSubmit = (type: 'dep' | 'with') => {
    let error = "";
    if (form.amount === undefined) {
      error = "กรุณากรอกจำนวนเงิน"
    } else if (form.amount <= 0 || form.amount >= 100000) {
      error = "กรุณากรอกจำนวนเงิน 1 - 100000"
    }

    setErr(error);
    if (error === "") {
      setModalContent({
        title: type == 'dep' ? 'ฝาก' : 'ถอน',
        onSubmit: type == 'dep'
          ? () => bankStore.deposit(form.amount!, userStore.user?.email) 
          : () => bankStore.withdraw(form.amount!, userStore.user?.email)
      });
      setOpen(true);
    } else {
      setOpen(false);
      setModalContent(null);
    }
  }

  return (
    <div className=' flex flex-col justify-center max-md:h-full space-y-5'>
      <h2 className='text-2xl font-bold'>จำนวนเงินคงเหลือ {nfObject.format(bankStore.balance)} บาท</h2>
      <form className='flex flex-col space-y-5 mt-6 px-8 max-md:space-y-10'>
        <div>
          <AmountInput 
            value={form.amount} 
            onChange={(value) => setForm({ amount: value })}
            err={err}/>
        </div>
        <div className='flex justify-between text-white gap-4'>
          <button
            type='button'
            className='bg-green-500 depositButton'
            onClick={() => handleSubmit('dep')}
          >
            ฝาก
          </button>
          <button
            type='button'
            className='bg-red-500 depositButton'
            onClick={() => handleSubmit('with')}
          >
            ถอน
          </button>
          {modalContent && open && (
            <Modal
              isOpen={open}
              title={`คุณต้องการ${modalContent.title}`}
              content={<p>จำนวนเงิน {nfObject.format(form.amount ?? 0)} บาท</p>}
              handleClose={() => setOpen(false)}
              handleSubmit={() => {
                modalContent.onSubmit();
                setOpen(false);
              }}
            />
          )}
        </div>
      </form>
    </div>
  )
}

export default DepositAndWithdraw