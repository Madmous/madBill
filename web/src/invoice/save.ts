import axios, { AxiosPromise } from 'axios';

import { FormValues } from '../app/Form/index';

export type SaveInvoice = (token: string, values: FormValues) => AxiosPromise<ArrayBuffer>;

const saveInvoice: SaveInvoice = (token, values) => {
  return axios.post(
    `${process.env.REACT_APP_SERVER_URL}/save-invoice`,
    values,
    {
      headers: {
        Accept: 'application/pdf',
        Authorization: `Bearer ${token}`,
      },
      responseType: 'arraybuffer',
    }
  );
};

export default saveInvoice;
