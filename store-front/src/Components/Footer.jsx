const Footer = () => {
  return (
    <div className='footer container'>
      <div className="footer-column footer-rights">
        <div className='logo footer-logo'>
          <p>Doroty</p>
        </div>
        <p> &#169; 2025 All rights reserved</p>
      </div>
      <div className="footer-column">
        <h2>Important Links</h2>
        <a className='link'>Returns and Refunds</a>
        <a className='link'>Terms and conditions</a>
        <a className='link'>Shipping policy</a>
      </div>
      <div className="footer-column">
        <h2>Contact Us</h2>
        <a className='link'>email: dorothy@shop.com</a>
        <a className='link'>phone: +44 (0) 117 1257853</a>
        <a className='link'>address: Calle de Arganzuela 15, Madrid, Spain</a>
      </div>
    </div>
  )
}

export default Footer;