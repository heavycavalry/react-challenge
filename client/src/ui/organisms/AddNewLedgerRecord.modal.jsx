import * as React from 'react';
import {useEffect, useState} from 'react';
import {Modal} from 'ui/molecules/Modal';
import {FormHelperText, Select, TextField} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import {CategoryService} from '../../api';
import {CategoryCell} from '../molecules/CategoryCell';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {KeyboardArrowDown} from "@mui/icons-material";

export const AddNewLedgerRecord = ({type, isOpen, setIsOpen}) => {
    let shape = {
        name: Yup.string()
            .trim()
            .required('Nazwa nie może być pusta'), amount: Yup.number()
            .required('Kwota nie może być pusta')
            .typeError('Zły format kwoty')
            .min(0, 'Kwota musi być większa niż 0')
            .max(1000000, 'Kwota nie może być większa niż 1000000'),
    };
    if (type === 'EXPENSE') {
        shape.category = Yup.string().required('Wybierz kategorię');
    }
    const validationSchema = Yup.object().shape(shape);

    const {handleSubmit, control, reset, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    });
    const onSubmit = (data) => console.log(data);

    if (type === 'EXPENSE') {
        return (<Modal
            title="Dodaj wydatek"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onSubmit={handleSubmit(onSubmit)}
            reset={() => reset()}
        >
            <Controller
                name={'name'}
                control={control}
                render={({field: {onChange, value}}) => (
                    <TextField fullWidth type={"text"} margin={"dense"} error={errors.name}
                               helperText={errors.name?.message}
                               onChange={onChange} value={value} label={'Nazwa'}/>)}
            />
            <Controller
                name={'amount'}
                control={control}
                render={({field: {onChange, value}}) => (
                    <TextField type={"number"} fullWidth margin={"dense"} error={errors.amount}
                               helperText={errors.amount?.message}
                               onChange={onChange}
                               value={value} label={'Kwota'}/>)}
            />
            <Controller
                control={control}
                name={'category'}
                render={({field: {onChange, value}}) => (<SelectField errors={errors} onChange={onChange} value={value}
                                                                      method={CategoryService.findAll()}
                />)}
            />
        </Modal>);
    }
    if (type === 'INCOME') {
        return (<Modal
            title="Dodaj wpływ"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onSubmit={handleSubmit(onSubmit)}
            reset={() => reset()}
        >
            <Controller

                name={'name'}
                control={control}
                render={({field: {onChange, value}}) => (
                    <TextField fullWidth error={errors.name} type={"text"} helperText={errors.name?.message}
                               margin={"dense"}
                               onChange={onChange} value={value} label={'Nazwa'}/>)}
            />

            <Controller
                name={'amount'}
                control={control}
                render={({field: {onChange, value}}) => (
                    <TextField fullWidth type={"number"} error={errors.amount} helperText={errors.amount?.message}
                               margin={"dense"}
                               onChange={onChange} value={value} label={'Kwota'}/>)}
            />
        </Modal>);
    }
    return <></>;
};

export const SelectField = ({onChange, value, errors, method}) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        method.then((data) => setCategories(data));
    }, []);
    return (<>
        <Select
            fullWidth
            onChange={onChange}
            value={value}
            error={errors.category}
            defaultValue={"kategoria"}
            sx={{margin: "10px 0"}}
            IconComponent={() => <KeyboardArrowDown sx={{color: "#334ACC", margin: "10px", cursor: "pointer"}}/>}
        >
            <option value="kategoria" selected disabled
                    hidden>Kategoria
            </option>
            {categories.map((category) => (<MenuItem sx={{margin: "5px 0"}} key={category.name} value={category.name}>
                <CategoryCell name={category.name} color={category.color}/>
            </MenuItem>))}

        </Select>
        <FormHelperText error={errors.category}>{errors.category?.message}</FormHelperText>
    </>)
};
