import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 40;

const AllReviewsModal = ({ reviews, onClose }) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const sorted = [...reviews].reverse();
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const avgRating = reviews.length
    ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const starCounts = [5, 4, 3, 2, 1].map(s => ({
    star: s,
    count: reviews.filter(r => r.rating === s).length,
  }));

  const goTo = (p) => {
    setPage(p);
    // scroll list to top
    const el = document.getElementById('arm-list');
    if (el) el.scrollTop = 0;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 5000,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          onClick={e => e.stopPropagation()}
          style={{
            background: '#fafaf9',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '720px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 32px 80px rgba(0,0,0,0.2)',
            overflow: 'hidden',
          }}
        >
          {/* ── Header ── */}
          <div style={{
            padding: '1.5rem 1.75rem 1.25rem',
            background: 'white',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <MessageSquare size={18} color="var(--primary)" />
                <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                  Customer Reviews
                </span>
              </div>
              <h2 style={{ fontSize: '1.55rem', color: 'var(--secondary)', fontFamily: 'var(--font-heading)', fontWeight: '400', margin: 0 }}>
                All Reviews <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>({reviews.length})</span>
              </h2>
            </div>
            <button
              onClick={onClose}
              style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: '#f5f5f5', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#666', flexShrink: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#eee'}
              onMouseLeave={e => e.currentTarget.style.background = '#f5f5f5'}
            >
              <X size={18} />
            </button>
          </div>

          {/* ── Rating Summary ── */}
          <div style={{
            padding: '1.25rem 1.75rem',
            background: 'white',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex', gap: '2rem', alignItems: 'center',
            flexShrink: 0, flexWrap: 'wrap',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--secondary)', lineHeight: 1, fontFamily: 'var(--font-heading)' }}>
                {avgRating}
              </div>
              <div style={{ display: 'flex', gap: '0.2rem', justifyContent: 'center', margin: '0.35rem 0' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14}
                    fill={i < Math.round(avgRating) ? '#f59e0b' : '#e5e7eb'}
                    color={i < Math.round(avgRating) ? '#f59e0b' : '#e5e7eb'} />
                ))}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{reviews.length} reviews</div>
            </div>

            <div style={{ flex: 1, minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {starCounts.map(({ star, count }) => {
                const pct = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
                return (
                  <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', width: '10px', textAlign: 'right' }}>{star}</span>
                    <Star size={11} fill="#f59e0b" color="#f59e0b" />
                    <div style={{ flex: 1, height: '6px', background: '#f0f0f0', borderRadius: '10px', overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        style={{ height: '100%', background: 'var(--primary)', borderRadius: '10px' }}
                      />
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', width: '24px' }}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Page info strip ── */}
          {totalPages > 1 && (
            <div style={{
              padding: '0.6rem 1.75rem',
              background: 'rgba(194,65,12,0.04)',
              borderBottom: '1px solid #f0f0f0',
              fontSize: '0.78rem', color: 'var(--text-muted)',
              flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span>
                Showing <strong style={{ color: 'var(--secondary)' }}>{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sorted.length)}</strong> of <strong style={{ color: 'var(--secondary)' }}>{sorted.length}</strong> reviews
              </span>
              <span style={{ color: 'var(--primary)', fontWeight: '600' }}>
                Page {page} of {totalPages}
              </span>
            </div>
          )}

          {/* ── Reviews List (scrollable) ── */}
          <div id="arm-list" style={{ overflowY: 'auto', padding: '1.25rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                {paged.map((r, idx) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03, duration: 0.28 }}
                    style={{
                      background: 'white', borderRadius: '16px',
                      padding: '1.1rem 1.25rem',
                      border: '1px solid rgba(194,65,12,0.06)',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                      {r.image ? (
                        <img src={r.image} alt={r.name}
                          style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                      ) : (
                        <div style={{
                          width: '46px', height: '46px', borderRadius: '50%', flexShrink: 0,
                          background: `hsl(${(r.name.charCodeAt(0) * 37) % 360}, 55%, 88%)`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: '800', fontSize: '1.1rem',
                          color: `hsl(${(r.name.charCodeAt(0) * 37) % 360}, 55%, 35%)`,
                        }}>
                          {r.name.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.3rem' }}>
                          <div>
                            <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--secondary)' }}>{r.name}</span>
                            {(r.email || r.phone) && (
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                                {r.email || r.phone}
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                            {r.date}
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '0.15rem', marginBottom: '0.6rem' }}>
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14}
                              fill={i < r.rating ? '#f59e0b' : '#e5e7eb'}
                              color={i < r.rating ? '#f59e0b' : '#e5e7eb'} />
                          ))}
                        </div>

                        <p style={{ fontSize: '0.88rem', color: '#444', lineHeight: '1.65', margin: 0 }}>
                          {r.comment}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div style={{
              flexShrink: 0, padding: '1rem 1.75rem',
              background: 'white', borderTop: '1px solid #f0f0f0',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
              flexWrap: 'wrap',
            }}>
              {/* Prev */}
              <button
                onClick={() => goTo(page - 1)} disabled={page === 1}
                style={{
                  padding: '0.5rem 0.9rem', borderRadius: '10px', border: '1px solid #eee',
                  background: page === 1 ? '#fafafa' : 'white', cursor: page === 1 ? 'default' : 'pointer',
                  color: page === 1 ? '#ccc' : 'var(--secondary)',
                  display: 'flex', alignItems: 'center', gap: '0.3rem',
                  fontSize: '0.82rem', fontWeight: '600',
                }}
              >
                <ChevronLeft size={14} /> Prev
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => {
                const show = p === 1 || p === totalPages || Math.abs(p - page) <= 1;
                const isDot = !show;
                const prevDot = !Array.from({ length: totalPages }, (_, i) => i + 1)
                  .slice(0, p - 1)
                  .some((pp, i, arr) => Math.abs(pp - page) <= 1 || pp === 1 || pp === totalPages)
                  && p !== 1;
                if (isDot) {
                  const prev = p - 1;
                  const prevShow = prev === 1 || prev === totalPages || Math.abs(prev - page) <= 1;
                  if (!prevShow) return null;
                  return <span key={`dot-${p}`} style={{ color: '#ccc', fontSize: '0.85rem', padding: '0 0.2rem' }}>…</span>;
                }
                return (
                  <button key={p} onClick={() => goTo(p)} style={{
                    width: '34px', height: '34px', borderRadius: '10px',
                    border: p === page ? 'none' : '1px solid #eee',
                    background: p === page ? 'var(--primary)' : 'white',
                    color: p === page ? 'white' : 'var(--secondary)',
                    fontWeight: p === page ? '800' : '500',
                    fontSize: '0.85rem', cursor: 'pointer',
                  }}>
                    {p}
                  </button>
                );
              })}

              {/* Next */}
              <button
                onClick={() => goTo(page + 1)} disabled={page === totalPages}
                style={{
                  padding: '0.5rem 0.9rem', borderRadius: '10px', border: '1px solid #eee',
                  background: page === totalPages ? '#fafafa' : 'white', cursor: page === totalPages ? 'default' : 'pointer',
                  color: page === totalPages ? '#ccc' : 'var(--secondary)',
                  display: 'flex', alignItems: 'center', gap: '0.3rem',
                  fontSize: '0.82rem', fontWeight: '600',
                }}
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AllReviewsModal;
