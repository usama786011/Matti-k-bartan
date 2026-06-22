import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Globe, Users, PenTool, Play, Star, ChevronLeft, ChevronRight,
  ArrowRight, ShieldCheck, Truck, Gift, Mail, ArrowUpRight, Flame, ShoppingCart,
  Compass, Feather, Droplet, Sun, Wind, Camera, Send, CheckCircle
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductDetailModal from './ProductDetailModal';
import AllReviewsModal from './AllReviewsModal';

const UserStory = ({ onViewChange }) => {
  const { products, categories: dynamicCategories } = useProducts();
  const { addToCart } = useCart();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('rp_reviews');
    return saved ? JSON.parse(saved) : [];
  });
  const [reviewForm, setReviewForm] = useState({ name: '', email: '', phone: '', rating: 0, comment: '', image: null });
  const [reviewDone, setReviewDone] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const handleSubscribe = () => {
    if (emailInput.trim()) {
      setIsSubscribed(true);
      setEmailInput('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };


  const categories = [
    { name: "Handi & Pots", count: "12 Items", img: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e84?w=400&q=80" },
    { name: "Clay Cookware", count: "8 Items", img: "https://images.unsplash.com/photo-1565191999001-551c187427bb?w=400&q=80" },
    { name: "Water Pitchers", count: "5 Items", img: "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?w=400&q=80" },
    { name: "Serving Ware", count: "15 Items", img: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80" },
    { name: "Clay Glasses", count: "9 Items", img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&q=80" }
  ];

  const blogArticles = [
    {
      title: "Health Benefits of Cooking in Clay Cookware",
      desc: "Discover how alkaline clay cookware retains absolute nutrients and neutralizes food acidity naturally.",
      date: "May 15, 2026",
      readTime: "4 min read",
      img: "https://images.unsplash.com/photo-1565191999001-551c187427bb?w=600&q=80"
    },
    {
      title: "How to Properly Season Your Earthen Pots",
      desc: "Step-by-step masterclass on preparing your traditional clay handi for first-time premium cooking.",
      date: "May 10, 2026",
      readTime: "6 min read",
      img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80"
    },
    {
      title: "The Potters of Multan & Blue Clay Pottery",
      desc: "Stepping inside the historical workshops preserving five centuries of beautiful clay traditions.",
      date: "May 05, 2026",
      readTime: "8 min read",
      img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80"
    }
  ];

  const reels = [
    { title: "Throwing silt", img: "https://images.unsplash.com/photo-1565191999001-551c187427bb?w=400&q=80" },
    { title: "Hand Painting", img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&q=80" },
    { title: "Clay Firing", img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&q=80" },
    { title: "Earthen cooling", img: "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?w=400&q=80" },
    { title: "Tea in Clay", img: "https://images.unsplash.com/photo-1577937927133-66ef06ac992a?w=400&q=80" }
  ];

  return (
    <div>
      
      {/* 1. HERO BANNER */}
      <section style={{
        height: isMobile ? '60vh' : '85vh',
        minHeight: isMobile ? '420px' : 'unset',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: isMobile ? '20px' : '40px',
        margin: isMobile ? '0.75rem 0' : '1.5rem 0',
        background: 'linear-gradient(rgba(45, 26, 3, 0.55), rgba(45, 26, 3, 0.7)), url("https://images.unsplash.com/photo-1565191999001-551c187427bb?w=1600&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ padding: isMobile ? '0 1.25rem' : '0 2rem', zIndex: 2, width: '100%' }}
        >
          <span style={{
            letterSpacing: isMobile ? '3px' : '6px',
            textTransform: 'uppercase',
            fontSize: isMobile ? '0.65rem' : '0.85rem',
            fontWeight: '800',
            color: 'var(--primary-light)',
            marginBottom: isMobile ? '0.85rem' : '1.5rem',
            display: 'block'
          }}>
            🏺 Ancient Artistry • Crafted for Modern Life
          </span>
          <h1 style={{
            fontSize: isMobile ? '2rem' : '5rem',
            lineHeight: isMobile ? '1.25' : '1.1',
            fontFamily: 'var(--font-heading)',
            color: 'white',
            marginBottom: isMobile ? '1rem' : '1.75rem',
            maxWidth: isMobile ? '100%' : '950px',
            textShadow: '0 4px 15px rgba(0,0,0,0.3)',
            fontWeight: '300',
            textAlign: 'center',
            margin: '0 auto',
            marginBottom: isMobile ? '1rem' : '1.75rem',
          }}>
            Whispers of Earth,{' '}
            <span style={{ fontStyle: 'italic', fontWeight: '500', color: 'var(--primary-light)' }}>
              Molded by Hand
            </span>
          </h1>
          {!isMobile && (
            <p style={{
              maxWidth: '700px',
              margin: '0 auto 3rem',
              fontSize: '1.25rem',
              opacity: 0.95,
              fontWeight: '300',
              lineHeight: '1.8',
              color: '#f5ebe0',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}>
              Explore premium non-toxic cookware, custom serving pots, and cooling water coolers created from rich Indus Valley silt.
            </p>
          )}
          {isMobile && (
            <p style={{
              margin: '0 auto 1.5rem',
              fontSize: '0.88rem',
              opacity: 0.88,
              fontWeight: '300',
              lineHeight: '1.65',
              color: '#f5ebe0',
              maxWidth: '280px',
            }}>
              Premium handcrafted clay cookware from the Indus Valley.
            </p>
          )}
          <div style={{
            display: 'flex', gap: isMobile ? '0.75rem' : '1.5rem',
            justifyContent: 'center', flexWrap: 'wrap',
          }}>
            <button
              onClick={() => onViewChange('catalog')}
              className="btn-primary"
              style={{
                padding: isMobile ? '0.75rem 1.75rem' : '1.1rem 2.8rem',
                fontSize: isMobile ? '0.85rem' : '1rem',
                borderRadius: '100px',
                boxShadow: '0 10px 25px rgba(194, 65, 12, 0.4)'
              }}
            >
              Explore Collection <ArrowRight size={isMobile ? 15 : 18} />
            </button>
            {!isMobile && (
              <button
                onClick={() => {
                  const doc = document.getElementById('heritage-section');
                  if (doc) doc.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  padding: '1.1rem 2.8rem',
                  fontSize: '1rem',
                  color: 'white',
                  border: '1.5px solid rgba(255, 255, 255, 0.4)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '100px',
                  backdropFilter: 'blur(10px)',
                  fontWeight: '600'
                }}
              >
                Discover Heritage
              </button>
            )}
          </div>
        </motion.div>

        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: isMobile ? '50px' : '80px',
          background: 'linear-gradient(to top, var(--background), transparent)', zIndex: 1
        }} />
      </section>

      {/* 2. VALUE HIGHLIGHTS BAR */}
      <section style={{ margin: '5rem 0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {[
            { icon: <Truck size={24} />, title: "Free Safe Delivery", desc: "Across Pakistan on orders above Rs. 3,000" },
            { icon: <ShieldCheck size={24} />, title: "100% Lead-Free & Organic", desc: "No harmful chemical glazes or toxins, completely natural" },
            { icon: <Gift size={24} />, title: "Support Local Families", desc: "Directly helping heritage potter communities survive" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.25rem',
                padding: '1.75rem',
                background: 'rgba(255, 255, 255, 0.5)',
                border: '1px dashed rgba(194, 65, 12, 0.15)',
                borderRadius: '24px'
              }}
            >
              <div style={{
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {item.icon}
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.2rem', fontWeight: '700', color: 'var(--secondary)' }}>{item.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

  

      {/* 6. DYNAMIC CATEGORY GRIDS */}
      {dynamicCategories && dynamicCategories.map((category, idx) => {
        const categoryProducts = products.filter(p => p.category === category);
        if (categoryProducts.length === 0) return null;

        const displayProducts = categoryProducts.slice(0, 5);
        const hasMore = categoryProducts.length > 5;

        return (
          <section key={category} style={{ marginBottom: '8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4.5rem' }}>
              <div>
                {/* <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase' }}>Curated Selection</span> */}
                <h2 style={{ fontSize: '3rem', marginTop: '0.5rem' }}>{category}</h2>
              </div>
              {hasMore && (
                <button
                  onClick={() => onViewChange('catalog', category)}
                  className="btn-secondary"
                  style={{ borderRadius: '100px' }}
                >
                  View All Products <ArrowRight size={16} />
                </button>
              )}
            </div>

            <div className="product-grid-responsive">
              {displayProducts.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.7 }}
                  className="premium-card"
                  style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' }}
                  onClick={() => setSelectedProduct(item)}
                >
                  <div style={{ position: 'relative', height: '165px', overflow: 'hidden', background: '#f5f5f5', flexShrink: 0 }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                      className="product-image"
                    />
                  </div>
                  <div style={{ padding: '0.9rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '0.92rem', marginBottom: '0.3rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h3>
                      {item.description && (
                        <p style={{
                          color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: '1.45', marginBottom: '0.45rem',
                          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                        }}>
                          {item.description}
                        </p>
                      )}
                      <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--primary)', display: 'block' }}>
                        Rs. {item.price.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                      }}
                      style={{
                        width: '100%', padding: '0.6rem',
                        fontSize: '0.8rem', fontWeight: '700',
                        justifyContent: 'center', borderRadius: '10px',
                        background: 'linear-gradient(135deg, var(--primary), #e55a00)',
                        color: 'white', border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                        boxShadow: '0 3px 10px rgba(194,65,12,0.22)',
                      }}
                    >
                      <ShoppingCart size={13} /> Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        );
      })}


    
      {/* 9. SIGNATURE SPOTLIGHT: MITTI KA COOLER */}
      <section style={{ marginBottom: '8rem' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{
            height: '60vh',
            borderRadius: '40px',
            overflow: 'hidden',
            position: 'relative',
            background: 'linear-gradient(90deg, rgba(69, 26, 3, 0.85) 30%, rgba(69, 26, 3, 0.2)), url("https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?w=1600&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            padding: '5rem',
            color: 'white',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div style={{ maxWidth: '500px' }}>
            <span style={{
              background: 'var(--primary)',
              color: 'white',
              padding: '0.4rem 0.9rem',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '1.25rem'
            }}>Summer Signature Dispenser</span>
            <h2 style={{ fontSize: '3.6rem', color: 'white', marginBottom: '1rem', lineHeight: '1.1' }}>Mitti Ka Cooler</h2>
            <p style={{ opacity: 0.9, fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: '1.7' }}>
              Keep your water ice-cold naturally! Our iconic 12-Liter clay water cooler uses porous cooling technology to reduce temperature up to 10°C organically without electricity.
            </p>
            <button
              onClick={() => onViewChange('catalog')}
              className="btn-primary"
              style={{ padding: '1rem 2.25rem', fontSize: '0.95rem' }}
            >
              Shop Dispenser Now <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* 11. CUSTOMER REVIEWS */}
      <section style={{ marginBottom: '2rem' }}>

        {/* ── Section Header ── */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '2.5rem' : '3.5rem' }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(194,65,12,0.08)', color: 'var(--primary)',
            padding: '0.35rem 1rem', borderRadius: '20px',
            fontSize: '0.75rem', fontWeight: '700', letterSpacing: '2px',
            textTransform: 'uppercase', marginBottom: '1rem',
          }}>
            ⭐ Customer Stories
          </span>
          <h2 style={{ fontSize: isMobile ? '1.9rem' : '3rem', marginTop: '0', marginBottom: '0.5rem' }}>
            What Our Customers Say
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: isMobile ? '0.88rem' : '1rem', maxWidth: '500px', margin: '0 auto' }}>
            Real experiences from people who brought our clay crafts home.
          </p>
        </div>

        {/* ── Rating Stats Bar (shown only when reviews exist) ── */}
        {reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex', alignItems: 'center', gap: isMobile ? '1.25rem' : '2.5rem',
              background: 'linear-gradient(135deg, #2d1800 0%, #1a0f00 100%)',
              borderRadius: '20px', padding: isMobile ? '1.25rem 1.5rem' : '1.75rem 2.5rem',
              marginBottom: isMobile ? '2rem' : '3rem',
              flexWrap: 'wrap',
            }}
          >
            {/* Big avg number */}
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{
                fontSize: isMobile ? '3rem' : '4rem', fontWeight: '800',
                color: '#f59e0b', lineHeight: 1, fontFamily: 'var(--font-heading)',
              }}>
                {(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)}
              </div>
              <div style={{ display: 'flex', gap: '3px', justifyContent: 'center', marginTop: '0.4rem' }}>
                {[1,2,3,4,5].map(n => (
                  <Star key={n} size={isMobile ? 13 : 16}
                    fill={n <= Math.round(reviews.reduce((s,r) => s+r.rating,0)/reviews.length) ? '#f59e0b' : '#4b3010'}
                    color={n <= Math.round(reviews.reduce((s,r) => s+r.rating,0)/reviews.length) ? '#f59e0b' : '#4b3010'} />
                ))}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', marginTop: '0.3rem' }}>
                {reviews.length} reviews
              </div>
            </div>

            {/* Divider */}
            <div style={{ width: '1px', height: '70px', background: 'rgba(255,255,255,0.1)', flexShrink: 0, display: isMobile ? 'none' : 'block' }} />

            {/* Star breakdown */}
            <div style={{ flex: 1, minWidth: isMobile ? '100%' : '200px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[5,4,3,2,1].map(n => {
                const count = reviews.filter(r => r.rating === n).length;
                const pct = reviews.length ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', width: '8px', textAlign: 'right', flexShrink: 0 }}>{n}</span>
                    <Star size={10} fill="#f59e0b" color="#f59e0b" style={{ flexShrink: 0 }} />
                    <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '10px', overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: 'easeOut', delay: (5 - n) * 0.07 }}
                        style={{ height: '100%', background: 'linear-gradient(90deg, #f59e0b, #d97706)', borderRadius: '10px' }}
                      />
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', width: '16px', flexShrink: 0 }}>{count}</span>
                  </div>
                );
              })}
            </div>

            {/* Total badge */}
            <div style={{ textAlign: 'center', flexShrink: 0, display: isMobile ? 'none' : 'block' }}>
              <div style={{
                background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.25)',
                borderRadius: '14px', padding: '0.75rem 1.25rem',
              }}>
                <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#f59e0b', lineHeight: 1 }}>{reviews.length}</div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', marginTop: '0.2rem' }}>Total Reviews</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Main Grid: Reviews + Form ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '1.5rem' : '2.5rem',
          alignItems: 'start',
        }}>

          {/* ── LEFT: Review Cards ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', order: isMobile ? 2 : 1 }}>

            {reviews.length === 0 ? (
              <div style={{
                textAlign: 'center', padding: '4rem 1.5rem',
                background: 'white', borderRadius: '24px',
                border: '2px dashed rgba(194,65,12,0.12)',
              }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '20px',
                  background: 'rgba(194,65,12,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}>
                  <Star size={28} color="var(--primary)" strokeWidth={1.5} />
                </div>
                <h4 style={{ fontSize: '1rem', color: 'var(--secondary)', marginBottom: '0.4rem' }}>
                  Abhi tak koi review nahi
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Pehli review likhein aur doosron ki rahnumai karein!
                </p>
              </div>
            ) : (
              <>
                <AnimatePresence>
                  {[...reviews].reverse().slice(0, 5).map((r, idx) => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: idx * 0.06 }}
                      style={{
                        background: 'white', borderRadius: '20px',
                        padding: isMobile ? '1.1rem' : '1.4rem 1.5rem',
                        border: '1px solid rgba(194,65,12,0.07)',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                        position: 'relative', overflow: 'hidden',
                      }}
                    >
                      {/* Accent top strip */}
                      <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                        background: r.rating >= 4
                          ? 'linear-gradient(90deg, #f59e0b, #d97706)'
                          : r.rating === 3
                          ? 'linear-gradient(90deg, #94a3b8, #64748b)'
                          : 'linear-gradient(90deg, #f87171, #ef4444)',
                      }} />

                      {/* Big quote mark */}
                      <div style={{
                        position: 'absolute', top: '10px', right: '14px',
                        fontSize: '4rem', lineHeight: 1, color: 'rgba(194,65,12,0.06)',
                        fontFamily: 'Georgia, serif', fontWeight: '900', userSelect: 'none',
                      }}>"</div>

                      <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                        {/* Avatar */}
                        {r.image ? (
                          <img src={r.image} alt={r.name} style={{
                            width: isMobile ? '42px' : '50px',
                            height: isMobile ? '42px' : '50px',
                            borderRadius: '14px', objectFit: 'cover', flexShrink: 0,
                            border: '2px solid rgba(194,65,12,0.1)',
                          }} />
                        ) : (
                          <div style={{
                            width: isMobile ? '42px' : '50px',
                            height: isMobile ? '42px' : '50px',
                            borderRadius: '14px', flexShrink: 0,
                            background: `linear-gradient(135deg, hsl(${(r.name.charCodeAt(0)*37)%360},55%,82%), hsl(${(r.name.charCodeAt(0)*37)%360},55%,70%))`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: '800', fontSize: '1.15rem',
                            color: `hsl(${(r.name.charCodeAt(0)*37)%360},55%,28%)`,
                          }}>
                            {r.name.charAt(0).toUpperCase()}
                          </div>
                        )}

                        <div style={{ flex: 1, minWidth: 0 }}>
                          {/* Name + date row */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.35rem' }}>
                            <div>
                              <span style={{ fontWeight: '800', fontSize: isMobile ? '0.9rem' : '0.95rem', color: 'var(--secondary)', display: 'block' }}>
                                {r.name}
                              </span>
                            </div>
                            <span style={{
                              fontSize: '0.7rem', color: 'var(--text-muted)',
                              whiteSpace: 'nowrap', flexShrink: 0,
                              background: '#f8f8f8', padding: '0.2rem 0.6rem',
                              borderRadius: '20px',
                            }}>
                              {r.date}
                            </span>
                          </div>

                          {/* Stars */}
                          <div style={{ display: 'flex', gap: '2px', marginBottom: '0.6rem', alignItems: 'center' }}>
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={isMobile ? 12 : 14}
                                fill={i < r.rating ? '#f59e0b' : '#e5e7eb'}
                                color={i < r.rating ? '#f59e0b' : '#e5e7eb'} />
                            ))}
                            <span style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: '700', marginLeft: '4px' }}>
                              {r.rating}.0
                            </span>
                          </div>

                          {/* Comment */}
                          <p style={{
                            fontSize: isMobile ? '0.83rem' : '0.88rem',
                            color: '#555', lineHeight: '1.7', margin: 0,
                            fontStyle: 'italic',
                          }}>
                            "{r.comment}"
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {reviews.length > 5 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAllReviews(true)}
                    style={{
                      width: '100%', padding: '1rem',
                      borderRadius: '16px',
                      border: '2px solid rgba(194,65,12,0.15)',
                      background: 'white', color: 'var(--primary)',
                      fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.borderColor = 'rgba(194,65,12,0.15)'; }}
                  >
                    <Star size={15} /> Read All {reviews.length} Reviews
                  </motion.button>
                )}
              </>
            )}
          </div>

          {/* ── RIGHT: Submit Review Form ── */}
          <div style={{
            background: 'white', borderRadius: '24px',
            padding: isMobile ? '1.5rem' : '2rem',
            border: '1px solid rgba(194,65,12,0.08)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
            order: isMobile ? 1 : 2,
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.35rem', color: 'var(--secondary)' }}>Share Your Experience</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Your review helps others discover authentic clay crafts.
            </p>

            <div>
              <AnimatePresence mode="wait">
                {reviewDone ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      textAlign: 'center', padding: '2.5rem 1rem',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
                    }}
                  >
                    <div style={{
                      width: '72px', height: '72px', borderRadius: '50%',
                      background: 'rgba(34,197,94,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <CheckCircle size={36} color="var(--success)" strokeWidth={1.5} />
                    </div>
                    <h4 style={{ fontSize: '1.2rem', color: 'var(--secondary)', margin: '0.5rem 0 0.25rem' }}>Shukriya!</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '220px', lineHeight: '1.6' }}>
                      Aapka review post ho gaya. Jazak Allah Khair!
                    </p>
                    <button
                      onClick={() => { setReviewDone(false); setReviewForm({ name: '', email: '', phone: '', rating: 0, comment: '', image: null }); }}
                      style={{
                        marginTop: '0.75rem', padding: '0.7rem 1.75rem',
                        borderRadius: '100px', border: 'none', cursor: 'pointer',
                        background: 'linear-gradient(135deg, var(--primary), #e55a00)',
                        color: 'white', fontWeight: '700', fontSize: '0.88rem',
                        boxShadow: '0 4px 14px rgba(194,65,12,0.25)',
                      }}
                    >
                      Aur Likhein
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      const hasContact = reviewForm.email.trim() || reviewForm.phone.trim();
                      if (!reviewForm.name.trim() || !reviewForm.comment.trim() || !hasContact || reviewForm.rating === 0) return;
                      const newReview = {
                        id: Date.now(),
                        name: reviewForm.name.trim(),
                        email: reviewForm.email.trim(),
                        phone: reviewForm.phone.trim(),
                        rating: reviewForm.rating,
                        comment: reviewForm.comment.trim(),
                        image: reviewForm.image,
                        date: new Date().toLocaleString('en-PK', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
                      };
                      const updated = [...reviews, newReview];
                      setReviews(updated);
                      localStorage.setItem('rp_reviews', JSON.stringify(updated));
                      setReviewDone(true);
                    }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}
                  >
                    {/* Star Rating */}
                    <div style={{
                      background: '#fafaf9', borderRadius: '14px',
                      padding: '1rem 1.1rem',
                      border: '1.5px solid',
                      borderColor: reviewForm.rating > 0 ? 'rgba(245,158,11,0.3)' : '#f0f0f0',
                    }}>
                      <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--secondary)', display: 'block', marginBottom: '0.6rem' }}>
                        Rating *{' '}
                        {reviewForm.rating === 0 && <span style={{ color: '#f87171', fontWeight: '500' }}>— zaroor select karein</span>}
                        {reviewForm.rating > 0 && <span style={{ color: '#f59e0b', fontWeight: '600' }}>— {['','Bekar','Kharab','Theek Hai','Acha','Zabardast!'][reviewForm.rating]}</span>}
                      </label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {[1,2,3,4,5].map(n => (
                          <button key={n} type="button"
                            onClick={() => setReviewForm(f => ({ ...f, rating: n }))}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', transition: 'transform 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                          >
                            <Star size={30}
                              fill={n <= reviewForm.rating ? '#f59e0b' : '#e5e7eb'}
                              color={n <= reviewForm.rating ? '#f59e0b' : '#e5e7eb'} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--secondary)', display: 'block', marginBottom: '0.4rem' }}>
                        Aapka Naam *
                      </label>
                      <input type="text" required
                        value={reviewForm.name}
                        onChange={e => setReviewForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Mثلاً: Fatima Khan"
                        style={{
                          width: '100%', padding: '0.8rem 1rem', borderRadius: '12px',
                          border: '1.5px solid #eee', background: '#fafafa',
                          fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box',
                          transition: 'border-color 0.2s',
                        }}
                        onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                        onBlur={e => e.target.style.borderColor = '#eee'}
                      />
                    </div>

                    {/* Contact */}
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--secondary)', display: 'block', marginBottom: '0.4rem' }}>
                        Contact <span style={{ color: '#f87171', fontWeight: '500', fontSize: '0.73rem' }}>* kam az kam ek zaroori</span>
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                        <input type="email"
                          value={reviewForm.email}
                          onChange={e => setReviewForm(f => ({ ...f, email: e.target.value }))}
                          placeholder="Email"
                          style={{
                            padding: '0.8rem 1rem', borderRadius: '12px',
                            border: '1.5px solid #eee', background: '#fafafa',
                            fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box',
                            transition: 'border-color 0.2s',
                          }}
                          onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                          onBlur={e => e.target.style.borderColor = '#eee'}
                        />
                        <input type="tel"
                          value={reviewForm.phone}
                          onChange={e => setReviewForm(f => ({ ...f, phone: e.target.value }))}
                          placeholder="Phone"
                          style={{
                            padding: '0.8rem 1rem', borderRadius: '12px',
                            border: '1.5px solid #eee', background: '#fafafa',
                            fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box',
                            transition: 'border-color 0.2s',
                          }}
                          onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                          onBlur={e => e.target.style.borderColor = '#eee'}
                        />
                      </div>
                    </div>

                    {/* Comment */}
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--secondary)', display: 'block', marginBottom: '0.4rem' }}>
                        Aapka Tajruba *
                      </label>
                      <textarea required rows={4}
                        value={reviewForm.comment}
                        onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))}
                        placeholder="Product kaisa laga? Quality, delivery, overall experience..."
                        style={{
                          width: '100%', padding: '0.8rem 1rem', borderRadius: '12px',
                          border: '1.5px solid #eee', background: '#fafafa',
                          fontSize: '0.87rem', outline: 'none', resize: 'vertical',
                          fontFamily: 'inherit', lineHeight: '1.65', boxSizing: 'border-box',
                          transition: 'border-color 0.2s',
                        }}
                        onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                        onBlur={e => e.target.style.borderColor = '#eee'}
                      />
                    </div>

                    {/* Photo */}
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--secondary)', display: 'block', marginBottom: '0.4rem' }}>
                        Photo <span style={{ color: 'var(--text-muted)', fontWeight: '400' }}>(optional)</span>
                      </label>
                      <label style={{
                        display: 'flex', alignItems: 'center', gap: '0.65rem',
                        padding: '0.8rem 1rem', borderRadius: '12px',
                        border: `1.5px dashed ${reviewForm.image ? 'var(--primary)' : '#ddd'}`,
                        background: reviewForm.image ? 'rgba(194,65,12,0.04)' : '#fafafa',
                        cursor: 'pointer', fontSize: '0.85rem',
                        color: reviewForm.image ? 'var(--primary)' : 'var(--text-muted)',
                        transition: 'all 0.2s',
                      }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = reviewForm.image ? 'var(--primary)' : '#ddd'}
                      >
                        <Camera size={16} color="var(--primary)" />
                        {reviewForm.image ? '✓ Photo selected' : 'Product ki photo upload karein'}
                        <input type="file" accept="image/*" hidden
                          onChange={e => {
                            const file = e.target.files[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = ev => setReviewForm(f => ({ ...f, image: ev.target.result }));
                            reader.readAsDataURL(file);
                          }}
                        />
                      </label>
                    </div>

                    {/* Submit */}
                    <button type="submit" style={{
                      width: '100%', padding: '1rem',
                      borderRadius: '14px', border: 'none', cursor: 'pointer',
                      background: 'linear-gradient(135deg, var(--primary), #e55a00)',
                      color: 'white', fontWeight: '700', fontSize: '0.95rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: '0.5rem', boxShadow: '0 8px 24px rgba(194,65,12,0.3)',
                      transition: 'all 0.2s', marginTop: '0.25rem',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(194,65,12,0.4)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(194,65,12,0.3)'; }}
                    >
                      <Send size={16} /> Review Post Karein
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
          </div>
        </div>
      </section>


      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {showAllReviews && (
        <AllReviewsModal
          reviews={reviews}
          onClose={() => setShowAllReviews(false)}
        />
      )}
    </div>
  );
};

export default UserStory;
