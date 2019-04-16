import React from 'react';
import { Formik, FormikProps, FormikActions } from 'formik';
import * as Yup from 'yup';

import Form from './Form';

export type FormValues = {
  from: string,
  billTo: string,
  shipTo: string,
  invoiceNumber: string,
  invoiceDate: string,
  dueDate: string,
  quantity: string,
  description: string,
  unitPrice: string,
  amount: string,
};

export type Props = FormikProps<FormValues>;

export default () => {
  const initialValues: FormValues = {
    from: '',
    billTo: '',
    shipTo: '',
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    quantity: '',
    description: '',
    unitPrice: '',
    amount: '',
  };

  const validationSchema = Yup.object({
    from: Yup.string().required('From is required'),
    billTo: Yup.string().required('Bill to is required'),
    shipTo: Yup.string().required('Ship to is required'),
    invoiceNumber: Yup.string().required('Invoice number is required'),
    invoiceDate: Yup.string().required('Invoice date is required'),
    dueDate: Yup.string().required('Due date is required'),
    quantity: Yup.string().required('Quantity is required'),
    description: Yup.string().required('Description is required'),
    unitPrice: Yup.string().required('Unit price is required'),
    amount: Yup.string().required('Amount is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      render={(props: Props) => <Form {...props} />}
      validationSchema={validationSchema}
      onSubmit={(values: FormValues, actions: FormikActions<FormValues>) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    />
  );
};
