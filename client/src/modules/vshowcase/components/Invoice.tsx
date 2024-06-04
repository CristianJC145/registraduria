import React from "react";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    width: 200,
  },
  value: {
    width: 'auto',
  },
});

interface InvoiceProps {
  product: any;
}

const Invoice: React.FC<InvoiceProps> = ({ product }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Factura de Compra</Text>
        <View style={styles.item}>
          <Text style={styles.label}>Producto:</Text>
          <Text style={styles.value}>{product.name}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Precio:</Text>
          <Text style={styles.value}>${product.price}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default Invoice;
