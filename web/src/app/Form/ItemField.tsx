import React, { Fragment } from 'react';
import { FormikErrors, FormikTouched } from 'formik';
import { Form_Line_Flex, HandleChange, Input } from './Form';
import { Item, ItemField } from './index';

export type Props = {
  id: ItemField;
  label: string;
  value: string;
  index: number;
  type?: 'number';
  errors?: (FormikErrors<Item> | undefined)[] | undefined;
  touched?: (FormikTouched<Item> | undefined)[] | undefined;
  handleChange: HandleChange;
};

export default (props: Props) => {
  return (
    <Input
      id={`items[${props.index}].${props.id}`}
      label={props.label}
      value={props.value}
      InputProps={{ inputProps: { min: 1 } }}
      onChange={props.handleChange('items')}
      margin="normal"
      type={props.type || 'text'}
      error={isItemError(props)}
      helperText={createItemHelperText(props)}
    />
  );
};

const isItemError = (props: Props): boolean => Boolean(createItemHelperText(props));

const createItemHelperText = (props: Props): string => {
  if (!props.touched) {
    return '';
  }

  const { errors } = props;

  if (typeof errors === 'string') {
    return '';
  }

  if (errors === undefined) {
    return '';
  }

  const item = errors[props.index];

  if (item === undefined) {
    return '';
  }

  const itemField = item[props.id];

  if (itemField === undefined) {
    return '';
  }

  return itemField;
};
