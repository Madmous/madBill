import TextField from '@material-ui/core/TextField';
import React, { ChangeEvent, Fragment } from 'react';
import styled from 'styled-components';

import { Props, FormValues } from './index';

const Form = styled.div`
  padding: 0.25em 1em;
`;

const Form_Line = styled.div`
  display: flex;
`;

const Form_Line_Flex = styled(Form_Line)`
  flex: 1;
`;

const Form_Line_Flex_Margin = styled(Form_Line_Flex)`
  margin-right: 1em;
`;

const Input = styled(props => <TextField {...props} />)`
  flex: 1;
`;

export default (props: Props) => {
  const handleChange = (field: keyof FormValues) => (event: ChangeEvent<HTMLTextAreaElement>) => {
    props.handleChange(event);
    props.setFieldTouched(field, true, false);
  };

  return (
    <Form>
      <Form_Line>
        <Input id="from" label="From" value={props.values.from} onChange={handleChange('from')} margin="normal" />
      </Form_Line>
      <Form_Line>
        <Input
          id="billTo"
          label="Bill to"
          value={props.values.billTo}
          onChange={handleChange('billTo')}
          margin="normal"
        />
      </Form_Line>
      <Form_Line>
        <Input
          id="shipTo"
          label="Ship to"
          value={props.values.shipTo}
          onChange={handleChange('shipTo')}
          margin="normal"
        />
      </Form_Line>
      <Form_Line>
        <Input
          id="invoiceNumber"
          label="Invoice number"
          value={props.values.invoiceNumber}
          onChange={handleChange('invoiceNumber')}
          margin="normal"
        />
      </Form_Line>
      <Form_Line>
        <Input
          id="invoiceDate"
          label="Invoice date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={props.values.invoiceDate}
          onChange={handleChange('invoiceDate')}
          margin="normal"
        />
      </Form_Line>
      <Form_Line>
        <Input
          id="dueDate"
          label="due date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={props.values.dueDate}
          onChange={handleChange('dueDate')}
          margin="normal"
        />
      </Form_Line>
      {props.values.items.map((item, index) => (
        <Fragment key={index}>
          <Form_Line>
            <Input
              id={`items[${index}].description`}
              label="Description"
              value={item.description}
              onChange={handleChange('items')}
              margin="normal"
            />
          </Form_Line>
          <Form_Line>
            <Form_Line_Flex_Margin>
              <Input
                id={`items[${index}].quantity`}
                label="Quantity"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                value={item.quantity}
                onChange={handleChange('items')}
                margin="normal"
              />
            </Form_Line_Flex_Margin>
            <Form_Line_Flex_Margin>
              <Input
                id={`items[${index}].unitPrice`}
                label="Unit price"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                value={item.unitPrice}
                onChange={handleChange('items')}
                margin="normal"
              />
            </Form_Line_Flex_Margin>
            <Form_Line_Flex>
              <Input
                id={`items[${index}].amount`}
                label="Amount"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                value={item.amount}
                onChange={handleChange('items')}
                margin="normal"
              />
            </Form_Line_Flex>
          </Form_Line>
        </Fragment>
      ))}
    </Form>
  );
};
