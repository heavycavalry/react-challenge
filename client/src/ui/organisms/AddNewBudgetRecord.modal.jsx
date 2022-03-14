import {Modal} from 'ui/molecules/Modal';
import {Controller, useForm} from 'react-hook-form';
import {TextField} from '@mui/material';
import * as React from 'react';
import {SelectField} from './AddNewLedgerRecord.modal';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {CategoryService} from "../../api";

export const AddNewBudgetRecord = ({isOpen, setIsOpen}) => {
    const validationSchema = Yup.object().shape({
        amount: Yup.number()
            .required('Kwota nie może być pusta')
            .min(0, 'Kwota musi być większa niż 0')
            .max(1000000, 'Kwota nie może być większa niż 1000000'),
        category: Yup.string()
            .required('Wybierz kategorie'),
    });
    const {
        handleSubmit,
        control,
        reset,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(validationSchema),
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
                <Controller
                    name={'amount'}
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <TextField fullWidth
                                   type={"number"} error={errors.amount} helperText={errors.amount?.message}
                                   onChange={onChange}
                                   value={value} label={'Kwota'}/>
                    )}
                />
                <Controller
                    name={'category'}
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <SelectField fullWidth
                                     onChange={onChange} value={value} errors={errors}
                                     method={CategoryService.findAll(true)}/>
                    )}
                />
            </Modal>
        );
    }
    return <></>;
};
