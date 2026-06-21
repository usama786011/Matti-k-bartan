import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ShoppingBag, Truck, RefreshCw, CreditCard, AlertCircle, Scale, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';

const Section = ({ icon: Icon, title, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, delay }}
    style={{
      background: 'white',
      borderRadius: '20px',
      padding: '2rem 2.25rem',
      boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
      border: '1px solid rgba(194,65,12,0.07)',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
      <div style={{
        width: '42px', height: '42px', borderRadius: '12px',
        background: 'linear-gradient(135deg, var(--primary-light), #fff7ed)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={20} color="var(--primary)" />
      </div>
      <h2 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--secondary)', margin: 0 }}>{title}</h2>
    </div>
    <div style={{ fontSize: '0.92rem', color: '#555', lineHeight: '1.8' }}>
      {children}
    </div>
  </motion.div>
);

const Bullet = ({ children }) => (
  <li style={{ marginBottom: '0.5rem', paddingLeft: '0.25rem' }}>
    <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>▸</span>{children}
  </li>
);

const ShopTerms = ({ onBack }) => {
  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '0.75rem 1rem 4rem' }}>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem',
          marginBottom: '2rem', padding: '0.5rem 0',
        }}
      >
        <ArrowLeft size={18} /> Back
      </motion.button>

      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: 'center',
          background: 'linear-gradient(135deg, #1a0f00 0%, #2d1800 100%)',
          borderRadius: '24px',
          padding: '3rem 2rem',
          marginBottom: '2.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(194,65,12,0.12)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(245,158,11,0.08)', pointerEvents: 'none' }} />
        <div style={{
          width: '64px', height: '64px', borderRadius: '18px',
          background: 'linear-gradient(135deg, var(--primary), #f59e0b)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.25rem',
        }}>
          <FileText size={30} color="white" />
        </div>
        <h1 style={{ fontSize: '2.2rem', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: '400', margin: '0 0 0.75rem' }}>
          Terms of Service
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', margin: '0 0 1rem' }}>
          Riwaayat Pots — Multan Road, Lahore, Pakistan
        </p>
        <span style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '20px',
          padding: '0.35rem 1rem',
          fontSize: '0.78rem',
          color: 'rgba(255,255,255,0.5)',
        }}>
          Aakhri update: June 2026
        </span>
      </motion.div>

      {/* Intro */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          fontSize: '0.95rem', color: '#666', lineHeight: '1.85',
          background: '#fffbf7', borderRadius: '16px',
          padding: '1.5rem 1.75rem',
          border: '1px solid rgba(194,65,12,0.09)',
          marginBottom: '1.5rem',
        }}
      >
        Riwaayat Pots se khareedari karte waqt aap in shartein qabool karte hain. Meherban karke inhe ghaur se parhein. Agar koi sawaal ho to hamare saath rabta karein — hum khushi se jawab denge.
      </motion.p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* 1 */}
        <Section icon={ShoppingBag} title="Products aur Orders" delay={0.12}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <Bullet>Tamam products haath se bane hote hain — rang, size aur texture mein thodi farq ho sakti hai, yeh handmade hone ki khasiyat hai.</Bullet>
            <Bullet>Product images real items ki naqal hain lekin screen display ki wajah se rangon mein farq mumkin hai.</Bullet>
            <Bullet>Order place karne ke baad stock khatam hone ki soorat mein hum aapko inform karenge aur poori refund denge.</Bullet>
            <Bullet>Prices kabhi bhi tabdeel ho sakti hain lekin placed order ki price nahi badlegi.</Bullet>
            <Bullet>Bulk orders (10+ items) ke liye pehle WhatsApp ya phone par rabta karein.</Bullet>
          </ul>
        </Section>

        {/* 2 */}
        <Section icon={Truck} title="Delivery aur Shipping" delay={0.18}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <Bullet>Delivery Pakistan ke andar available hai — Lahore, Karachi, Islamabad, Multan aur tamam major cities.</Bullet>
            <Bullet>Order processing mein 1–2 working days lagte hain.</Bullet>
            <Bullet>Delivery time: Lahore mein 1–2 din, baaki cities mein 3–5 working days.</Bullet>
            <Bullet>Delivery charges order total ke mutabiq alag ho sakti hain — checkout par show hongi.</Bullet>
            <Bullet>Clay items naturally heavy hote hain — delivery cost us hisaab se hogi.</Bullet>
            <Bullet>Delivery ke waqt ghar par koi maujood hona zaroori hai — nahin to order wapas aa sakta hai.</Bullet>
          </ul>
        </Section>

        {/* 3 */}
        <Section icon={CreditCard} title="Payment" delay={0.24}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <Bullet>Hum sirf <strong>Cash on Delivery (COD)</strong> qabool karte hain.</Bullet>
            <Bullet>Delivery waqt courier ko poori payment karna hogi — partial payment nahi hogi.</Bullet>
            <Bullet>Online transfer ya advance payment ka koi option abhi available nahi.</Bullet>
            <Bullet>Receipt ya bill ki zaroorat ho to order ke waqt batayein.</Bullet>
          </ul>
        </Section>

        {/* 4 */}
        <Section icon={RefreshCw} title="Wapasi aur Tabdeeli (Return & Exchange)" delay={0.30}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <Bullet>Agar product delivery ke waqt <strong>toot hua ya kharab</strong> mila to 24 ghante ke andar photo samet WhatsApp karein — hum replace karenge.</Bullet>
            <Bullet>Galat item deliver hone ki soorat mein free replacement di jaayegi.</Bullet>
            <Bullet>Sahi product deliver ho jaane ke baad sirf "pasand nahi aayi" ki wajah se return nahi hogi.</Bullet>
            <Bullet>Return mein delivery charges customer ki zimmedari honge (jab tak hamari ghalti na ho).</Bullet>
            <Bullet>Exchange sirf original packing mein milne wale items par apply hogi.</Bullet>
          </ul>
          <p style={{ marginTop: '0.75rem', padding: '0.75rem 1rem', background: '#fff7ed', borderRadius: '10px', border: '1px solid rgba(194,65,12,0.12)', color: '#7c3700', fontSize: '0.87rem' }}>
            ⚠️ Clay products naturally naazuk hote hain — delivery ke waqt poori packing check karein aur courier ke saamne hi kholein.
          </p>
        </Section>

        {/* 5 */}
        <Section icon={AlertCircle} title="Product ki Daikhhbaal (Care Instructions)" delay={0.36}>
          <p style={{ marginBottom: '0.75rem' }}>Mitti ke bartan zyada salaamat aur lamba chalein, isliye:</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <Bullet>Pehli baar use se pehle saaf paani mein 30 minute bhigo dein.</Bullet>
            <Bullet>Dishwasher ya microwave mein istemal na karein.</Bullet>
            <Bullet>Seedhi dhoop ya aag par rakhne se parhez karein.</Bullet>
            <Bullet>Gire toh toot sakte hain — door rakh kar store karein.</Bullet>
            <Bullet>Dry jagah rakhein, zehra lagat maadde se dur.</Bullet>
          </ul>
          <p style={{ marginTop: '0.75rem', color: '#888', fontSize: '0.85rem' }}>
            Care na karne ki wajah se nuqsaan par koi return/exchange nahi hogi.
          </p>
        </Section>

        {/* 6 */}
        <Section icon={Scale} title="Huqooq aur Zimmedariyan" delay={0.42}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <Bullet>Riwaayat Pots apne tamam products ki quality ka zimma leta hai.</Bullet>
            <Bullet>Courier ya delivery service ki wajah se delay par hamari zimmedari nahi — lekin hum poori koshish karenge masla hal karein.</Bullet>
            <Bullet>Customer ka data sirf order processing ke liye use hoga — kisi third party ko nahi becha jaayega.</Bullet>
            <Bullet>Ye shartein kabhi bhi tabdeel ho sakti hain — website par updated version hi moetabar hoga.</Bullet>
            <Bullet>Kisi bhi ikhtilaf ki soorat mein Lahore ki adalat ka qanoon laagu hoga.</Bullet>
          </ul>
        </Section>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            background: 'linear-gradient(135deg, #1a0f00 0%, #2d1800 100%)',
            borderRadius: '20px',
            padding: '2rem 2.25rem',
          }}
        >
          <h2 style={{ color: 'white', fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            Koi Sawaal Hai?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
            Hamse seedha rabta karein — hum aapki madad ke liye haazir hain.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {[
              { icon: MapPin, text: 'Multan Road, Lahore, Pakistan' },
              { icon: Mail,   text: 'support@mattiart.pk' },
              { icon: Phone,  text: '+92 42 1234 5678' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Icon size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
                <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem' }}>{text}</span>
              </div>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', marginTop: '1.25rem', marginBottom: 0 }}>
            © 2026 Riwaayat Pots. Tamam huqooq mahfooz hain.
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default ShopTerms;
