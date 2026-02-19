import { REFERENCES } from '../data/content';

function RefSection({ title, items }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h4 className="mono text-xs text-muted uppercase" style={{ marginBottom: '0.5rem' }}>{title}</h4>
      <table className="ref-table">
        <thead>
          <tr>
            <th>Paper</th>
            <th style={{ width: '200px' }}>Link</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>{item.paper}</td>
              <td>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ref-link"
                  style={{ borderBottom: '1px solid var(--accent-heat-dim)' }}
                >
                  {item.url.replace(/^https?:\/\//, '').substring(0, 35)}...
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function References() {
  return (
    <section id="refs">
      <h2 className="section-header">References</h2>
      <p className="content-p">
        All citations used in this document, organized by topic. Every link verified.
      </p>

      <RefSection title="Calibration & Uncertainty" items={REFERENCES.calibration} />
      <RefSection title="Retrieval-Augmented Generation" items={REFERENCES.rag} />
      <RefSection title="LLM Evaluation & Hallucination" items={REFERENCES.evaluation} />
      <RefSection title="Interpretability & Truthfulness" items={REFERENCES.interpretability} />
      <RefSection title="NLP Models" items={REFERENCES.nlp} />
      <RefSection title="Pharma Domain & Regulation" items={REFERENCES.pharma} />
    </section>
  );
}
