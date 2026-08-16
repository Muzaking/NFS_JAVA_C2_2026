export default function PriorityBadge({ priority }) {
  return (
    <span style={{ padding: '4px 8px', backgroundColor: '#ffd700', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px', color: '#000' }}>
      Priority: {priority}
    </span>
  );
}