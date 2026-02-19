import { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../data/content';

export default function NavRail() {
  const [activeId, setActiveId] = useState('intro');

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => ({
        id: item.id,
        el: document.getElementById(item.id),
      })).filter(s => s.el);

      let current = sections[0]?.id || 'intro';
      for (const section of sections) {
        if (section.el.offsetTop <= window.scrollY + 250) {
          current = section.id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="nav-rail">
      {NAV_ITEMS.map(item => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`anchor-dot ${activeId === item.id ? 'active' : ''}`}
          data-label={item.label}
          onClick={(e) => handleClick(e, item.id)}
        />
      ))}
    </nav>
  );
}
