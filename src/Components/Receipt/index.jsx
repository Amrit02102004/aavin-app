import React from 'react'
import "./receipt.css"
import html2pdf from 'html2pdf.js';
import logo from "./logo.png";

const receipt = ({items}) => {

    const handleDownload = () => {
        const element = document.getElementById('invoice-POS');
        html2pdf(element, {
          margin: 1,
          filename: 'invoice.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        });
      };

      const total = (items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)).toFixed(2);

      const tax = (total * 0.05).toFixed(2);

  return (
    <>
    <div id="invoice-POS" className="container mt-5 p-3 bg-white shadow-sm">
    <div className="text-center" id="top">
      <img src={logo} alt="Logo" className="logo mx-auto"/>
      <div className="info">
        <h2>Aavin Corp.</h2>
      </div>
    </div>
    
    <div id="mid" className="border-bottom py-3 row">
      <div className="col-md-6 info text-start">
        <h4 className='text-start'>Contact Info</h4>
        <p>
          Address : street city, state 0000<br />
          Email   : JohnDoe@gmail.com<br />
          Phone   : 555-555-5555<br />
        </p>
      </div>
      <div className="col-md-6 text-end">
        <h4 className='text-end'>GST No.</h4>
        <p>
          GST No: 1234567890
        </p>
      </div>
    </div>
    
    <div id="bot" className="pt-3">
      <div id="table">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Sub Total</th>
            </tr>
          </thead>
          <tbody>
          {items.map(item => (

            <tr>
              <td>{item.productName}</td>
              <td>{item.quantity}</td>
              <td>$ {(parseFloat(item.price) * (item.quantity)).toFixed(2)}</td>
            </tr>
            ))}
            
            <tr className="table-light">
              <td></td>
              <td><b>Tax (5%)</b></td>
              <td>$ {tax}</td>
            </tr>
            <tr className="table-light">
              <td></td>
              <td><b>Total</b></td>
              <td>$ {parseFloat(total) + parseFloat(tax)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="legalcopy" className="mt-3">
        <p className="legal text-center"><strong>Thank you for your business!</strong> Payment is expected within 31 days; please process this invoice within that time. There will be a 5% interest charge per month on late invoices.</p>
      </div>
    </div>
  </div>
  <div class="text-center mt-3">
        <button id="downloadBtn" class="btn btn-primary" onClick={handleDownload}>Download Invoice</button>
  </div>
  </>

  )
}

export default receipt;
