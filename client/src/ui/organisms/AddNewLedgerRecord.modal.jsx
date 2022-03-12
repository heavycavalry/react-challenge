import * as React from 'react';
import {Modal} from 'ui/molecules/Modal';
import {FormControl, Select, TextField} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import {CategoryService} from '../../api';
import {useEffect, useState} from 'react';
import {CategoryCell} from '../molecules/CategoryCell';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const AddNewLedgerRecord = ({type, isOpen, setIsOpen}) => {
    let shape = {
        name: Yup.string()
            .required('Nazwa nie może być pusta'),
        amount: Yup.number()
            .required('Kwota nie może być pusta')
            .typeError('Zły format kwoty')
            .min(0, 'Kwota musi być większa niż 0')
            .max(1000000, 'Kwota nie może być większa niż 1000000')
    }
    if (type === 'EXPENSE') {
        shape.category = Yup.string().required('Wybierz kategorię');
    }
    const validationSchema = Yup.object().shape(shape);
    const {handleSubmit, control, reset, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    });
    const onSubmit = (data) => console.log(data);

    if (type === 'EXPENSE') {
        return (
            <Modal
                title="Dodaj wydatek"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onSubmit={handleSubmit(onSubmit)}
                reset={() => reset()}
            >
                <FormControl fullWidth>
                    <Controller
                        name={'name'}
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <TextField onChange={onChange} value={value} label={'Nazwa'}/>
                        )}
                    />
                    <>{errors.name?.message}</>
                    <Controller
                        name={'amount'}
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <TextField onChange={onChange} value={value} label={'Kwota'}/>
                        )}
                    />
                    <>{errors.amount?.message}</>
                    <Controller
                        control={control}
                        name={'category'}
                        render={({field: {onChange, value}}) => (
                            <SelectField onChange={onChange} value={value}/>
                        )}
                    />
                    {errors.category?.message}
                </FormControl>

            </Modal>)
    }
    if (type === 'INCOME') {
        return (
            <Modal
                title="Dodaj wpływ"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onSubmit={handleSubmit(onSubmit)}
                reset={() => reset()}
            >
                <FormControl fullWidth>
                    <Controller
                        name={'name'}
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <TextField onChange={onChange} value={value} label={'Nazwa'}/>
                        )}
                    />
                    <>{errors.name?.message}</>
                    <Controller
                        name={'amount'}
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <TextField onChange={onChange} value={value} label={'Kwota'}/>
                        )}
                    />
                    <>{errors.amount?.message}</>

                </FormControl>
            </Modal>
        );
    }
    return <></>;
}

export const SelectField = ({onChange, value}) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const promise = CategoryService.findAll();
        promise.then((data) => setCategories(data));
    }, []);
    return (
        <Select
            label="Wybierz kategorię"
            fullWidth
            onChange={onChange}
            value={value}
        >
            {categories.map((category) => (
                <MenuItem key={category.name} value={category.name}>
                    <CategoryCell name={category.name} color={category.color}/>
                </MenuItem>
            ))}
        </Select>
    );
};
