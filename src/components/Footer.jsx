import { ArrowPathIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer style={{backgroundColor: '#1e293b', color: 'white'}}>
      {/* Newsletter Section */}
      <div style={{backgroundColor: '#334155', padding: '3rem 1.5rem'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', textAlign: 'center'}}>
          <h3 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white'}}>Stay Updated</h3>
          <p style={{fontSize: '1.125rem', opacity: 0.9, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto'}}>Subscribe to our newsletter for health tips, special offers, and the latest pharmacy updates</p>
          <div style={{display: 'flex', maxWidth: '500px', margin: '0 auto', gap: '1rem'}}>
            <input
              type="email"
              placeholder="Enter your email address"
              style={{
                flex: 1,
                padding: '1rem 1.5rem',
                borderRadius: '50px',
                border: 'none',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <button style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '50px',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div style={{padding: '4rem 1.5rem 2rem'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '3rem'}}>
            
            {/* Company Info */}
            <div>
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem'}}>
                <div style={{backgroundColor: 'rgba(59,130,246,0.2)', padding: '0.75rem', borderRadius: '50%'}}>
                  <ArrowPathIcon style={{width: '28px', height: '28px', color: '#3b82f6'}} />
                </div>
                <div>
                  <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: 'white'}}>eCare Pharmacy</h3>
                  <p style={{fontSize: '0.875rem', opacity: 0.8, margin: 0}}>Quality Healthcare Solutions</p>
                </div>
              </div>
              <p style={{opacity: 0.8, fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem'}}>Your trusted partner in health and wellness, providing quality medications, healthcare products, and professional consultation services across Nigeria.</p>
              
              {/* Social Links */}
              <div style={{display: 'flex', gap: '1rem'}}>
                {[
                  { icon: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z', label: 'Twitter' },
                  { icon: 'M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z', label: 'Facebook' },
                  { icon: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z', label: 'Instagram' },
                  { icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', label: 'LinkedIn' }
                ].map((social, index) => (
                  <button key={index} style={{
                    backgroundColor: 'rgba(59,130,246,0.1)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#3b82f6';
                    e.target.style.borderColor = '#3b82f6';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(59,130,246,0.1)';
                    e.target.style.borderColor = 'rgba(59,130,246,0.2)';
                  }}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon}/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', color: 'white'}}>Quick Links</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                {['About Us', 'Our Services', 'Health Blog', 'Prescription Upload', 'Store Locator', 'Career Opportunities'].map((link, index) => (
                  <a key={index} href="#" style={{
                    color: 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#3b82f6';
                    e.target.style.paddingLeft = '0.5rem';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'rgba(255,255,255,0.8)';
                    e.target.style.paddingLeft = '0';
                  }}>
                    <span>→</span> {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 style={{fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', color: 'white'}}>Product Categories</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                {['Prescription Medicines', 'Over-the-Counter', 'Vitamins & Supplements', 'Personal Care', 'Medical Devices', 'Baby & Mother Care'].map((category, index) => (
                  <a key={index} href="#" style={{
                    color: 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#10b981';
                    e.target.style.paddingLeft = '0.5rem';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'rgba(255,255,255,0.8)';
                    e.target.style.paddingLeft = '0';
                  }}>
                    <span>•</span> {category}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact & Support */}
            <div>
              <h4 style={{fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', color: 'white'}}>Contact & Support</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                  <div style={{backgroundColor: 'rgba(59,130,246,0.2)', padding: '0.5rem', borderRadius: '8px'}}>
                    <PhoneIcon style={{width: '16px', height: '16px', color: '#3b82f6'}} />
                  </div>
                  <div>
                    <p style={{margin: 0, fontSize: '0.875rem', fontWeight: '600', color: 'white'}}>Phone Support</p>
                    <p style={{margin: 0, fontSize: '0.875rem', opacity: 0.8}}>+234 (080) 123-4567-23</p>
                  </div>
                </div>
                
                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                  <div style={{backgroundColor: 'rgba(16,185,129,0.2)', padding: '0.5rem', borderRadius: '8px'}}>
                    <EnvelopeIcon style={{width: '16px', height: '16px', color: '#10b981'}} />
                  </div>
                  <div>
                    <p style={{margin: 0, fontSize: '0.875rem', fontWeight: '600', color: 'white'}}>Email Support</p>
                    <p style={{margin: 0, fontSize: '0.875rem', opacity: 0.8}}>support@ecarepharm.com</p>
                  </div>
                </div>
                
                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                  <div style={{backgroundColor: 'rgba(245,158,11,0.2)', padding: '0.5rem', borderRadius: '8px'}}>
                    <MapPinIcon style={{width: '16px', height: '16px', color: '#f59e0b'}} />
                  </div>
                  <div>
                    <p style={{margin: 0, fontSize: '0.875rem', fontWeight: '600', color: 'white'}}>Visit Our Store</p>
                    <p style={{margin: 0, fontSize: '0.875rem', opacity: 0.8}}>123 Health Plaza, Lagos, Nigeria</p>
                  </div>
                </div>
                
                <div style={{marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(59,130,246,0.1)', borderRadius: '12px', border: '1px solid rgba(59,130,246,0.2)'}}>
                  <p style={{margin: 0, fontSize: '0.75rem', fontWeight: '600', color: '#3b82f6', marginBottom: '0.5rem'}}>24/7 Emergency Hotline</p>
                  <p style={{margin: 0, fontSize: '1rem', fontWeight: '700', color: 'white'}}>+234 (0) 800-PHARMACY</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div style={{borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'}}>
              <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
                {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Shipping Info', 'FAQ'].map((link, index) => (
                  <a key={index} href="#" style={{
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}>
                    {link}
                  </a>
                ))}
              </div>
              
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <span style={{fontSize: '0.875rem', opacity: 0.6}}>Secure payments powered by</span>
                <div style={{display: 'flex', gap: '0.5rem'}}>
                  {['Visa', 'Mastercard', 'Paystack'].map((payment, index) => (
                    <div key={index} style={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {payment}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div style={{textAlign: 'center', fontSize: '0.875rem', opacity: 0.6, paddingTop: '1rem'}}>
              © 2024 eCare Pharmacy. All rights reserved. | Licensed Pharmacy in Nigeria | Reg. No: PCN/2024/001
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}