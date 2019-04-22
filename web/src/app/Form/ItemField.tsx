import { FormikErrors, FormikTouched } from 'formik';
import React from 'react';

import { HandleChange, Input } from './Form';
import { Item, ItemField } from './index';

export type Props = {
  errors?: Array<FormikErrors<Item> | undefined> | undefined;
  id: ItemField;
  label: string;
  value: string;
  index: number;
  type?: 'number';
  disabled?: boolean;
  touched?: Array<FormikTouched<Item> | undefined> | undefined;
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
      margin='normal'
      type={props.type || 'text'}
      disabled={props.disabled || false}
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
