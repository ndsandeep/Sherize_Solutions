import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import { SERVICES_MENU, SERVICE_ROUTE } from "@/config/servicesMenu";
import "@/styles/global.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services", mega: true },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/opportunities", label: "Careers" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

const BPO = [
  { href: "https://admin.sherize.in", label: "Admin" },
  { href: "https://client.sherize.in", label: "Client" },
  { href: "https://employee.sherize.in", label: "Employee" },
  { href: "https://teamleader.sherize.in", label: "Team Leader" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  const [mega, setMega] = useState(false); // desktop mega menu
  const [mobileServices, setMobileServices] = useState(false);
  const closeTimer = useRef(null);

  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menus on navigation
  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [pathname]);

  // lock page scroll behind the mobile menu
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMega(false);
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMega(true);
  };
  const closeMega = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega(false), 120);
  };

  const cols = SERVICES_MENU.length;

  return (
    <>
      <header className={`nb ${scrolled || open ? "nb-scrolled" : ""}`}>
        <div className="nb-inner">
          <Link to="/" className="nb-logo" aria-label="Sherize Solutions home">
            <img src={logo} alt="Sherize" />
          </Link>

          <ul className="nb-links">
            {links.map((l) => {
              const active = pathname === l.to;

              if (l.mega) {
                return (
                  <li
                    key={l.to}
                    className="nb-item"
                    onMouseEnter={openMega}
                    onMouseLeave={closeMega}
                    onFocus={openMega}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget)) closeMega();
                    }}
                  >
                    <Link to={l.to} className={`nb-link ${active ? "is-active" : ""}`} style={{ paddingRight: 4 }}>
                      {l.label}
                    </Link>
                    <button
                      type="button"
                      className="nb-link"
                      style={{ paddingLeft: 4, paddingRight: 8 }}
                      aria-expanded={mega}
                      aria-controls="services-mega"
                      aria-label="Toggle services menu"
                      onClick={() => setMega((v) => !v)}
                    >
                      <ChevronDown size={15} style={{ transition: "transform .2s", transform: mega ? "rotate(180deg)" : "none" }} />
                    </button>

                    <div id="services-mega" className="nb-panel" data-open={mega}>
                      <div
                        className="nb-panel-inner"
                        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
                      >
                        {SERVICES_MENU.map((col) => (
                          <div key={col.title} className="nb-col">
                            <div className="nb-col-title">{col.title}</div>
                            <ul>
                              {col.items.map((item) => (
                                <li key={item.slug}>
                                  <Link
                                    to={`/services/${item.slug}`}
                                    tabIndex={mega ? 0 : -1}
                                    onClick={() => setMega(false)}
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={l.to} className="nb-item">
                  <Link to={l.to} className={`nb-link ${active ? "is-active" : ""}`}>
                    {l.label}
                  </Link>
                </li>
              );
            })}

            <li className="nb-item nb-dd">
              <button type="button" className="nb-link" aria-haspopup="true">
                Sherize BPO <ChevronDown size={14} />
              </button>
              <div className="nb-dd-menu">
                {BPO.map((b) => (
                  <a key={b.href} href={b.href} target="_blank" rel="noopener noreferrer">
                    {b.label}
                  </a>
                ))}
              </div>
            </li>
          </ul>

          <div className="nb-actions">
            <Link
              to="/contact#form"
              className="nb-join hidden lg:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm btn-glow"
            >
              Join With Us
              <ArrowRight size={16} />
            </Link>

            <button
              type="button"
              aria-label="Toggle Menu"
              aria-expanded={open}
              className="nb-burger"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet navigation */}
      <div className="nb-mobile" data-open={open}>
        {links.map((l) =>
          l.mega ? (
            <div key={l.to}>
              <button
                type="button"
                className="nb-m-link"
                aria-expanded={mobileServices}
                onClick={() => setMobileServices((v) => !v)}
              >
                {l.label}
                <ChevronDown size={18} style={{ transition: "transform .2s", transform: mobileServices ? "rotate(180deg)" : "none" }} />
              </button>
              {mobileServices && (
                <div className="nb-m-sub">
                  <Link to={l.to} onClick={() => setOpen(false)} style={{ color: "#fff", fontWeight: 600 }}>
                    All {l.label}
                  </Link>
                  {SERVICES_MENU.map((col) => (
                    <div key={col.title}>
                      <h4>{col.title}</h4>
                      {col.items.map((item) => (
                        <Link
                          key={item.slug}
                          to={`/services/${item.slug}`}
                          onClick={() => setOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link key={l.to} to={l.to} className="nb-m-link" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ),
        )}

        <div style={{ marginTop: 24 }}>
          <div style={{ color: "var(--primary)", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Sherize BPO</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {BPO.map((b) => (
              <a
                key={b.href}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl px-4 py-3 text-sm text-white"
              >
                {b.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <a
            href="https://play.google.com/store/apps/details?id=in.sherize.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center gap-2 rounded-full px-5 py-3 text-sm font-medium btn-ghost-glass"
            onClick={() => setOpen(false)}
          >
            <FaGooglePlay size={16} />
            Download on Play Store
          </a>
          <Link
            to="/contact#form"
            className="inline-flex justify-center items-center gap-2 rounded-full px-5 py-3 text-sm btn-glow"
            onClick={() => setOpen(false)}
          >
            Join With Us
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
