import React, { useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import InvoiceDocument from '../components/invoice/InvoiceDocument';
import AppButton from '../../../shared/components/Buttons/AppButton';
import styled from 'styled-components';
import AppIcon from '../../../shared/components/AppIcon';
import { useNavigate, useLocation } from 'react-router-dom';

const InvoicePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state;
  const handleFinish = () => {
    let url = '/'
    navigate(url);
  }
  const generateInvoiceNumber = (productId?: number) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const numberGenerate = productId ? `INV-${year}${month}${day}${hours}${minutes}${seconds}-${productId}` : `REC-${year}${month}${day}${hours}${minutes}${seconds}`
    return numberGenerate;
  };
  const invoiceNumber = generateInvoiceNumber(product.id);
  const receiptNumber = generateInvoiceNumber();
  const invoiceData = {
    id: product.id,
    invoice_no: `${invoiceNumber}`,
    balance: `$${formattedPrice(product.price)}`,
    company: product.user_name,
    email: "atencionalcliente@asus.com",
    phone: "+1 (800) 123-4567",
    address: "123 Main Street, City, State, ZIP",
    trans_date: new Date().toISOString().split('T')[0],
    due_date: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
    items: [
      {
        sno: 1,
        desc: product.product_name,
        qty: 1,
        rate: product.price,
      }
    ],
  };
  function formattedPrice(price: number | bigint) {
    return new Intl.NumberFormat("es-ES").format(price);
}
  return (
    <InvoicePageStyle>
      <div className='vs-invoice'>
        <div className='vs-invoce-header'>
          <AppIcon icon="circle-check" className='vs-icon-check'>
            
          </AppIcon>
          <h5 className='fw-bold'>¡Gracias por tu compra!</h5>
          <span className=''>Tu solicitud de compra fue recibida</span>
          <p><strong>Comprobante #</strong> {receiptNumber}</p>
        </div>
        <div className='vs-invoice-body'>
          <p><strong>Factura: </strong> {invoiceData.invoice_no}</p>
          <p><strong>Fecha de Compra:</strong> {invoiceData.due_date}</p>
          <p><strong>Vendido por:</strong> {invoiceData.company}</p>
          <p><strong>Precio:</strong> {invoiceData.balance}</p>
        </div>
        <div className='vs-invoice-actions'>
          <AppButton onClick={handleFinish} label='Finalizar'></AppButton>
          <PDFDownloadLink
            document={<InvoiceDocument invoiceData={invoiceData} />}
            fileName={`factura_${product.invoiceNumber}.pdf`}
            className='vs-download-invoice'
          >
            {({ blob, url, loading, error }) =>
              loading ? 'Generando PDF...' : 'Descargar Factura'
            }
          </PDFDownloadLink>
        </div>
      </div>
    </InvoicePageStyle>
  );
};

export default InvoicePage;

const InvoicePageStyle = styled.div `
  .vs-invoice {
    width: 350px;
    margin: auto;
    border: 1px solid rgba(var(--color-gray-300-rgb), .1);
    box-shadow:  4px 6px 12px rgba(41, 41, 41, .3);
    border-radius: 1rem;
    background-color: #fff;
    text-align: center;
  }
  .vs-invoce-header {
    background-color: var(--color-pastel-green);
    border-radius: 1rem  1rem 0 0;
    padding: var(--p-4);
    color: #fff;
  }
  .vs-icon-check {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
  .vs-invoice-body {
    padding: var(--p-5);
  }
  .vs-invoice-actions {
    display: flex;
    flex-direction: column;
    border-top: 3px solid rgba(var(--color-gray-300-rgb), .15);
    padding: var(--p-5);
  }
  .vs-download-invoice{
    text-decoration: none;
    padding: var(--p-3);
  }
  @media (min-width : 768px) {
    .vs-invoice {
      width: 400px;
    }
  }
`
