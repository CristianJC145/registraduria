import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: '#806dfd',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    fontSize: 12,
    fontStyle: 'bold',
  },
  description: {
    width: '85%',
    textAlign: 'right',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: '15%',
    textAlign: 'right',
    paddingRight: 8,
  },
});

interface Item {
  qty: number;
  rate: number;
}

interface InvoiceTableFooterProps {
  items: Item[];
}

const InvoiceTableFooter: React.FC<InvoiceTableFooterProps> = ({ items }) => {
  const total = items.map(item => item.qty * item.rate)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <View style={styles.row}>
      <Text style={styles.description}>TOTAL</Text>
      <Text style={styles.total}>{Number.parseFloat(total.toString()).toFixed(2)}</Text>
    </View>
  );
};

export default InvoiceTableFooter;
