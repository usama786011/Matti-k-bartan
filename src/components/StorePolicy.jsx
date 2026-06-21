import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, Bell, Trash2, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';
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

const Bullet = ({ children }) => (
  <li style={{ marginBottom: '0.5rem', paddingLeft: '0.25rem' }}>
    <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>▸</span>{children}
  </li>
);

const PrivacyPolicy = ({ onBack }) => {
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
          <Shield size={30} color="white" />
        </div>
        <h1 style={{ fontSize: '2.2rem', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: '400', margin: '0 0 0.75rem' }}>
          Privacy Policy
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
        Riwaayat Pots mein aapka khush amdeed hai. Yeh Privacy Policy aapko batati hai ke jab aap hamari website ya store use karte hain to hum aapki kya maloomat jama karte hain, use kaise use karte hain, aur uski hifazat kaise karte hain. Hamari koshish hai ke aapki personal maloomat hamesha mehfooz rahe.
      </motion.p>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        <Section icon={Database} title="Hum Kya Maloomat Jama Karte Hain?" delay={0.12}>
          <p style={{ marginBottom: '0.75rem' }}>Jab aap hamary store se khareedte hain ya hamse rabta karte hain, hum yeh maloomat jama kar sakte hain:</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <Bullet>Naam aur rabta maloomat (phone number, email address)</Bullet>
            <Bullet>Delivery address aur sheher</Bullet>
            <Bullet>Order history aur khareedari ki tafseelat</Bullet>
            <Bullet>Product reviews jo aap khud likhte hain</Bullet>
            <Bullet>WhatsApp ya phone par ki gayi guftagoo</Bullet>
          </ul>
          <p style={{ marginTop: '0.75rem', color: '#888', fontSize: '0.85rem' }}>
            Hum aapka bank account number, credit card, ya koi banking maloomat kabhi nahi maangty — hamari sab payments cash on delivery (COD) hain.
          </p>
        </Section>

        <Section icon={Eye} title="Aapki Maloomat Kaise Use Hoti Hai?" delay={0.18}>
          <p style={{ marginBottom: '0.75rem' }}>Jama ki gayi maloomat sirf inhi maqasid ke liye use hoti hai:</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <Bullet>Aapka order process karna aur delivery confirm karna</Bullet>
            <Bullet>Delivery status ke baray mein rabta karna</Bullet>
            <Bullet>Aapke sawaalat aur shikayaat ka jawab dena</Bullet>
            <Bullet>Naye products ya offers ke baray mein aapko bataana (sirf aapki ijazat se)</Bullet>
            <Bullet>Store ko behtar banane ke liye reviews ka tajzeea karna</Bullet>
          </ul>
        </Section>

        <Section icon={Lock} title="Aapki Maloomat Kiske Saath Share Hoti Hai?" delay={0.24}>
          <p style={{ marginBottom: '0.75rem' }}>Hum aapki personal maloomat kabhi nahi bechte. Sirf zaroorat ke waqt inke saath share hoti hai:</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <Bullet>Delivery service (courier ya rider) — sirf naam aur address</Bullet>
            <Bullet>Agar qanoon ki taraf se lazim ho</Bullet>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>
            Koi bhi third-party marketing company, advertiser, ya koi baahri idara aapki maloomat nahi paata.
          </p>
        </Section>

        <Section icon={Shield} title="Maloomat Ki Hifazat" delay={0.30}>
          <p style={{ marginBottom: '0.75rem' }}>Aapki maloomat ki hifazat hamari zimmedari hai. Hum yeh iqdam karte hain:</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <Bullet>Customer data sirf authorized staff ke paas hota hai</Bullet>
            <Bullet>Phone aur WhatsApp conversations mahfooz aur private rehti hain</Bullet>
            <Bullet>Order records locally save hote hain, kisi baahri server par nahi</Bullet>
            <Bullet>Purani orders ki maloomat maqarrar waqt ke baad hata di jaati hai</Bullet>
          </ul>
        </Section>

        <Section icon={Bell} title="Cookies aur Local Storage" delay={0.36}>
          <p>
            Hamari website aapke browser ke <strong>local storage</strong> ka istemal karti hai sirf aapki cart aur reviews save karne ke liye — taake aapka data page reload hone par bhi mehfooz rahe. Koi tracking cookie ya third-party analytics tool use nahi hota.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            Aap apne browser ki settings mein jaakar kabhi bhi yeh data delete kar sakte hain.
          </p>
        </Section>

        <Section icon={Trash2} title="Aapke Huqooq" delay={0.42}>
          <p style={{ marginBottom: '0.75rem' }}>Aapko yeh haqq haasil hain:</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <Bullet>Apni maloomat dekhne ki darkhwast karna</Bullet>
            <Bullet>Ghalat maloomat durust karwana</Bullet>
            <Bullet>Apna data delete karwana</Bullet>
            <Bullet>Marketing messages se opt-out karna</Bullet>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>
            Kisi bhi haq ke liye hamse seedha rabta karein — hum 48 ghante mein jawab denge.
          </p>
        </Section>

        {/* Contact Card */}
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
          <h2 style={{ color: 'white', fontSize: '1.15rem', fontWeight: '700', marginBottom: '1.25rem' }}>
            Hamse Rabta Karein
          </h2>
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

export default PrivacyPolicy;
