import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Globe, Users, PenTool, Play, Star, ChevronLeft, ChevronRight,
  ArrowRight, ShieldCheck, Truck, Gift, Mail, ArrowUpRight, Flame, ShoppingCart,
  Compass, Feather, Droplet, Sun, Wind
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const UserStory = ({ onViewChange }) => {
  const { products, categories: dynamicCategories } = useProducts();
  const { addToCart } = useCart();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

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
        height: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '40px',
        margin: '1.5rem 0',
        background: 'linear-gradient(rgba(45, 26, 3, 0.52), rgba(45, 26, 3, 0.65)), url("https://images.unsplash.com/photo-1565191999001-551c187427bb?w=1600&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ padding: '0 2rem', zIndex: 2 }}
        >
          <span style={{
            letterSpacing: '6px',
            textTransform: 'uppercase',
            fontSize: '0.85rem',
            fontWeight: '800',
            color: 'var(--primary-light)',
            marginBottom: '1.5rem',
            display: 'block'
          }}>
            🏺 Ancient Artistry • Crafted for Modern Life
          </span>
          <h1 style={{
            fontSize: '5rem',
            lineHeight: '1.1',
            fontFamily: 'var(--font-heading)',
            color: 'white',
            marginBottom: '1.75rem',
            maxWidth: '950px',
            textShadow: '0 4px 15px rgba(0,0,0,0.3)',
            fontWeight: '300'
          }}>
            Whispers of Earth, <span style={{ fontStyle: 'italic', fontWeight: '500', color: 'var(--primary-light)' }}>Molded by Hand</span>
          </h1>
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
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onViewChange('catalog')}
              className="btn-primary"
              style={{
                padding: '1.1rem 2.8rem',
                fontSize: '1rem',
                borderRadius: '100px',
                boxShadow: '0 10px 25px rgba(194, 65, 12, 0.4)'
              }}
            >
              Explore Collection <ArrowRight size={18} />
            </button>
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
          </div>
        </motion.div>
        
        {/* Organic wavy decorative lines */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
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

      {/* 3. HERITAGE & STORIES: THE STORY BEHIND EACH PIECE */}
      <section id="heritage-section" style={{ padding: '6rem 0', marginBottom: '6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '5rem', alignItems: 'center' }}>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '4px', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
              The Soul of the Mud
            </span>
            <h2 style={{ fontSize: '3.2rem', lineHeight: '1.2', marginBottom: '2rem', fontWeight: '300' }}>
              The Story Behind <br/>
              <span style={{ fontStyle: 'italic', fontWeight: '500', color: 'var(--primary)' }}>Every Sacred Vessel</span>
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              Every Riwaayat pot begins its journey as pure, wet silt gathered from the banks of the legendary Indus River. Cleaned, kneaded, and tempered, this rich soil has nourished civilization for millennia.
            </p>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.8' }}>
              When you cook or drink from earthenware, you are not just using a vessel—you are engaging in a timeless ritual that links you to our soil, preserves nutritional value, and adds a authentic sweet taste to life.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '1.5rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--secondary)', marginBottom: '0.25rem' }}>Indus Silt Clay</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Rich, mineral-heavy clay soil harvested organically.</p>
              </div>
              <div style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '1.5rem' }}>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--secondary)', marginBottom: '0.25rem' }}>Organic Cooling</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Micro-pores allow natural perspiration and cooling.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative' }}
          >
            {/* Visual presentation */}
            <div style={{
              position: 'relative',
              borderRadius: '40px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <img
                src="https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?w=800&q=80"
                alt="Clay vessels beautifully arranged in rural village workshop"
                style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(69,26,3,0.7) 10%, transparent 60%)'
              }} />
              
              <div style={{
                position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem',
                color: 'white'
              }}>
                <h5 style={{ color: '#fff9f5', fontSize: '1.25rem', fontFamily: 'var(--font-heading)', marginBottom: '0.25rem' }}>Indus Water Pitcher</h5>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>Individually thrown, sun-baked, and wood-fired.</p>
              </div>
            </div>

            {/* Circular Stamp */}
            <div style={{
              position: 'absolute', top: '-1.5rem', right: '-1.5rem',
              width: '100px', height: '100px', borderRadius: '50%',
              background: 'var(--secondary)', color: 'var(--primary-light)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'var(--shadow-md)', border: '2px solid var(--primary)',
              textAlign: 'center', padding: '0.5rem', transform: 'rotate(12deg)'
            }}>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '1px' }}>100%</span>
              <span style={{ fontSize: '0.9rem', fontWeight: '700', fontFamily: 'var(--font-heading)' }}>Organic</span>
              <span style={{ fontSize: '0.65rem', color: '#ccc' }}>Heritage</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. NATURAL ELEMENTS SECTION: EARTH, WATER, AIR, FIRE */}
      <section style={{ background: '#f5ebe0', borderRadius: '40px', margin: '2rem 0 6rem', padding: '4.5rem 3rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 4.5rem' }}>
          <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.82rem', letterSpacing: '4px', textTransform: 'uppercase' }}>Four Pillars of Creation</span>
          <h2 style={{ fontSize: '3rem', marginTop: '0.5rem', color: 'var(--secondary)' }}>Woven from the Elements</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '0.75rem' }}>Our pottery represents a pure synthesis of nature's four forces. Simple, clean, and completely devoid of artificial chemicals.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem' }}>
          {[
            { icon: <Compass size={24} />, title: "Mitti (Earth)", desc: "Fine riverbed clay containing natural silica, magnesium, and essential minerals." },
            { icon: <Droplet size={24} />, title: "Pani (Water)", desc: "Used to knead the dry earth, enabling the plastic molding of clay shapes." },
            { icon: <Wind size={24} />, title: "Hawa (Air)", desc: "Sun-drying slowly under warm open skies to extract raw moisture." },
            { icon: <Flame size={24} />, title: "Aag (Fire)", desc: "Ancient wood-fired kiln bake at 1000°C to lock strength into clay pores." }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
              style={{
                background: 'white',
                padding: '2.25rem 2rem',
                borderRadius: '30px',
                boxShadow: 'var(--shadow-sm)',
                textAlign: 'center'
              }}
            >
              <div style={{
                color: 'var(--primary)',
                background: '#fff3e0',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--secondary)' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. TOP CATEGORIES SECTION */}
      <section style={{ marginBottom: '8rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase' }}>Browse Curated Collections</span>
          <h2 style={{ fontSize: '3rem', marginTop: '0.5rem' }}>Top Categories</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '2rem',
          textAlign: 'center'
        }}>
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              style={{ cursor: 'pointer' }}
              onClick={() => onViewChange('catalog')}
            >
              <div className="category-circle">
                <img
                  src={cat.img}
                  alt={cat.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                />
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.2rem' }}>{cat.name}</h4>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{cat.count}</span>
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
                <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase' }}>Curated Selection</span>
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
                  onClick={() => onViewChange('catalog', category)}
                >
                  <div style={{ position: 'relative', height: '280px', overflow: 'hidden', background: '#f5f5f5', flexShrink: 0 }}>
                    <span style={{
                      position: 'absolute',
                      top: '1.25rem',
                      left: '1.25rem',
                      background: 'var(--accent)',
                      color: 'white',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      zIndex: 2
                    }}>
                      {item.category}
                    </span>
                    <span style={{
                      position: 'absolute',
                      top: '1.25rem',
                      right: '1.25rem',
                      background: 'var(--primary)',
                      color: 'white',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      zIndex: 2
                    }}>
                      {item.quantity} In Stock
                    </span>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                      className="product-image"
                    />
                  </div>
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flexGrow: 1, justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h3>
                      <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                        Rs. {item.price.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                      }}
                      className="btn-primary"
                      style={{
                        width: '100%',
                        padding: '0.65rem 1rem',
                        fontSize: '0.85rem',
                        justifyContent: 'center',
                        borderRadius: '12px',
                        marginTop: '0.5rem',
                        boxShadow: '0 4px 10px rgba(194, 65, 12, 0.15)'
                      }}
                    >
                      <ShoppingCart size={15} /> Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        );
      })}

      {/* 7. ARTISAN CRAFTSMANSHIP: THE HANDS OF ANCIENT WISDOM */}
      <section style={{ padding: '6rem 0', marginBottom: '6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.94fr 1.06fr', gap: '6rem', alignItems: 'center' }}>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative' }}
          >
            <img
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80"
              alt="An elder artisan potter molding wet clay on a rotating wooden wheel"
              style={{ width: '100%', height: '480px', objectFit: 'cover', borderRadius: '35px', boxShadow: 'var(--shadow-lg)' }}
            />
            
            <div className="glass-morphism" style={{
              position: 'absolute',
              bottom: '-2rem',
              right: '-2rem',
              background: 'white',
              padding: '2rem',
              maxWidth: '300px',
              borderLeft: '5px solid var(--primary)',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <p style={{ fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--secondary)', fontWeight: '600', lineHeight: '1.5' }}>
                "We shape the clay, and in return, the clay preserves our heritage and feeds our children."
              </p>
              <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                — Chacha Hameed, Master Potter (40+ Years Crafting)
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '4px', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
              Hands of Heritage
            </span>
            <h2 style={{ fontSize: '3.2rem', lineHeight: '1.2', marginBottom: '2rem', fontWeight: '300' }}>
              Crafted by Families, <br/>
              <span style={{ fontStyle: 'italic', fontWeight: '500', color: 'var(--primary)' }}>Sustained by You</span>
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              Unlike mass-manufactured steel and plastic items, each Riwaayat vessel takes up to 7 days to finalize. Our pots are molded manually by master artisans who inherited the wheel from their fathers.
            </p>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.8' }}>
              By choosing Riwaayat, you are actively bringing fair-wages, recognition, and sustainable livelihood directly to the remote artisan cottages of Hala, Multan, and rural Punjab.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Users style={{ color: 'var(--primary)' }} size={24} />
                <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--secondary)' }}>35+ Artisan Partners</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Feather style={{ color: 'var(--accent)' }} size={24} />
                <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--secondary)' }}>100% Hand-Molded Art</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 8. BUNDLES & SETS */}
      <section style={{ marginBottom: '8rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase' }}>Value Bundles</span>
          <h2 style={{ fontSize: '3rem', marginTop: '0.5rem' }}>Bundles and Sets</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          {[
            {
              name: "Summer Cooler Bundle",
              desc: "Traditional Mitti Ka Jug, 4 Hand-Crafted Clay Glasses, and custom cooling base pot.",
              price: 3200,
              original: 3800,
              img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80",
              tag: "Best Seller"
            },
            {
              name: "Complete Handi Cooking Set",
              desc: "3 differently sized heavy-silt cooking Handis with seasoned matching clay lids.",
              price: 9500,
              original: 11000,
              img: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e84?w=800&q=80",
              tag: "15% OFF"
            }
          ].map((bundle, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.7 }}
              className="premium-card"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ position: 'relative', height: '320px' }}>
                <span style={{
                  position: 'absolute',
                  top: '1.5rem',
                  left: '1.5rem',
                  background: 'var(--secondary)',
                  color: 'white',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                  zIndex: 2
                }}>{bundle.tag}</span>
                <img
                  src={bundle.img}
                  alt={bundle.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>{bundle.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>{bundle.desc}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>Rs. {bundle.price.toLocaleString()}</span>
                    <span style={{ fontSize: '1.05rem', color: '#999', textDecoration: 'line-through', marginLeft: '0.8rem' }}>Rs. {bundle.original.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => onViewChange('catalog')}
                    className="btn-primary"
                    style={{ padding: '0.8rem 1.6rem' }}
                  >
                    Buy Bundle <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

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

      {/* 10. SOCIAL REELS GRID */}
      <section style={{ marginBottom: '8rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase' }}>Riwaayat Pots Art In Motion</span>
          <h2 style={{ fontSize: '3rem', marginTop: '0.5rem' }}>Crafting Behind The Scenes</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '1.5rem'
        }}>
          {reels.map((reel, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              style={{
                height: '350px',
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)'
              }}
              whileHover={{ scale: 1.04 }}
            >
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(transparent 60%, rgba(45, 26, 3, 0.8))',
                zIndex: 1
              }} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.9)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}>
                <Play size={18} fill="var(--primary)" style={{ marginLeft: '2px' }} />
              </div>
              <img
                src={reel.img}
                alt={reel.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                color: 'white',
                fontWeight: '700',
                fontSize: '1rem',
                zIndex: 2
              }}>{reel.title}</span>
            </motion.div>
          ))}
        </div>
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

      {/* 12. BLOGS & STORIES */}
      <section style={{ marginBottom: '8rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5rem' }}>
          <div>
            <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase' }}>Artisan Knowledge</span>
            <h2 style={{ fontSize: '3rem', marginTop: '0.5rem' }}>Blogs and Clay Stories</h2>
          </div>
          <button
            className="btn-secondary"
            style={{ borderRadius: '100px' }}
          >
            Read All Articles <ArrowUpRight size={16} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
          {blogArticles.map((article, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.7 }}
              className="premium-card"
              style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <div style={{ height: '220px', overflow: 'hidden' }}>
                <img
                  src={article.img}
                  alt={article.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.8rem', lineHeight: '1.4' }}>{article.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>{article.desc}</p>
                </div>
                <button
                  style={{
                    color: 'var(--primary)',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    marginTop: '1.5rem',
                    alignSelf: 'flex-start'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--primary)'}
                >
                  Read Story <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 13. NEWSLETTER SIGNUP */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-morphism"
          style={{
            background: 'linear-gradient(135deg, white, var(--primary-light))',
            padding: '5rem 4rem',
            textAlign: 'center',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div style={{ maxWidth: '650px', margin: '0 auto' }}>
            <div style={{
              background: 'white',
              width: '60px',
              height: '60px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: 'var(--primary)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <Mail size={28} />
            </div>
            <h2 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>Subscribe to our Newsletter</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: '1.6' }}>
              Subscribe to get exclusive discount alerts, seasoned clay pot recipes, and warnings about new art additions.
            </p>
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ padding: '1.5rem', background: 'var(--success)', color: 'white', borderRadius: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 8px 20px rgba(22, 101, 52, 0.3)' }}
              >
                <ShieldCheck size={24} /> Thank you! You've successfully joined the club.
              </motion.div>
            ) : (
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                background: 'white',
                padding: '0.4rem',
                borderRadius: '100px',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid #eee',
                maxWidth: '550px',
                margin: '0 auto'
              }}>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    padding: '0 1.5rem',
                    fontSize: '1rem',
                    borderRadius: '100px'
                  }}
                />
                <button
                  onClick={handleSubscribe}
                  className="btn-primary"
                  style={{ padding: '0.8rem 2rem', borderRadius: '100px', fontWeight: 'bold' }}
                >
                  Join Club
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </section>
      
    </div>
  );
};

export default UserStory;
