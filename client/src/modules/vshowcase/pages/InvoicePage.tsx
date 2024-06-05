import React from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import InvoiceDocument from '../components/invoice/InvoiceDocument';
import AppButton from '../../../shared/components/Buttons/AppButton';
import { InvoiceDto } from '../dtos/invoice.dto';
import styled from 'styled-components';
import AppIcon from '../../../shared/components/AppIcon';
import { useNavigate, useLocation } from 'react-router-dom';

const InvoicePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state;
  console.log(product)
  const handleFinish = () => {
    let url = '/'
    navigate(url);
  }
  return (
    <InvoicePageStyle>
                <PDFViewer>
            <InvoiceDocument></InvoiceDocument>
          </PDFViewer>

      <div className='vs-invoice'>
        <div className='vs-invoce-header'>
          <AppIcon icon="circle-check" className='vs-icon-check'>
            
          </AppIcon>
          <h5 className='fw-bold'>¡Gracias por tu compra!</h5>
          <span className=''>Tu solicitud de compra fue recibida</span>
        </div>
        <div className='vs-invoice-body'>
          <h6><strong>Comprobante nro:</strong> {product.id}</h6>
          <p><strong>Nombre del Comprador:</strong> {product.user_name}</p>
          <p><strong>Detalles del Producto:</strong> {product.productDetails}</p>
          <p><strong>Precio:</strong> {product.price}</p>
          <p><strong>Fecha de Compra:</strong> {product.purchaseDate}</p>
          <p><strong>Número de Factura:</strong> {product.invoiceNumber}</p>
        </div>
        <div className='vs-invoice-actions'>
          <AppButton onClick={handleFinish} label='Finalizar'></AppButton>
          <PDFDownloadLink
            document={<InvoiceDocument {...product} />}
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
    width: 400px;
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
`
