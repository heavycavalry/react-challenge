import {Modal} from 'ui/molecules/Modal';
import {Controller, useForm} from 'react-hook-form';
import {FormControl, TextField} from '@mui/material';
import * as React from 'react';
import {SelectField} from './AddNewLedgerRecord.modal';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const AddNewBudgetRecord = ({isOpen, setIsOpen}) => {
    const validationSchema = Yup.object().shape({
        amount: Yup.number()
            .required('Kwota nie może być pusta')
            .typeError('Zły format kwoty')
            .min(0, 'Kwota musi być większa niż 0')
            .max(1000000, 'Kwota nie może być większa niż 1000000'),
        category: Yup.string()
            .required('Wybierz kategorie')

    });
    const {handleSubmit, control, reset, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    });
    const onSubmit = (data) => console.log(data);
    if (isOpen) {
        return (
            <Modal
                title="Zdefiniuj budżet"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onSubmit={handleSubmit(onSubmit)}
                reset={() => reset()}
            >
                <FormControl fullWidth>
                    <Controller
                        name={'amount'}
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                onChange={onChange} value={value} label={'Kwota'}/>
                        )}
                    />
                    <>{errors.amount?.message}</>
                    <Controller
                        name={'category'}
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <SelectField onChange={onChange} value={value}/>
                        )}
                    />
                    <>{errors.category?.message}</>
                </FormControl>
            </Modal>
        );
    }
    return <></>;
};
