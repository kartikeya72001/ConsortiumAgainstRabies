import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  metadataBase: new URL('https://consortiumagainstrabies.in'),
  title: 'Consortium Against Rabies (India) | Towards Zero Human Rabies Deaths',
  description: 'National consortium of physicians, public health specialists, pediatricians, and researchers striving to make India rabies free. Find certified life members, clinical guidelines, and CARCON conference archives.',
  keywords: 'Consortium Against Rabies, CARCON, Rabies India, Animal bite management, PEP guidelines, Intradermal Rabies Vaccine, Life Members',
  icons: {
    icon: '/Logo.jpg',
    shortcut: '/Logo.jpg',
    apple: '/Logo.jpg',
  },
  openGraph: {
    title: 'Consortium Against Rabies (India)',
    description: 'Committed to Zero Human Rabies Deaths through evidence-based prevention, public awareness, and clinical guidelines.',
    url: 'https://consortiumagainstrabies.in',
    siteName: 'Consortium Against Rabies',
    images: [
      {
        url: '/Logo.jpg',
        width: 400,
        height: 400,
        alt: 'Consortium Against Rabies',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ flex: '1 0 auto' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
