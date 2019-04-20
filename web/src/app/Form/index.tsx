import axios from 'axios';
import { Formik, FormikActions, FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { calculateTotal } from '../../price/total';
import Form from './Form';
import Auth from '../../auth';

export type Item = { description: string; quantity: string; unitPrice: string; amount: string };

export type ItemField = keyof Item;

export type FormValues = {
  from: string;
  billTo: string;
  shipTo: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  items: Item[];
};

export type Label = keyof FormValues;

export type FormProps = FormikProps<FormValues>;

const initialValues: FormValues = {
  from: '',
  billTo: '',
  shipTo: '',
  invoiceNumber: '',
  invoiceDate: '',
  dueDate: '',
  items: [{ description: '', quantity: '', unitPrice: '', amount: '' }],
};

const validationSchema = Yup.object({
  from: Yup.string().required('From is required'),
  billTo: Yup.string().required('Bill to is required'),
  shipTo: Yup.string().required('Ship to is required'),
  invoiceNumber: Yup.string().required('Invoice number is required'),
  invoiceDate: Yup.string().required('Invoice date is required'),
  dueDate: Yup.string().required('Due date is required'),
  items: Yup.array()
    .of(
      Yup.object().shape({
        quantity: Yup.string().required('Quantity is required'),
        description: Yup.string().required('Description is required'),
        unitPrice: Yup.string().required('Unit price is required'),
        amount: Yup.string().required('Amount is required'),
      })
    )
    .min(1, 'Minimum of 1 items'),
});

type Props = {
  auth: Auth;
};

export default (props: Props) => {
  if (!props.auth.isAuthenticated()) {
    props.auth.login();
  }

  return (
    <Formik
      initialValues={initialValues}
      render={(props: FormProps) => {
        const total = calculateTotal(props.values.items);

        return <Form {...props} total={total} />;
      }}
      validationSchema={validationSchema}
      onSubmit={async (values: FormValues, _: FormikActions<FormValues>) => {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/save-invoice`, values);

        alert(res.status);
      }}
    />
  );
};
