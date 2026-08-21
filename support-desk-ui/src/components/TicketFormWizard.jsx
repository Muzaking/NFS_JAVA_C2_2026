import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import { createTicket, updateTicket, getTicketById } from '../services/ticketService'; 

const TicketFormWizard = () => {
  const { token } = useAuth();
  // 1. Grab the ticketId from the URL (if it exists)
  const { ticketId } = useParams(); 
  const isEditMode = Boolean(ticketId); // True if editing, false if creating

  const [formData, setFormData] = useState({
    title: '', description: '', category: '', priority: '', status: ''
  });
  const [errors, setErrors] = useState({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode); // Loading state for fetching data
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');

  // 2. Fetch ticket data when the component loads in Edit Mode
  useEffect(() => {
    if (isEditMode && token) {
      const loadTicket = async () => {
        try {
          const data = await getTicketById(ticketId, token);
          // Pre-fill the form with the fetched data
          setFormData({
            title: data.title || '',
            description: data.description || '',
            category: data.category || '',
            priority: data.priority || '',
            status: data.status || ''
          });
        } catch (error) {
          setSubmitError(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      loadTicket();
    }
  }, [ticketId, isEditMode, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.priority) newErrors.priority = 'Priority is required';
    if (!formData.status) newErrors.status = 'Status is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccess('');
    setSubmitError('');

    if (!validateForm()) return;
    setIsSubmitting(true);
    
    try {
      // 3. Branch logic: PUT if editing, POST if creating
      if (isEditMode) {
        await updateTicket(ticketId, token, formData);
        setSubmitSuccess('Ticket updated successfully!');
      } else {
        await createTicket(token, formData);
        setSubmitSuccess('Ticket created successfully!');
        setFormData({ title: '', description: '', category: '', priority: '', status: '' });
      }
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show a loading screen while fetching the ticket data
  if (isLoading) {
    return <div className="text-center mt-20 text-gray-500">Loading ticket data...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      {/* Dynamic Header */}
      <h2 className="text-2xl font-bold mb-6">
        {isEditMode ? 'Edit Support Ticket' : 'Create New Support Ticket'}
      </h2>
      
      {submitSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-400 rounded">
          {submitSuccess}
        </div>
      )}
      {submitError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} disabled={isSubmitting} className={`mt-1 block w-full border ${errors.title ? 'border-red-500' : 'border'} rounded-md p-2`} />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" disabled={isSubmitting} className={`mt-1 block w-full border ${errors.description ? 'border-red-500' : 'border'} rounded-md p-2`} />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange} disabled={isSubmitting} className={`mt-1 block w-full border ${errors.category ? 'border-red-500' : 'border'} rounded-md p-2`}>
            <option value="">-- Select a Category --</option>
            <option value="HARDWARE">Hardware</option>
            <option value="SOFTWARE">Software</option>
            <option value="NETWORK">Network</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
          <select id="priority" name="priority" value={formData.priority} onChange={handleChange} disabled={isSubmitting} className={`mt-1 block w-full border ${errors.priority ? 'border-red-500' : 'border'} rounded-md p-2`}>
            <option value="">-- Select Priority --</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
          {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority}</p>}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} disabled={isSubmitting} className={`mt-1 block w-full border ${errors.status ? 'border-red-500' : 'border'} rounded-md p-2`}>
            <option value="">-- Select Status --</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="CLOSED">Closed</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
        </div>

        {/* Dynamic Submit Button */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full text-white font-bold py-2 px-4 rounded mt-4 ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isSubmitting ? 'Saving...' : isEditMode ? 'Update Ticket' : 'Create Ticket'}
        </button>
      </form>
    </div>
  );
};

export default TicketFormWizard;