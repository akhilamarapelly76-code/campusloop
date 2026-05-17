 import { useState } from 'react'
import {
  Search, Menu, X, Laptop, Camera, Gamepad2, Headphones, Tablet, Monitor,
  Smartphone, HardDrive, Star, MapPin, ArrowRight, Zap, Shield, Users, ChevronRight
} from 'lucide-react'

const categories = [
  { id: 'laptops', name: 'Laptops', icon: Laptop, count: 234 },
  { id: 'cameras', name: 'Cameras', icon: Camera, count: 89 },
  { id: 'gaming', name: 'Gaming', icon: Gamepad2, count: 156 },
  { id: 'audio', name: 'Audio', icon: Headphones, count: 112 },
  { id: 'tablets', name: 'Tablets', icon: Tablet, count: 78 },
  { id: 'monitors', name: 'Monitors', icon: Monitor, count: 45 },
  { id: 'phones', name: 'Phones', icon: Smartphone, count: 67 },
  { id: 'storage', name: 'Storage', icon: HardDrive, count: 34 },
]

const featuredDevices = [
  { id: 1, name: 'MacBook Pro 14" M3', category: 'Laptop', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop', pricePerDay: 25, pricePerWeek: 150, rating: 4.9, reviews: 14, location: 'KITS Campus', owner: { name: 'Akhila' } },
  { id: 2, name: 'Sony A7 IV Camera', category: 'Camera', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop', pricePerDay: 35, pricePerWeek: 200, rating: 4.8, reviews: 23, location: 'CBIT', owner: { name: 'Chandini' } },
  { id: 3, name: 'PS5 Console Bundle', category: 'Gaming', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop', pricePerDay: 15, pricePerWeek: 85, rating: 4.7, reviews: 12, location: 'NIT-WARANGAL', owner: { name: 'Yashwanth' } },
  { id: 4, name: 'iPad Pro 12.9"', category: 'Tablet', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop', pricePerDay: 20, pricePerWeek: 120, rating: 4.9, reviews: 5, location: 'Kakatiya University', owner: { name: 'Sanjay' } },
  { id: 5, name: 'DJI Mini 3 Pro Drone', category: 'Camera', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop', pricePerDay: 40, pricePerWeek: 220, rating: 4.8, reviews: 18, location: 'SR-University', owner: { name: 'Lyra' } },
  { id: 6, name: 'Sony WH-1000XM5', category: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop', pricePerDay: 8, pricePerWeek: 45, rating: 4.9, reviews: 19, location: 'Malla Reddy', owner: { name: 'Sanay' } },
]

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navLinks = [
    { name: 'Browse', href: '#browse' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'List Your Device', href: '#list' },
    { name: 'About', href: '#about' },
  ]
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-[#3f3f46]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">CampusLoop</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-[#a1a1aa] hover:text-white transition-colors text-sm font-medium">{link.name}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button className="text-[#a1a1aa] hover:text-white transition-colors text-sm font-medium">Sign In</button>
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium hover:from-purple-500 hover:to-blue-500 transition-all">Get Started</button>
          </div>
          <button className="md:hidden p-2 text-[#a1a1aa] hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#18181b] border-t border-[#3f3f46]/50">
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="block text-[#a1a1aa] hover:text-white transition-colors text-sm font-medium">{link.name}</a>
            ))}
            <div className="pt-4 border-t border-[#3f3f46]/50 space-y-3">
              <button className="w-full text-left text-[#a1a1aa] hover:text-white transition-colors text-sm font-medium">Sign In</button>
              <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium">Get Started</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#27272a] border border-[#3f3f46] mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-[#a1a1aa]"><span className="text-white font-medium">100+</span> active listings near you</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Rent Tech from</span><br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Students Like You</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#a1a1aa] mb-10 max-w-2xl mx-auto leading-relaxed">
            Need a laptop for finals? A camera for your project? Rent directly from students on your campus. Save money, build community.
          </p>
          <div className="relative max-w-2xl mx-auto mb-12">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-[#a1a1aa]" />
              <input type="text" placeholder="Search for laptops, cameras, gaming consoles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-32 py-4 rounded-xl bg-[#18181b] border border-[#3f3f46] text-white placeholder-[#71717a] focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" />
              <button onClick={() => alert(`Searching for: ${searchQuery}`)} className="absolute right-2 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all">Search</button>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center"><Users className="w-5 h-5 text-purple-400" /></div>
              <div className="text-left"><div className="text-xl font-bold text-white">500+</div><div className="text-sm text-[#a1a1aa]">Students</div></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center"><Laptop className="w-5 h-5 text-blue-400" /></div>
              <div className="text-left"><div className="text-xl font-bold text-white">120+</div><div className="text-sm text-[#a1a1aa]">Devices</div></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center"><Shield className="w-5 h-5 text-green-400" /></div>
              <div className="text-left"><div className="text-xl font-bold text-white">95%</div><div className="text-sm text-[#a1a1aa]">Insured</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CategoryButtons() {
  const [activeCategory, setActiveCategory] = useState(null)
  return (
    <section className="py-12 border-y border-[#3f3f46]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Browse by Category</h2>
          <button className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors">View All<ChevronRight className="w-4 h-4" /></button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4">
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.id
            return (
              <button key={category.id} onClick={() => setActiveCategory(isActive ? null : category.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border whitespace-nowrap transition-all ${isActive ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500 text-white' : 'bg-[#18181b] border-[#3f3f46] text-[#a1a1aa] hover:border-[#52525b] hover:text-white'}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : ''}`} />
                <span className="font-medium">{category.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-purple-500/30 text-purple-300' : 'bg-[#27272a] text-[#71717a]'}`}>{category.count}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function DeviceCard({ device, onRequest }) {
  return (
    <div className="group bg-[#18181b] rounded-2xl border border-[#3f3f46] overflow-hidden hover:border-purple-500/50 transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={device.image} alt={device.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full bg-[#09090b]/80 backdrop-blur-sm text-xs font-medium text-white border border-[#3f3f46]">{device.category}</span>
        </div>
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#09090b]/80 backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-medium text-white">{device.rating}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">{device.name}</h3>
        <div className="flex items-center gap-2 text-sm text-[#a1a1aa] mb-4">
          <MapPin className="w-4 h-4" />
          <span>{device.location}</span>
          <span className="text-[#52525b]">|</span>
          <span>{device.reviews} reviews</span>
        </div>
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#3f3f46]/50">
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-medium">{device.owner.name.charAt(0)}</div>
          <span className="text-sm text-[#a1a1aa]">Listed by <span className="text-white">{device.owner.name}</span></span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-white">₹{device.pricePerDay}<span className="text-sm font-normal text-[#a1a1aa]">/day</span></div>
            <div className="text-sm text-[#71717a]">₹{device.pricePerWeek}/week</div>
          </div>
          <button onClick={() => onRequest(device)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium hover:from-purple-500 hover:to-blue-500 transition-all">
            Rent Now<ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function FeaturedDevices({ onRequest }) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Featured Devices</h2>
            <p className="text-[#a1a1aa]">Top-rated tech available for rent right now</p>
          </div>
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-[#3f3f46] text-[#a1a1aa] hover:text-white hover:border-[#52525b] transition-all">View All<ArrowRight className="w-4 h-4" /></button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDevices.map((device) => (
            <DeviceCard key={device.id} device={device} onRequest={onRequest} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#09090b] border-t border-[#3f3f46]/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center"><Zap className="w-5 h-5 text-white" /></div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">CampusLoop</span>
            </div>
            <p className="text-sm text-[#a1a1aa] mb-4">The easiest way for students to rent and share tech on campus.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2">{['Browse Devices', 'List Your Device', 'How It Works'].map((item) => (<li key={item}><a href="#" className="text-sm text-[#a1a1aa] hover:text-white transition-colors">{item}</a></li>))}</ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">{['Safety Tips', 'FAQ', 'Contact'].map((item) => (<li key={item}><a href="#" className="text-sm text-[#a1a1aa] hover:text-white transition-colors">{item}</a></li>))}</ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Community</h4>
            <ul className="space-y-2">{['Top rentals', 'Student community', 'Events'].map((item) => (<li key={item}><a href="#" className="text-sm text-[#a1a1aa] hover:text-white transition-colors">{item}</a></li>))}</ul>
          </div>
        </div>
        <div className="pt-8 border-t border-[#3f3f46]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#71717a]">2024 CampusLoop. All rights reserved.</p>
          <div className="flex items-center gap-6">{['Privacy', 'Terms', 'Cookies'].map((item) => (<a key={item} href="#" className="text-sm text-[#71717a] hover:text-white transition-colors">{item}</a>))}</div>
        </div>
      </div>
    </footer>
  )
}

const inputStyle = {
  width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0",
  fontSize: 15, fontFamily: "inherit", color: "#0f172a", outline: "none",
  background: "#f8fafc", boxSizing: "border-box",
}

function Toast({ toasts, remove }) {
  return (
    <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10 }}>
      {toasts.map(t => (
        <div key={t.id} onClick={() => remove(t.id)} style={{
          background: t.type === "success" ? "#0f172a" : "#1e293b", color: "#f8fafc", padding: "14px 20px",
          borderRadius: 12, fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 10,
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)", cursor: "pointer", minWidth: 260,
          borderLeft: `4px solid ${t.type === "success" ? "#34d399" : t.type === "info" ? "#60a5fa" : "#f87171"}`,
        }}>
          <span>{t.type === "success" ? "✅" : t.type === "info" ? "ℹ️" : "❌"}</span>
          {t.message}
        </div>
      ))}
    </div>
  )
}

function Modal({ title, onClose, children }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, padding: 32, width: "100%", maxWidth: 480, boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#0f172a" }}>{title}</h2>
          <button onClick={onClose} style={{ border: "none", background: "#f1f5f9", cursor: "pointer", borderRadius: 8, width: 32, height: 32, fontSize: 16 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      {children}
    </div>
  )
}

export default function App() {
  const [toasts, setToasts] = useState([])
  const [requestModal, setRequestModal] = useState(null)
  const [requestName, setRequestName] = useState("")
  const [requestReason, setRequestReason] = useState("")

  const addToast = (message, type = "success") => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }

  const handleRequest = () => {
    if (!requestName.trim()) return
    setRequestModal(null)
    setRequestName("")
    setRequestReason("")
    addToast("Request Sent Successfully! 🎉", "success")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-purple-950">
      <Toast toasts={toasts} remove={id => setToasts(prev => prev.filter(t => t.id !== id))} />

      {requestModal && (
        <Modal title={`Request: ${requestModal.name}`} onClose={() => setRequestModal(null)}>
          <Field label="Your Name *">
            <input style={inputStyle} placeholder="Your name" value={requestName} onChange={e => setRequestName(e.target.value)} />
          </Field>
          <Field label="Reason (optional)">
            <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 80 }} placeholder="Why do you need this?" value={requestReason} onChange={e => setRequestReason(e.target.value)} />
          </Field>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button onClick={() => setRequestModal(null)} style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14, color: "#64748b" }}>Cancel</button>
            <button onClick={handleRequest} disabled={!requestName.trim()} style={{ flex: 2, padding: "11px 0", borderRadius: 10, border: "none", background: !requestName.trim() ? "#e2e8f0" : "#6366f1", color: !requestName.trim() ? "#94a3b8" : "#fff", cursor: !requestName.trim() ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 14 }}>Send Request</button>
          </div>
        </Modal>
      )}

      <Navbar />
      <main>
        <HeroSection />
        <CategoryButtons />
        <FeaturedDevices onRequest={setRequestModal} />
      </main>
      <Footer />
    </div>
  )
}