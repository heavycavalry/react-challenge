import React, {useState} from 'react';
import {ActionHeader, Button, Card, ColorBox, LocalizedDate, Money} from 'ui';
import {IconAdd} from 'ui/atoms/button.styled';
import RemoveIcon from '@mui/icons-material/Remove';
import {Box} from '@mui/material';
import {QueryClient, QueryClientProvider} from 'react-query';
import {TableProvider} from 'ui/molecules/table/TableProvider';
import {LedgerService} from '../../api';
import {Grid} from '@mui/material';
import {AddNewLedgerRecord} from './AddNewLedgerRecord.modal';

const queryClient = new QueryClient();

const categoryCell = {
    label: 'Kategoria',
    renderCell({category, mode}) {
        if (mode === 'INCOME') {
            return (
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <ColorBox color={category.color}/>
                    <p>{category.name}</p>
                </Box>
            );
        } else {
            return (
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <ColorBox color={category.color}/>
                    <p>{category.name}</p>
                </Box>
            );
        }
    },
};

const nameCell = {
    label: 'Nazwa',
    renderCell({title}) {
        return <p>{title}</p>;
    },
};

const dateCell = {
    label: 'Data',
    renderCell({createdAt}) {
        return <LocalizedDate date={createdAt}/>;
    },
};

const amountCell = {
    label: 'Kwota',
    renderCell({amountInCents, mode}) {
        if (mode === 'INCOME') {
            return (
                <Box sx={{color: '#00A980', display: 'flex'}}>
                    <span>+</span>
                    <Money inCents={amountInCents}/>
                </Box>
            );
        } else {
            return (
                <Box sx={{color: '#FF5D5D', display: 'flex'}}>
                    <span>-</span>
                    <Money inCents={amountInCents}/>
                </Box>
            );
        }
    },
};

const headCells = [nameCell, categoryCell, dateCell, amountCell];

export const LedgerWidget = () => {
    const [type, setType] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Card
            sx={{position: 'relative'}}
            title={
                <ActionHeader
                    variant={'h1'}
                    title="Portfel"
                    renderActions={() => (
                        <Box sx={{position: 'absolute', right: '50px'}}>
                            <Button
                                sx={{margin: 1.5}}
                                variant="outlined"
                                color="primary"
                                startIcon={<IconAdd/>}
                                onClick={() => {
                                    setType('INCOME');
                                    setIsOpen(true);
                                }}
                            >
                                Wpłać
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<RemoveIcon/>}
                                onClick={() => {
                                    setType('EXPENSE');
                                    setIsOpen(true);
                                }}
                            >
                                Wypłać
                            </Button>
                        </Box>
                    )}
                />
            }
        >
            <AddNewLedgerRecord type={type} isOpen={isOpen} setIsOpen={setIsOpen}/>
            <Grid
                item
                xs={12}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                minHeight={'40vh'}
            >
                <QueryClientProvider client={queryClient}>
                    <TableProvider
                        service={LedgerService}
                        cells={headCells}
                        queryClient={queryClient}
                    />
                </QueryClientProvider>
            </Grid>
        </Card>
    );
};
