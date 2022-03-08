import { Modal } from 'ui/molecules/Modal';
import { FormControl, Select, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { CategoryService } from '../../api';
import { useEffect, useState } from 'react';
import { CategoryCell } from '../molecules/CategoryCell';

export const AddNewLedgerRecord = ({ type, isOpen, setIsOpen }) => {
  if (type === 'INCOME') {
    return (
      <Modal title="Dodaj wpływ" isOpen={isOpen} setIsOpen={setIsOpen}>
        <FormControl fullWidth>
          <TextField label="Nazwa" />
          <TextField label="Kwota" />
        </FormControl>
      </Modal>
    );
  }
  if (type === 'EXPENSE') {
    return (
      <Modal title="Dodaj wydatek" isOpen={isOpen} setIsOpen={setIsOpen}>
        <FormControl fullWidth>
          <TextField label="Nazwa" fullWidth />
          <TextField label="Kwota" fullWidth />
          <SelectField />
        </FormControl>
      </Modal>
    );
  }
  return <></>;
};

export const SelectField = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const promise = CategoryService.findAll();
    promise.then((data) => setCategories(data));
  }, []);
  console.dir(categories);
  return (
    <Select label="Wybierz kategorię" fullWidth>
      {categories.map((category) => (
        <MenuItem>
          <CategoryCell name={category.name} color={category.color} />
        </MenuItem>
      ))}
    </Select>
  );
};
