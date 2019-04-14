import TextField from '@material-ui/core/TextField';
import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

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

type Props = {
  from: string;
  setFrom: (value: string) => void;
  billTo: string;
  setBillTo: (value: string) => void;
  shipTo: string;
  setShipTo: (value: string) => void;
  invoiceNumber: string;
  setInvoiceNumber: (value: string) => void;
  invoiceDate: string;
  setInvoiceDate: (value: string) => void;
  dueDate: string;
  setDueDate: (value: string) => void;
  quantity: string;
  setQuantity: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  unitPrice: string;
  setUnitPrice: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
};

export default (props: Props) => (
  <Form>
    <Form_Line>
      <Input
        id="from"
        label="From"
        value={props.from}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => props.setFrom(event.target.value)}
        margin="normal"
      />
    </Form_Line>
    <Form_Line>
      <Input
        id="bill-to"
        label="Bill to"
        value={props.billTo}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => props.setBillTo(event.target.value)}
        margin="normal"
      />
    </Form_Line>
    <Form_Line>
      <Input
        id="shop-to"
        label="Ship to"
        value={props.shipTo}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => props.setShipTo(event.target.value)}
        margin="normal"
      />
    </Form_Line>
    <Form_Line>
      <Input
        id="invoice-number"
        label="Invoice number"
        value={props.invoiceNumber}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => props.setInvoiceNumber(event.target.value)}
        margin="normal"
      />
    </Form_Line>
    <Form_Line>
      <Input
        id="invoice-date"
        label="Invoice date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={props.invoiceDate}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => props.setInvoiceDate(event.target.value)}
        margin="normal"
      />
    </Form_Line>
    <Form_Line>
      <Input
        id="due-date"
        label="due date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={props.dueDate}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => props.setDueDate(event.target.value)}
        margin="normal"
      />
    </Form_Line>
    <Form_Line>
      <Input
        id="description"
        label="Description"
        value={props.description}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => props.setDescription(event.target.value)}
        margin="normal"
      />
    </Form_Line>
    <Form_Line>
      <Form_Line_Flex_Margin>
        <Input
          id="quantity"
          label="Quantity"
          type="number"
          InputProps={{ inputProps: { min: 1 } }}
          value={props.quantity}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => props.setQuantity(event.target.value)}
          margin="normal"
        />
      </Form_Line_Flex_Margin>
      <Form_Line_Flex_Margin>
        <Input
          id="unit-price"
          label="Unit price"
          type="number"
          InputProps={{ inputProps: { min: 1 } }}
          value={props.unitPrice}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => props.setUnitPrice(event.target.value)}
          margin="normal"
        />
      </Form_Line_Flex_Margin>
      <Form_Line_Flex>
        <Input
          id="amount"
          label="Amount"
          type="number"
          InputProps={{ inputProps: { min: 1 } }}
          value={props.amount}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => props.setAmount(event.target.value)}
          margin="normal"
        />
      </Form_Line_Flex>
    </Form_Line>
  </Form>
);
