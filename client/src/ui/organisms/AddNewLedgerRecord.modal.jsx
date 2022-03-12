import * as React from 'react';
import { Modal } from 'ui/molecules/Modal';
import { FormControl, Select, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { CategoryService } from '../../api';
import { useEffect, useState } from 'react';
import { CategoryCell } from '../molecules/CategoryCell';
import { Controller, useForm } from 'react-hook-form';

export const AddNewLedgerRecord = ({ type, isOpen, setIsOpen }) => {
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => console.log(data);
  if (type === 'INCOME') {
    return (
      <Modal
        title="Dodaj wpływ"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form withSelect={false} control={control} />
      </Modal>
    );
  }
  if (type === 'EXPENSE') {
    return (
      <Modal
        title="Dodaj wydatek"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form withSelect={true} control={control} />
      </Modal>
    );
  }
  return <></>;
};

export const Form = ({ withSelect, control }) => {
  return (
    <FormControl fullWidth>
      <Controller
        name={'name'}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField onChange={onChange} value={value} label={'Nazwa'} />
        )}
      />
      <Controller
        name={'amount'}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField onChange={onChange} value={value} label={'Kwota'} />
        )}
      />
      {withSelect ? (
        <Controller
          control={control}
          name={'category'}
          render={({ field: { onChange, value } }) => (
            <SelectField onChange={onChange} value={value} />
          )}
        />
      ) : (
        <></>
      )}
    </FormControl>
  );
};

export const SelectField = ({ onChange, value }) => {
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
          <CategoryCell name={category.name} color={category.color} />
        </MenuItem>
      ))}
    </Select>
  );
};
