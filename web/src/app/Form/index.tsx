import axios from 'axios';
import { Formik, FormikActions, FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import Auth from '../../auth';
import { calculateTotal } from '../../price/total';
import Form from './Form';

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
  billTo: '',
  dueDate: '',
  from: '',
  invoiceDate: '',
  invoiceNumber: '',
  items: [{ description: '', quantity: '', unitPrice: '', amount: '' }],
  shipTo: '',
};

const validationSchema = Yup.object({
  billTo: Yup.string().required('Bill to is required'),
  dueDate: Yup.string().required('Due date is required'),
  from: Yup.string().required('From is required'),
  invoiceDate: Yup.string().required('Invoice date is required'),
  invoiceNumber: Yup.string().required('Invoice number is required'),
  items: Yup.array()
    .of(
      Yup.object().shape({
        amount: Yup.string().required('Amount is required'),
        description: Yup.string().required('Description is required'),
        quantity: Yup.string().required('Quantity is required'),
        unitPrice: Yup.string().required('Unit price is required'),
      })
    )
    .min(1, 'Minimum of 1 items'),
  shipTo: Yup.string().required('Ship to is required'),
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
      render={(formFrops: FormProps) => {
        const total = calculateTotal(formFrops.values.items);

        return <Form {...formFrops} total={total} />;
      }}
      validationSchema={validationSchema}
      onSubmit={async (values: FormValues, _: FormikActions<FormValues>) => {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/save-invoice`, values);

        alert(res.status);
      }}
    />
  );
};
