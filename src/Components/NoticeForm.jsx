import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const NoticeForm = ({ selectedNotice, clearSelection, fetchNotices }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedNotice) {
      setTitle(selectedNotice.title);
      setContent(selectedNotice.content);
    } else {
      clearForm();
    }
  }, [selectedNotice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (selectedNotice) {
        await axios.patch(`http://localhost:9000/notices/${selectedNotice._id}`, { title, content });
      } else {
        await axios.post('http://localhost:9000/notices', { title, content });
      }
      clearForm();
      fetchNotices();
    } catch (error) {
      setError('Failed to save notice');
      console.error(error);
    }

    setLoading(false);
  };

  const clearForm = () => {
    setTitle('');
    setContent('');
    clearSelection();
  };

  return (
    <FormContainer>
      <Title>{selectedNotice ? 'Edit Notice' : 'Create Notice'}</Title>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormField>
        <FormField>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </FormField>
        <FormActions>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </SubmitButton>
          <CancelButton type="button" onClick={clearForm}>
            Clear
          </CancelButton>
        </FormActions>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>
    </FormContainer>
  );
};

export default NoticeForm;

const FormContainer = styled.div`
  background-color: #f8f9fa;
  padding: 2rem;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  margin-top: 2rem;
  color: black;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
  font-size: 1.75rem;
`;

const FormField = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 10rem;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  margin-left: 1rem;
  padding: 0.75rem 1rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a6268;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 1rem;
  text-align: center;
  font-size: 1rem;
`;
