import { useState } from 'react';

const TicketFormWizard = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '', // Blank by default to force user selection
    priority: '',
    status: ''
  });

  // 1. New state to track validation errors
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear the error dynamically as the user starts typing/selecting
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  // 2. The Validation Logic
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.priority) newErrors.priority = 'Priority is required';
    if (!formData.status) newErrors.status = 'Status is required';

    setErrors(newErrors);
    
    // Returns true only if the errors object is completely empty
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 3. Block submission if validation fails
    if (!validateForm()) {
      console.log("Form submission blocked: Missing required fields.");
      return;
    }

    console.log("Form Submitted successfully with data:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6">Create New Support Ticket</h2>
      
      {/* noValidate stops the default HTML5 browser popups */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`mt-1 block w-full border ${errors.title ? 'border-red-500' : 'border'} rounded-md p-2`}
            placeholder="e.g., Laptop won't turn on"
          />
          {/* Inline Error Message */}
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`mt-1 block w-full border ${errors.description ? 'border-red-500' : 'border'} rounded-md p-2`}
            placeholder="Provide detailed information..."
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Category Dropdown */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`mt-1 block w-full border ${errors.category ? 'border-red-500' : 'border'} rounded-md p-2`}
          >
            <option value="">-- Select a Category --</option>
            <option value="HARDWARE">Hardware</option>
            <option value="SOFTWARE">Software</option>
            <option value="NETWORK">Network</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        {/* Priority Dropdown */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className={`mt-1 block w-full border ${errors.priority ? 'border-red-500' : 'border'} rounded-md p-2`}
          >
            <option value="">-- Select Priority --</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
          {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority}</p>}
        </div>

        {/* Status Dropdown */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={`mt-1 block w-full border ${errors.status ? 'border-red-500' : 'border'} rounded-md p-2`}
          >
            <option value="">-- Select Status --</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="CLOSED">Closed</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Create Ticket
        </button>
      </form>
    </div>
  );
};

export default TicketFormWizard;