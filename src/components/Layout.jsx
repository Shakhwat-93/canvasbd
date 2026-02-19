import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <div className="page-wrapper">
            <main className="main">
                {children}
            </main>
            <Footer />
        </div>
    );
}
