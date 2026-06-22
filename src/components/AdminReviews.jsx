import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Trash2, Trash, ArrowLeft, MessageSquare, AlertTriangle, X, Phone, Mail, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const STORAGE_KEY = 'rp_reviews';
const PAGE_SIZE = 10;

const AdminReviews = ({ onBack }) => {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const save = (updated) => {
    setReviews(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const deleteOne = (id) => {
    save(reviews.filter(r => r.id !== id));
    setConfirmDeleteId(null);
  };

  const deleteAll = () => {
    save([]);
    setConfirmDeleteAll(false);
    setPage(1);
  };

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '—';

  const ratingCounts = [5,4,3,2,1].map(n => ({
    n, count: reviews.filter(r => r.rating === n).length
  }));

  const sorted = [...reviews].reverse();
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goTo = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const Pagination = () => totalPages <= 1 ? null : (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: '0.4rem', flexWrap: 'wrap',
      padding: '1.5rem 0 0',
    }}>
      <button onClick={() => goTo(page - 1)} disabled={page === 1} style={{
        padding: '0.5rem 0.9rem', borderRadius: '10px', border: '1px solid #eee',
        background: page === 1 ? '#fafafa' : 'white', cursor: page === 1 ? 'default' : 'pointer',
        color: page === 1 ? '#ccc' : 'var(--secondary)',
        display: 'flex', alignItems: 'center', gap: '0.3rem',
        fontSize: '0.82rem', fontWeight: '600',
      }}>
        <ChevronLeft size={14} /> Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => {
        const show = p === 1 || p === totalPages || Math.abs(p - page) <= 1;
        if (!show) {
          const prev = p - 1;
          const prevShow = prev === 1 || prev === totalPages || Math.abs(prev - page) <= 1;
          if (prevShow) return <span key={`d${p}`} style={{ color: '#ccc', fontSize: '0.85rem' }}>…</span>;
          return null;
        }
        return (
          <button key={p} onClick={() => goTo(p)} style={{
            width: '34px', height: '34px', borderRadius: '10px',
            border: p === page ? 'none' : '1px solid #eee',
            background: p === page ? 'var(--primary)' : 'white',
            color: p === page ? 'white' : 'var(--secondary)',
            fontWeight: p === page ? '800' : '500',
            fontSize: '0.85rem', cursor: 'pointer',
          }}>{p}</button>
        );
      })}

      <button onClick={() => goTo(page + 1)} disabled={page === totalPages} style={{
        padding: '0.5rem 0.9rem', borderRadius: '10px', border: '1px solid #eee',
        background: page === totalPages ? '#fafafa' : 'white', cursor: page === totalPages ? 'default' : 'pointer',
        color: page === totalPages ? '#ccc' : 'var(--secondary)',
        display: 'flex', alignItems: 'center', gap: '0.3rem',
        fontSize: '0.82rem', fontWeight: '600',
      }}>
        Next <ChevronRight size={14} />
      </button>
    </div>
  );

  return (
    <div style={{ padding: isMobile ? '0 1rem 3rem' : '0 4rem 4rem' }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
          <button onClick={onBack} style={{
            background: '#f5f5f5', border: 'none', borderRadius: '10px',
            padding: '0.5rem 0.9rem', cursor: 'pointer', color: '#555',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            fontSize: '0.82rem', fontWeight: '600',
          }}>
            <ArrowLeft size={14} /> Inventory
          </button>
          <h2 style={{ fontSize: isMobile ? '1.6rem' : '2.2rem', fontFamily: 'var(--font-heading)', color: 'var(--secondary)', margin: 0 }}>
            Customer Reviews
          </h2>
          <span style={{
            background: 'rgba(194,65,12,0.08)', color: 'var(--primary)',
            padding: '0.3rem 0.75rem', borderRadius: '20px',
            fontSize: '0.72rem', fontWeight: '700',
          }}>
            {reviews.length} Total
          </span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
          Customer feedback submitted from the main store page.
        </p>
      </div>

      {/* ── Stats Bar ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'auto 1fr auto',
        gap: '1rem',
        background: 'white', borderRadius: '16px',
        padding: '1.25rem 1.5rem',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0',
        marginBottom: '1.25rem',
        alignItems: 'center',
      }}>
        {/* Average rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: 'white', borderRadius: '14px',
            padding: '0.5rem 1rem', fontWeight: '800', fontSize: '1.6rem',
            lineHeight: 1, textAlign: 'center', minWidth: '60px',
          }}>
            {avgRating}
          </div>
          <div>
            <div style={{ display: 'flex', gap: '2px', marginBottom: '2px' }}>
              {[1,2,3,4,5].map(n => (
                <Star key={n} size={14}
                  fill={n <= Math.round(parseFloat(avgRating)) ? '#f59e0b' : '#e5e7eb'}
                  color={n <= Math.round(parseFloat(avgRating)) ? '#f59e0b' : '#e5e7eb'} />
              ))}
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{reviews.length} reviews</span>
          </div>
        </div>

        {/* Rating breakdown bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: isMobile ? '0' : '0 1.5rem' }}>
          {ratingCounts.map(({ n, count }) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', width: '8px', textAlign: 'right' }}>{n}</span>
              <Star size={10} fill="#f59e0b" color="#f59e0b" />
              <div style={{ flex: 1, height: '6px', background: '#f3f3f3', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: '10px',
                  background: 'linear-gradient(90deg, #f59e0b, #d97706)',
                  width: reviews.length ? `${(count / reviews.length) * 100}%` : '0%',
                  transition: 'width 0.4s ease',
                }} />
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', width: '16px' }}>{count}</span>
            </div>
          ))}
        </div>

        {/* Delete All button */}
        {reviews.length > 0 && (
          <button
            onClick={() => setConfirmDeleteAll(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.45rem',
              padding: '0.6rem 1.1rem', borderRadius: '10px',
              background: '#fff1f2', color: '#e11d48',
              border: '1.5px solid #fecdd3', cursor: 'pointer',
              fontWeight: '700', fontSize: '0.82rem', whiteSpace: 'nowrap',
            }}
          >
            <Trash size={14} /> Delete All
          </button>
        )}
      </div>

      {/* ── Reviews List ── */}
      {reviews.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '5rem 1rem',
          background: 'white', borderRadius: '20px',
          border: '1.5px dashed #eee',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}>
          <MessageSquare size={40} color="#e5e7eb" strokeWidth={1.5} />
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem', fontSize: '0.9rem' }}>
            Abhi tak koi review nahi aaya.
          </p>
        </div>
      ) : (
        <>
          {/* Page info */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)',
          }}>
            <span>
              Showing <strong style={{ color: 'var(--secondary)' }}>{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sorted.length)}</strong> of <strong style={{ color: 'var(--secondary)' }}>{sorted.length}</strong>
            </span>
            {totalPages > 1 && (
              <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Page {page}/{totalPages}</span>
            )}
          </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <AnimatePresence mode="wait">
            <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {paged.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.28 }}
                style={{
                  background: 'white', borderRadius: '16px',
                  border: '1px solid #f0f0f0',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ padding: isMobile ? '1rem' : '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>

                    {/* Avatar / Photo */}
                    <div style={{ flexShrink: 0, position: 'relative' }}>
                      {r.image ? (
                        <img
                          src={r.image} alt={r.name}
                          onClick={() => setPreviewImg(r.image)}
                          style={{
                            width: '48px', height: '48px', borderRadius: '12px',
                            objectFit: 'cover', cursor: 'pointer',
                            border: '2px solid rgba(194,65,12,0.15)',
                          }}
                          title="Click to enlarge"
                        />
                      ) : (
                        <div style={{
                          width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
                          background: `hsl(${(r.name.charCodeAt(0) * 37) % 360}, 50%, 88%)`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: '800', fontSize: '1.1rem',
                          color: `hsl(${(r.name.charCodeAt(0) * 37) % 360}, 55%, 35%)`,
                        }}>
                          {r.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <div>
                          <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--secondary)' }}>{r.name}</span>
                          <div style={{ display: 'flex', gap: '2px', marginTop: '3px' }}>
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={12}
                                fill={i < r.rating ? '#f59e0b' : '#e5e7eb'}
                                color={i < r.rating ? '#f59e0b' : '#e5e7eb'} />
                            ))}
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: '4px' }}>{r.rating}/5</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{r.date}</span>
                          {confirmDeleteId === r.id ? (
                            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                              <span style={{ fontSize: '0.75rem', color: '#e11d48', fontWeight: '600' }}>Delete?</span>
                              <button onClick={() => deleteOne(r.id)} style={{
                                background: '#e11d48', color: 'white', border: 'none',
                                borderRadius: '7px', padding: '0.3rem 0.65rem',
                                fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer',
                              }}>Yes</button>
                              <button onClick={() => setConfirmDeleteId(null)} style={{
                                background: '#f5f5f5', color: '#555', border: 'none',
                                borderRadius: '7px', padding: '0.3rem 0.65rem',
                                fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer',
                              }}>No</button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDeleteId(r.id)}
                              style={{
                                background: '#fff1f2', color: '#e11d48',
                                border: '1px solid #fecdd3', borderRadius: '8px',
                                padding: '0.3rem 0.6rem', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '0.3rem',
                                fontSize: '0.78rem', fontWeight: '600',
                              }}
                            >
                              <Trash2 size={12} /> Delete
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Comment */}
                      <p style={{ fontSize: '0.88rem', color: '#444', lineHeight: '1.65', margin: '0.6rem 0 0.5rem' }}>
                        {r.comment}
                      </p>

                      {/* Contact info */}
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {r.email && (
                          <a href={`mailto:${r.email}`} style={{
                            display: 'flex', alignItems: 'center', gap: '0.3rem',
                            fontSize: '0.75rem', color: '#2563eb', textDecoration: 'none',
                          }}>
                            <Mail size={11} /> {r.email}
                          </a>
                        )}
                        {r.phone && (
                          <a href={`tel:${r.phone}`} style={{
                            display: 'flex', alignItems: 'center', gap: '0.3rem',
                            fontSize: '0.75rem', color: '#16a34a', textDecoration: 'none',
                          }}>
                            <Phone size={11} /> {r.phone}
                          </a>
                        )}
                        {r.image && (
                          <button onClick={() => setPreviewImg(r.image)} style={{
                            display: 'flex', alignItems: 'center', gap: '0.3rem',
                            fontSize: '0.75rem', color: 'var(--primary)', background: 'none',
                            border: 'none', cursor: 'pointer', padding: 0,
                          }}>
                            <ImageIcon size={11} /> View Photo
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            </motion.div>
          </AnimatePresence>
        </div>

          <Pagination />
        </>
      )}

      {/* ── Delete All Confirm Modal ── */}
      <AnimatePresence>
        {confirmDeleteAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 4000,
              background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onClick={() => setConfirmDeleteAll(false)}
          >
            <motion.div
              initial={{ scale: 0.88 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.88 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'white', borderRadius: '20px',
                padding: '2.5rem', maxWidth: '380px', width: '90%',
                textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              }}
            >
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: '#fff1f2', display: 'flex',
                alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem',
              }}>
                <AlertTriangle size={26} color="#e11d48" />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                Sab Reviews Delete Karein?
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.75rem' }}>
                Yeh action undo nahi ho sakta. Total <strong>{reviews.length} reviews</strong> permanently delete ho jayenge.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => setConfirmDeleteAll(false)} style={{
                  flex: 1, padding: '0.85rem', borderRadius: '12px',
                  background: '#f5f5f5', color: '#555', border: 'none',
                  fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer',
                }}>
                  Rukein
                </button>
                <button onClick={deleteAll} style={{
                  flex: 1, padding: '0.85rem', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #e11d48, #be123c)',
                  color: 'white', border: 'none',
                  fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(225,29,72,0.3)',
                }}>
                  Haan, Delete Karo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Image Preview Modal ── */}
      <AnimatePresence>
        {previewImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImg(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 5000,
              background: 'rgba(0,0,0,0.85)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'zoom-out',
            }}
          >
            <button onClick={() => setPreviewImg(null)} style={{
              position: 'absolute', top: '1.5rem', right: '1.5rem',
              background: 'rgba(255,255,255,0.15)', border: 'none',
              borderRadius: '50%', width: '40px', height: '40px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'white',
            }}>
              <X size={20} />
            </button>
            <img src={previewImg} alt="Review" style={{
              maxWidth: '90vw', maxHeight: '85vh',
              borderRadius: '16px', objectFit: 'contain',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminReviews;
