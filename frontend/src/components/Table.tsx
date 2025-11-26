import Paper from '@mui/material/Paper';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useBankStore } from '../stores/bankStore';
import { nfObject, type Transaction } from '../types/type';
import { useState } from 'react';
import Modal from './Modal';
import AmountInput from './AmountInput';

const TablePaginate = () => {
    const { transaction, editTransaction, removeTransaction } = useBankStore()
    const [open, setOpen] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [editAmount, setEditAmount] = useState<number | undefined>(undefined);
    const [err, setErr] = useState('')
    const [page, setPage] = useState(0);

    const isTranssectionDep = selectedTransaction?.status === 'dep';
    const rowsPerPage = 3;

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const visibleRows = transaction.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleAction = (t: Transaction) => {
        setSelectedTransaction(t)
        setEditAmount(t.amount)
        setOpen(true)
    }
    const handleSubmit = () => {
        if (!selectedTransaction) return
        if (isTranssectionDep) {
            if (editAmount === undefined) {
                setErr("กรุณากรอกจำนวนเงิน")
                return
            } else if (editAmount <= 0 || editAmount > 100000) {
                setErr("กรุณากรอกจำนวนเงิน 1 - 100000 บาท")
                return
            }
            editTransaction(selectedTransaction.id, editAmount)
        } else {
            removeTransaction(selectedTransaction.id ?? 0)
        }
        setOpen(false)
        setSelectedTransaction(null)
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: { xs: 150, md: 450 } }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Datetime</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center" sx={{ display: { xs: 'none', md: 'table-cell' } }}>Email</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map((t) => (
                            <TableRow
                                key={t.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {t.date}
                                </TableCell>
                                <TableCell align="center">{nfObject.format(t.amount ?? 0)}</TableCell>
                                <TableCell align="center" sx={{ color: `${t.status == 'dep' ? 'green' : 'red'}` }}>
                                    {t.status == 'dep' ? 'ฝาก' : 'ถอน'}
                                </TableCell>
                                <TableCell align="center" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                                    {t.email}
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant='contained'
                                        size='small'
                                        sx={{ bgcolor: 'black', fontSize: 12 }}
                                        onClick={() => handleAction(t)}
                                    >
                                        {t.status == 'dep' ? 'Edit' : 'Delete'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <TablePagination
                    component="div"
                    count={transaction.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[]}
                />
            </TableContainer>

            {open && selectedTransaction && (
                <Modal
                    isOpen={open}
                    title={isTranssectionDep ? 'แก้ไขจำนวนเงินฝาก' : 'ยืนยันการลบ'}
                    content={
                        <div>
                            {!isTranssectionDep && (
                                <p>จำนวนเงินถอน {nfObject.format(selectedTransaction.amount ?? 0)}</p>
                            )}

                            <p>ของวันที่ {selectedTransaction.date}</p>
                            <p>จากอีเมล {selectedTransaction.email}</p>

                            {isTranssectionDep && (
                                <AmountInput value={editAmount} onChange={setEditAmount} err={err}/>
                            )}
                        </div>
                    }
                    handleSubmit={() => handleSubmit()}
                    handleClose={() => {
                        setOpen(false)
                        setSelectedTransaction(null)
                    }}
                />
            )}
        </>
    );
}

export default TablePaginate