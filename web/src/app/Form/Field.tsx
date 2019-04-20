import React, { Fragment } from 'react';
import { Form_Line, HandleChange, Input } from './Form';
import { Label } from './index';

export type Props = {
  id: Label;
  label: string;
  error?: string;
  value: string;
  touched?: boolean;
  handleChange: HandleChange;
};

export default (props: Props) => {
  return (
      <Input
        id={props.id}
        label={props.label}
        value={props.value}
        onChange={props.handleChange(props.id)}
        margin='normal'
        error={isError(props)}
        helperText={createHelperText(props)}
      />
  );
};

const createHelperText = (props: Props): string => {
  if (!props.touched) {
    return '';
  }

  if (!props.error) {
    return '';
  }

  return props.error;
};

const isError = (props: Props): boolean => Boolean(createHelperText(props));
