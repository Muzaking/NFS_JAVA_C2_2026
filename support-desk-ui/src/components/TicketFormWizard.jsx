import React, { useState } from 'react';

export default function TicketFormWizard({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Validation
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop the form from submitting
    }

    // 2. Submit payload
    setErrors({});
    setIsSubmitting(true);
    
    try {
      await onSubmit({ title, description });
    } finally {
      setIsSubmitting(false); // Reset button state after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="title" style={{ display: 'block', fontWeight: 'bold' }}>Title</label>
        <input 
          id="title" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="Ticket title"
        />
        {errors.title && <div className="error" style={{ padding: '4px', marginTop: '4px' }}>{errors.title}</div>}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="description" style={{ display: 'block', fontWeight: 'bold' }}>Description</label>
        <textarea 
          id="description" 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          placeholder="Describe the issue"
        />
        {errors.description && <div className="error" style={{ padding: '4px', marginTop: '4px' }}>{errors.description}</div>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}