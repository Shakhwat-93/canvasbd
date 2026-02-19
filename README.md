# Canvas Bag - Modern Web Application

This is the official repository for the **Canvas Bag** website, a high-performance Single Page Application (SPA) built with React and Vite.

## 🚀 Technology Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Premium Custom CSS
- **Routing**: SPA Hash Routing (Smooth Scrolling)
- **Deployment**: Vercel / Netlify / GitHub Pages

## 🛠️ Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/canvas-bag-app.git
    cd canvas-bag-app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

## 📦 Building for Production

To create a production-ready build:

```bash
npm run build
```

This will generate static files in the `dist` directory, ready for deployment.

## 🌍 Deployment

### Vercel (Recommended)
This project includes a `vercel.json` configuration for seamless SPA deployment. simply import the repository into Vercel and deploy.

### GitHub Pages
Configure your build script to output to `docs` or use the `gh-pages` branch strategy.

## 📁 Project Structure

- `src/components`: Reusable UI components (Hero, Features, Services, etc.)
- `src/pages`: Main page logic (Home)
- `src/data`: Centralized data for services and company info
- `public`: Static assets (images, fonts, css)

---
© 2026 Canvas Bag. All rights reserved.
