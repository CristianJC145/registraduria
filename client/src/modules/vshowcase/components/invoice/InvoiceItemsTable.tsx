import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader';
import InvoiceTableRow from './InvoiceTableRow';
import InvoiceTableBlankSpace from './InvoiceTableBlankSpace';
import InvoiceTableFooter from './InvoiceTableFooter';

interface InvoiceItem {
  sno: number;
  desc: string;
  qty: number;
  rate: number;
}

interface Invoice {
  items: InvoiceItem[];
}

interface InvoiceItemsTableProps {
  invoice: Invoice;
}

const tableRowsCount = 11;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#806dfd',
  },
});

const InvoiceItemsTable: React.FC<InvoiceItemsTableProps> = ({ invoice }) => (
  <View style={styles.tableContainer}>
    <InvoiceTableHeader />
    <InvoiceTableRow items={invoice.items} />
    <InvoiceTableBlankSpace rowsCount={tableRowsCount - invoice.items.length} />
    <InvoiceTableFooter items={invoice.items} />x|
  </View>
);

export default InvoiceItemsTable;
