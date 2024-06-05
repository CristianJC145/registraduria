import React from 'react';
import styled from 'styled-components';
import { Text, View } from '@react-pdf/renderer';

const HeaderContainer = styled(View)`
  margin-top: 36px;
`;

const BillToText = styled(Text)`
  margin-top: 20px;
  padding-bottom: 3px;
  font-family: 'Helvetica-Oblique';
`;

interface InvoiceProps {
  invoice: {
    company: string;
    address: string;
    phone: string;
    email: string;
  };
}

const BillTo: React.FC<InvoiceProps> = ({ invoice }) => (
  <HeaderContainer>
    <BillToText>Bill To:</BillToText>
    <Text>{invoice.company}</Text>
    <Text>{invoice.address}</Text>
    <Text>{invoice.phone}</Text>
    <Text>{invoice.email}</Text>
  </HeaderContainer>
);

export default BillTo;
