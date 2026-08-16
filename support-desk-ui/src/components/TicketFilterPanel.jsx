export default function TicketFilterPanel({
  searchText,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange
}) {
  return (
    <div style={{ padding: '15px', backgroundColor: '#333', marginBottom: '20px', borderRadius: '4px', display: 'flex', gap: '15px' }}>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search title or category..."
        value={searchText}
        onChange={(event) => onSearchChange(event.target.value)}
        style={{ padding: '8px', flex: 1, borderRadius: '4px', border: '1px solid #555', backgroundColor: '#222', color: 'white' }}
      />
      
      {/* Status Dropdown */}
      <select
        value={statusFilter}
        onChange={(event) => onStatusChange(event.target.value)}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#222', color: 'white' }}
      >
        <option value="">All Statuses</option>
        <option value="OPEN">OPEN</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="CLOSED">CLOSED</option>
      </select>

      {/* Priority Dropdown */}
      <select
        value={priorityFilter}
        onChange={(event) => onPriorityChange(event.target.value)}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#222', color: 'white' }}
      >
        <option value="">All Priorities</option>
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>

    </div>
  );
}