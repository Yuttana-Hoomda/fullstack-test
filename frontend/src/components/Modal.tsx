import React from 'react'
import type { ModalProps } from '../types/type'
import { Box, Typography, Modal as MUIModal, Button } from '@mui/material'

const Modal: React.FC<ModalProps> = ({
    isOpen,
    title,
    content,
    handleSubmit,
    handleClose
}) => {
    return (
        <MUIModal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: "absolute" as const,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 24,
                    py: 3,
                    px: 2
                }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight : 'bold'}}>
                    {title}
                </Typography>
                <Box id="modal-modal-description" sx={{ mt: 1 }}>
                    {content}
                </Box>
                <Box mt={3} display="flex" justifyContent="flex-start" gap={2}>
                    <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: 'black'}}>
                        ยืนยัน
                    </Button>
                    <Button onClick={handleClose} sx={{ color: 'black'}}>ยกเลิก</Button>
                </Box>
            </Box>
        </MUIModal>
    )
}

export default Modal