import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Globe, Users, PenTool, Play, Star, ChevronLeft, ChevronRight,
  ArrowRight, ShieldCheck, Truck, Gift, Mail, ArrowUpRight, Flame, ShoppingCart,
  Compass, Feather, Droplet, Sun, Wind
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductDetailModal from './ProductDetailModal';

const UserStory = ({ onViewChange }) => {
  const { products, categories: dynamicCategories } = useProducts();
  const { addToCart } = useCart();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  // Testimonials state
  const testimonials = [
    {
      name: "Amina Rafique",
      role: "Home Chef, Lahore",
      review: "Khaane ka maza hi badal gaya! The clay handi gives a distinct earthy aroma and rich taste that you can never get in metal pans. Absolute love!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80"
    },
    {
      name: "Dr. Farhan Jameel",
      role: "Nutritionist, Islamabad",
      review: "Clay cookware naturally neutralizes the pH balance of food because of its alkaline nature. Highly recommend it to anyone seeking pure, healthy cooking.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80"
    },
    {
      name: "Zainab Multan",
      role: "Traditional Art Collector",
      review: "The craftsmanship is top-notch. These hand-painted designs represent the ancient Indus Valley history beautifully. Adds so much character to my kitchen.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80"
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

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
    <div style={{ paddingBottom: '3rem' }}>
      
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
            fontWeight: '300'
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

      {/* 11. TESTIMONIALS SLIDER */}
      <section style={{ marginBottom: '8rem' }}>
        <div className="glass-morphism" style={{ padding: '3rem 2rem', background: 'white', overflow: 'hidden', position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase' }}>Stories of Joy</span>
            <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>What People Are Saying</h2>
          </div>

          <div style={{ position: 'relative', minHeight: '180px', maxWidth: '650px', margin: '0 auto', textAlign: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.2rem', marginBottom: '1.5rem' }}>
                  {[...Array(testimonials[activeSlide].rating)].map((_, i) => (
                     <Star key={i} size={20} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p style={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: '1.6', color: 'var(--secondary)', marginBottom: '2rem' }}>
                  "{testimonials[activeSlide].review}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.2rem' }}>
                  <img
                    src={testimonials[activeSlide].avatar}
                    alt={testimonials[activeSlide].name}
                    style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-light)' }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{testimonials[activeSlide].name}</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{testimonials[activeSlide].role}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            <button
              onClick={() => setActiveSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--secondary)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary-light)'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#f5f5f5'}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setActiveSlide((prev) => (prev + 1) % testimonials.length)}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--secondary)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary-light)'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#f5f5f5'}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>


      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default UserStory;
