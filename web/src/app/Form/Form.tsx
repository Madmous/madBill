import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import React, { ChangeEvent, Fragment } from 'react';
import styled from 'styled-components';
import { FormValues, Item, FormProps } from './index';
import FieldComponent from './Field';
import ItemField from './ItemField';

const Form = styled.div`
  padding: 0.25em 1em;
`;

export const Form_Line = styled.div`
  display: flex;
`;

const Divider_Margin = styled.div`
  margin: 1em 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
`;

export const Form_Line_Flex = styled(Form_Line)`
  flex: 1;
`;

const Form_Line_Flex_Margin = styled(Form_Line_Flex)`
  margin-right: 1em;
`;

export const Input = styled(props => <TextField {...props} />)`
  flex: 1;
`;

const FocusedText = styled.p`
  font-size: 1.2em;
  font-weight: bold;
`;

const FocusedText_Right = styled(FocusedText)`
  text-align: right;
`;

type Props = FormProps & { total: number };
type Field = keyof Item;

export type HandleChange = (field: keyof FormValues) => (event: ChangeEvent<HTMLTextAreaElement>) => void;

type CreateHandleChange = (props: Props) => HandleChange;

const createHandleChange: CreateHandleChange = props => field => event => {
  props.handleChange(event);
  props.setFieldTouched(field, true, false);
};

export default (props: Props) => {
  const handleChange = createHandleChange(props);
  const { items } = props.values;

  return (
    <Form>
      <form
        onSubmit={e => {
          e.preventDefault();
          props.handleSubmit(e);
        }}
      >
        <Form_Line>
          <FieldComponent
            id="from"
            label="From"
            error={props.errors.from}
            value={props.values.from}
            touched={props.touched.from}
            handleChange={handleChange}
          />
        </Form_Line>
        <Form_Line>
          <FieldComponent
            id="billTo"
            label="Bill to"
            error={props.errors.billTo}
            value={props.values.billTo}
            touched={props.touched.billTo}
            handleChange={handleChange}
          />
        </Form_Line>
        <Form_Line>
          <FieldComponent
            id="shipTo"
            label="Ship to"
            error={props.errors.shipTo}
            value={props.values.shipTo}
            touched={props.touched.shipTo}
            handleChange={handleChange}
          />
        </Form_Line>
        <Form_Line>
          <FieldComponent
            id="invoiceNumber"
            label="Invoice number"
            error={props.errors.invoiceNumber}
            value={props.values.invoiceNumber}
            touched={props.touched.invoiceNumber}
            handleChange={handleChange}
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
            error={props.touched.invoiceDate && Boolean(props.errors.invoiceDate)}
            helperText={props.touched.invoiceDate ? props.errors.invoiceDate : ''}
          />
        </Form_Line>
        <Form_Line>
          <Input
            id="dueDate"
            label="Due date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.values.dueDate}
            onChange={handleChange('dueDate')}
            margin="normal"
            error={props.touched.dueDate && Boolean(props.errors.dueDate)}
            helperText={props.touched.dueDate ? props.errors.dueDate : ''}
          />
        </Form_Line>
        {items.map((item, index) => (
          <Fragment key={index}>
            <Form_Line>
              <ItemField
                id={`description`}
                label="Description"
                value={item.description}
                index={index}
                errors={props.errors.items}
                touched={props.touched.items}
                handleChange={handleChange}
              />
            </Form_Line>
            <Form_Line>
              <Form_Line_Flex_Margin>
                <ItemField
                  id={`quantity`}
                  label="Quantity"
                  value={item.quantity}
                  index={index}
                  type="number"
                  errors={props.errors.items}
                  touched={props.touched.items}
                  handleChange={handleChange}
                />
              </Form_Line_Flex_Margin>
              <Form_Line_Flex_Margin>
                <ItemField
                  id={`unitPrice`}
                  label="Unit price"
                  value={item.unitPrice}
                  index={index}
                  type="number"
                  errors={props.errors.items}
                  touched={props.touched.items}
                  handleChange={handleChange}
                />
              </Form_Line_Flex_Margin>
              <Form_Line_Flex_Margin>
                <ItemField
                  id={`amount`}
                  label="Amount"
                  value={item.amount}
                  index={index}
                  type="number"
                  errors={props.errors.items}
                  touched={props.touched.items}
                  handleChange={handleChange}
                />
              </Form_Line_Flex_Margin>
            </Form_Line>
            <div>
              <Button
                variant="contained"
                color="secondary"
                disabled={props.values.items.length === 1}
                onClick={() => {
                  const m = [...items];
                  m.splice(index, 1);
                  props.setFieldValue('items', m, true);
                }}
              >
                Remove item
              </Button>
            </div>
          </Fragment>
        ))}
        <Divider_Margin>
          <Divider />
        </Divider_Margin>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const nextItems = props.values.items.concat({ description: '', quantity: '', unitPrice: '', amount: '' });
              props.setFieldValue('items', nextItems, true);
            }}
          >
            Add new item
          </Button>
        </div>
        <Divider_Margin>
          <Divider />
        </Divider_Margin>
        <div>
          <Button type="submit" variant="contained" color="primary" disabled={!props.isValid}>
            Save invoice
          </Button>
        </div>
        <Grid>
          <FocusedText>TOTAL</FocusedText>
          <FocusedText_Right>
            <span>{props.total.toFixed(2)}</span>
            <span>€</span>
          </FocusedText_Right>
        </Grid>
      </form>
    </Form>
  );
};

const createItemHelperText = (props: Props, index: number, field: Field): string => {
  if (!props.touched.items) {
    return '';
  }

  const { items } = props.errors;

  if (typeof items === 'string') {
    return '';
  }

  if (items === undefined) {
    return '';
  }

  const item = items[index];

  if (item === undefined) {
    return '';
  }

  const itemField = item[field];

  if (itemField === undefined) {
    return '';
  }

  return itemField;
};

const isItemError = (props: Props, index: number, field: Field): boolean =>
  Boolean(createItemHelperText(props, index, field));
