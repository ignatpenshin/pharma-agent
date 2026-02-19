export default function Ref({ text, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="ref-link"
      style={{ borderBottom: '1px solid var(--accent-heat-dim)' }}
    >
      {text}
    </a>
  );
}
