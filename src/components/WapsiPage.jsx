import React from 'react';
import { motion } from 'framer-motion';
import { PackageX, CheckCircle, XCircle, Clock, Camera, PhoneCall, Truck, AlertTriangle, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';

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

const Bullet = ({ children, type = 'normal' }) => {
  const colors = { normal: 'var(--primary)', yes: '#16a34a', no: '#dc2626' };
  const icons  = { normal: '▸', yes: '✓', no: '✗' };
  return (
    <li style={{ marginBottom: '0.5rem', paddingLeft: '0.25rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
      <span style={{ color: colors[type], fontWeight: '700', flexShrink: 0, marginTop: '1px' }}>{icons[type]}</span>
      <span>{children}</span>
    </li>
  );
};

const WapsiPage = ({ onBack }) => {
  const { settings } = useStore();
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
          <PackageX size={30} color="white" />
        </div>
        <h1 style={{ fontSize: '2.2rem', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: '400', margin: '0 0 0.75rem' }}>
          Return Policy
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', margin: '0 0 1rem' }}>
          {settings.name} — {settings.address}
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
        Riwaayat Pots mein hum apni craftsmanship par fakhar karte hain aur chahte hain ke aap apni khareedari se 100% khush hon. Agar koi masla ho to hum poori koshish karenge use theek karein — yahan sab kuch saaf saaf likha hua hai.
      </motion.p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* Quick Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}
        >
          {[
            { icon: Clock,     color: '#f59e0b', bg: '#fffbeb', label: 'Wapsi ki Muddat',   value: '24 Ghante' },
            { icon: CheckCircle, color: '#16a34a', bg: '#f0fdf4', label: 'Exchange Available', value: 'Haan — Free' },
            { icon: Truck,     color: '#2563eb', bg: '#eff6ff', label: 'Delivery Charges',   value: 'Case by Case' },
            { icon: PhoneCall, color: '#c2410c', bg: '#fff7ed', label: 'Rabta Karo',         value: 'WhatsApp / Call' },
          ].map(({ icon: Icon, color, bg, label, value }) => (
            <div key={label} style={{
              background: bg, borderRadius: '16px',
              padding: '1.25rem', textAlign: 'center',
              border: `1px solid ${color}22`,
            }}>
              <Icon size={24} color={color} style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.2rem' }}>{label}</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#333' }}>{value}</div>
            </div>
          ))}
        </motion.div>

        {/* Wapsi Kab Hogi */}
        <Section icon={CheckCircle} title="Wapsi / Exchange Kab Milegi?" delay={0.18}>
          <p style={{ marginBottom: '0.75rem' }}>Yeh cases mein aap item wapas kar sakte hain ya exchange le sakte hain:</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <Bullet type="yes">Product delivery ke waqt <strong>toot hua ya crack hua</strong> mila</Bullet>
            <Bullet type="yes">Jo item order kiya tha <strong>us se alag item</strong> deliver hua</Bullet>
            <Bullet type="yes">Product mein <strong>manufacturing defect</strong> ho (andar se khaali, rang utarta ho)</Bullet>
            <Bullet type="yes">Item <strong>bilkul na chale</strong> — jaise cooler mein paani riss raha ho</Bullet>
            <Bullet type="yes">Packing itni kharab ho ke item <strong>istemal ke qabil na ho</strong></Bullet>
          </ul>
        </Section>

        {/* Wapsi Nahi Hogi */}
        <Section icon={XCircle} title="Yeh Cases Mein Wapsi Nahi Hogi" delay={0.24}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <Bullet type="no">Sirf "pasand nahi aayi" ya "rang thoda alag lag raha hai" — handmade items mein yeh normal hai</Bullet>
            <Bullet type="no">Customer ki laaparwahi se toota (girna, sakht jagah rakhna)</Bullet>
            <Bullet type="no">Care instructions na manne ki wajah se kharab hua (jaise dishwasher mein daalna)</Bullet>
            <Bullet type="no">24 ghante baad report karna — report jitni jaldi utni behtar</Bullet>
            <Bullet type="no">Original packing ke baghair wapsi ki koshish</Bullet>
            <Bullet type="no">Item use ho chuka ho ya dho diya gaya ho</Bullet>
          </ul>
        </Section>

        {/* Wapsi Ka Tareeqa */}
        <Section icon={Camera} title="Wapsi Ka Tareeqa — Step by Step" delay={0.30}>
          {[
            { step: '01', title: 'Delivery ke waqt check karein', desc: 'Item courier ke saamne hi kholein — baad mein masla hone par courier ki zimmedari bhi clear rahegi.' },
            { step: '02', title: '24 ghante mein photo bheijein', desc: `Maslay ki clear photos lein (toot, crack, wrong item) aur hamare WhatsApp par bheijein: ${settings.whatsapp}` },
            { step: '03', title: 'Hamara jawab', desc: 'Hum 12–24 ghante mein review karenge aur batayenge — replace karein ge ya courier bhej dein ge pickup ke liye.' },
            { step: '04', title: 'Replacement dispatch', desc: 'Hamare qasoor hone par replacement 2–3 working days mein bhej di jaayegi — delivery charges hamare.' },
          ].map(({ step, title, desc }) => (
            <div key={step} style={{ display: 'flex', gap: '1rem', marginBottom: '1.1rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                background: 'linear-gradient(135deg, var(--primary), #f59e0b)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.72rem', fontWeight: '800', color: 'white',
              }}>{step}</div>
              <div>
                <div style={{ fontWeight: '700', color: 'var(--secondary)', marginBottom: '0.2rem' }}>{title}</div>
                <div style={{ color: '#666', fontSize: '0.88rem' }}>{desc}</div>
              </div>
            </div>
          ))}
        </Section>

        {/* Delivery Charges */}
        <Section icon={Truck} title="Wapsi par Delivery Charges" delay={0.36}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: '#f0fdf4', borderRadius: '14px', padding: '1.25rem', border: '1px solid #bbf7d0' }}>
              <div style={{ fontWeight: '700', color: '#16a34a', marginBottom: '0.5rem' }}>✓ Hamari zimmedari</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.88rem', color: '#555' }}>
                <li style={{ marginBottom: '0.35rem' }}>▸ Galat item deliver hua</li>
                <li style={{ marginBottom: '0.35rem' }}>▸ Manufacturing defect</li>
                <li>▸ Delivery mein toot gaya</li>
              </ul>
            </div>
            <div style={{ background: '#fef2f2', borderRadius: '14px', padding: '1.25rem', border: '1px solid #fecaca' }}>
              <div style={{ fontWeight: '700', color: '#dc2626', marginBottom: '0.5rem' }}>✗ Customer ki zimmedari</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.88rem', color: '#555' }}>
                <li style={{ marginBottom: '0.35rem' }}>▸ Khud ka nuqsaan</li>
                <li style={{ marginBottom: '0.35rem' }}>▸ Size change chahiye</li>
                <li>▸ Koi aur reason</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42 }}
          style={{
            background: '#fffbeb',
            borderRadius: '16px',
            padding: '1.5rem 1.75rem',
            border: '1px solid #fde68a',
            display: 'flex', gap: '1rem', alignItems: 'flex-start',
          }}
        >
          <AlertTriangle size={22} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontWeight: '700', color: '#92400e', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
              Zaroori Baat — Clay Products ke Baare Mein
            </div>
            <p style={{ color: '#78350f', fontSize: '0.88rem', lineHeight: '1.7', margin: 0 }}>
              Mitti ke bartan naturally naazuk hote hain. Chhoti si daraar ya pori ya surface ka farq handmade hone ki nishani hai — yeh defect nahi. Lekin agar poora toot gaya ho, ya crack itna bada ho ke paani ristay, to zaroor batayein — hum help karenge.
            </p>
          </div>
        </motion.div>

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
            Masla Aa Gaya? Hum Yahan Hain
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
            WhatsApp par photo bheijein ya call karein — 12 ghante mein jawab milega.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {[
              { icon: MapPin, text: settings.address },
              { icon: Mail,   text: settings.email },
              { icon: Phone,  text: settings.phone },
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

export default WapsiPage;
