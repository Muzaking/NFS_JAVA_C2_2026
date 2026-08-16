export default function StatusBadge({ status }) {
  return (
    <span style={{ padding: '4px 8px', backgroundColor: '#87cefa', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px', color: '#000' }}>
      Status: {status}
    </span>
  );
}