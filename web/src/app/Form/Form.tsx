import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import React, { ChangeEvent, Fragment } from 'react';
import styled from 'styled-components';

import { calculateAmount } from '../../price/amount';

import FieldComponent from './Field';
import ItemField from './ItemField';
import { FormProps, FormValues } from './index';

const Form = styled.div`
  padding: 0.25em 1em;
`;

export const FormLine = styled.div`
  display: flex;
`;

const DividerMargin = styled.div`
  margin: 1em 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
`;

export const FormLineFlex = styled(FormLine)`
  flex: 1;
`;

const FormLineFlexMargin = styled(FormLineFlex)`
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

export type HandleChange = (
  field: keyof FormValues
) => (event: ChangeEvent<HTMLTextAreaElement>) => void;

type CreateHandleChange = (props: Props) => HandleChange;

const createHandleChange: CreateHandleChange = props => field => event => {
  props.handleChange(event);
  props.setFieldTouched(field, true, false);
};

export default (props: Props) => {
  const handleChange = createHandleChange(props);
  const labelProps = {
    shrink: true,
  };
  const { items } = props.values;

  return (
    <Form>
      <form
        onSubmit={e => {
          e.preventDefault();
          props.handleSubmit(e);
        }}
      >
        <FormLine>
          <FieldComponent
            id='from'
            label='From'
            error={props.errors.from}
            value={props.values.from}
            touched={props.touched.from}
            handleChange={handleChange}
          />
        </FormLine>
        <FormLine>
          <FieldComponent
            id='billTo'
            label='Bill to'
            error={props.errors.billTo}
            value={props.values.billTo}
            touched={props.touched.billTo}
            handleChange={handleChange}
          />
        </FormLine>
        <FormLine>
          <FieldComponent
            id='shipTo'
            label='Ship to'
            error={props.errors.shipTo}
            value={props.values.shipTo}
            touched={props.touched.shipTo}
            handleChange={handleChange}
          />
        </FormLine>
        <FormLine>
          <FieldComponent
            id='invoiceNumber'
            label='Invoice number'
            error={props.errors.invoiceNumber}
            value={props.values.invoiceNumber}
            touched={props.touched.invoiceNumber}
            handleChange={handleChange}
          />
        </FormLine>
        <FormLine>
          <Input
            id='invoiceDate'
            label='Invoice date'
            type='date'
            InputLabelProps={labelProps}
            value={props.values.invoiceDate}
            onChange={handleChange('invoiceDate')}
            margin='normal'
            error={
              props.touched.invoiceDate && Boolean(props.errors.invoiceDate)
            }
            helperText={
              props.touched.invoiceDate ? props.errors.invoiceDate : ''
            }
          />
        </FormLine>
        <FormLine>
          <Input
            id='dueDate'
            label='Due date'
            type='date'
            InputLabelProps={labelProps}
            value={props.values.dueDate}
            onChange={handleChange('dueDate')}
            margin='normal'
            error={props.touched.dueDate && Boolean(props.errors.dueDate)}
            helperText={props.touched.dueDate ? props.errors.dueDate : ''}
          />
        </FormLine>
        {items.map((item, index) => (
          <Fragment key={index}>
            <FormLine>
              <ItemField
                id='description'
                label='Description'
                value={item.description}
                index={index}
                errors={props.errors.items}
                touched={props.touched.items}
                handleChange={handleChange}
              />
            </FormLine>
            <FormLine>
              <FormLineFlexMargin>
                <ItemField
                  id='quantity'
                  label='Quantity'
                  value={item.quantity}
                  index={index}
                  type='number'
                  errors={props.errors.items}
                  touched={props.touched.items}
                  handleChange={handleChange}
                />
              </FormLineFlexMargin>
              <FormLineFlexMargin>
                <ItemField
                  id={`unitPrice`}
                  label='Unit price'
                  value={item.unitPrice}
                  index={index}
                  type='number'
                  errors={props.errors.items}
                  touched={props.touched.items}
                  handleChange={handleChange}
                />
              </FormLineFlexMargin>
              <FormLineFlexMargin>
                <Input
                  id='amount'
                  label='Amount'
                  value={calculateAmount(item)}
                  margin='normal'
                  type='number'
                  disabled={true}
                />
              </FormLineFlexMargin>
            </FormLine>
            <div>
              <Button
                variant='contained'
                color='secondary'
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
        <DividerMargin>
          <Divider />
        </DividerMargin>
        <div>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              const nextItems = props.values.items.concat({
                description: '',
                quantity: '',
                unitPrice: '',
              });
              props.setFieldValue('items', nextItems, true);
            }}
          >
            Add new item
          </Button>
        </div>
        <DividerMargin>
          <Divider />
        </DividerMargin>
        <div>
          <Button type='submit' variant='contained' color='primary'>
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
