import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="home">
      <header>
        <h1>Welcome to AI Reader</h1>
        <p className="subtitle">Your interactive learning companion</p>
      </header>

      <section className="features">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Interactive Reading</h3>
            <p>Engage with your reading material through AI-powered discussions and explanations.</p>
          </div>
          <div className="feature-card">
            <h3>Practice Tests</h3>
            <p>Test your knowledge with AI-generated questions and get instant feedback.</p>
          </div>
          <div className="feature-card">
            <h3>Smart Summaries</h3>
            <p>Get concise summaries and key points from your reading materials.</p>
          </div>
        </div>
      </section>

      <section className="getting-started">
        <h2>Getting Started</h2>
        <p>Choose a topic or upload your reading material to begin your learning journey.</p>
        <div className="cta-buttons">
          <button className="primary-button">Browse Topics</button>
          <button className="secondary-button">Upload Material</button>
        </div>
      </section>
    </div>
  );
}
