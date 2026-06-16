<div align="center">
  <h1>Personal Budget Analyzer & EMI Planner 📊</h1>
  <p>
    A professional-grade financial management suite built with React, Vite, and Tailwind CSS. Track income/expenses, set budgets, calculate complex EMI scenarios, and generate detailed reports with 100% data privacy.
  </p>

<!-- Badges -->
<p>
  <img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
  <img alt="Vite" src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white"/>
  <img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
  <img alt="React Router" src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"/>
</p>
</div>

<br />

## 🌟 Overview

The **Personal Budget Analyzer & EMI Planner** is designed to give you complete control over your personal finances. Whether you're tracking daily expenses, planning a monthly budget, or calculating the long-term impact of a loan, this application provides all the tools you need in a sleek, intuitive, and highly responsive interface.

## 🚀 Key Features

*   📈 **Interactive Dashboard:** Real-time visualization of your cash flow, budget pacing, and recent transactions.
*   💰 **Income & Expense Tracker:** Categorized logging of financial transactions with robust local storage persistence.
*   🎯 **Budget Planner:** Set monthly limits per category. Visual warning indicators help you stay on track.
*   🏦 **Advanced EMI Planner:** Comprehensive loan calculator featuring payoff schedules and detailed interest charts.
*   📄 **Exportable Reports:** Generate in-depth monthly/yearly summaries and export them instantly as PDF documents.
*   🌍 **Global Settings:** Support for multiple currencies (INR, USD, EUR, GBP) and customizable notification preferences.
*   🔒 **Local Sovereignty Architecture:** 100% Data Privacy. No backend servers—your financial data stays securely within your browser's `localStorage`.

## 🛠️ Technology Stack

*   **Frontend Framework:** [React 19](https://react.dev/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Routing:** [React Router v7](https://reactrouter.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Charts:** [Recharts](https://recharts.org/)
*   **PDF Generation:** [jsPDF](https://github.com/parallax/jsPDF) & [html2canvas](https://html2canvas.hertzen.com/)

## 📂 Project Structure

```text
├── src/
│   ├── assets/       # Static assets like images and icons
│   ├── components/   # Reusable UI components (Layout, Cards, etc.)
│   ├── pages/        # Application pages (Dashboard, Tracker, EMI Planner)
│   ├── utils/        # Utility functions and helpers
│   ├── App.jsx       # Main application routing
│   ├── main.jsx      # React entry point
│   └── index.css     # Global styles and Tailwind imports
├── package.json      # Project metadata and dependencies
├── vite.config.js    # Vite configuration
└── eslint.config.js  # ESLint configuration
```

## 💻 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18.0 or higher)
*   npm (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/steellunknown-ui/persnol-Budget-Planner.git
    cd persnol-Budget-Planner
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **View the app:**
    Open `http://localhost:5173` in your web browser.

## 🏗️ Building for Production

To create an optimized production build, run:
```bash
npm run build
```
This will generate a `dist` folder containing the compiled assets, ready to be deployed to any static hosting service (like Vercel, Netlify, or GitHub Pages).

## 🛡️ Privacy & Security

Your financial data is yours. This app uses **Local Sovereignty Architecture**, meaning everything is stored locally on your device via `localStorage`. No data is ever transmitted to a server or external database.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
<div align="center">
  <p>Developed by <b>DN Groups</b> | Contact: merndevloops@gmail.com</p>
</div>
