import React from 'react';
import {Modal as MuiModal} from '@mui/material';
import {Card} from '@mui/material';
import {Button} from 'ui';
import {CardHeader, CardContent} from '@mui/material';
import {CardActions as MuiCardActions} from '@mui/material';
import styled from 'styled-components';

export const Modal = ({title, children, description, isOpen, setIsOpen}) => {

    const handleClose = () => {
        setIsOpen(false);
    };
    return isOpen ? (
        <StyledModal
            outline={0}
            BackdropComponent={Backdrop}
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Card sx={{width: 450}} variant="outlined">
                <CardHeader title={title}/>
                <h4>{description}</h4>
                <CardContent sx={{minHeight: 20}} children={children}/>
                <MuiCardActions sx={{float: 'right'}}>
                    <Button variant="outlined" color="primary" onClick={handleClose}>
                        Anuluj
                    </Button>
                    <Button variant="contained" color="primary">
                        Zapisz
                    </Button>
                </MuiCardActions>
            </Card>
        </StyledModal>
    ) : "";
};

const StyledModal = styled(MuiModal)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;
