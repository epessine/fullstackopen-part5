import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;
  const blog = {
    title: 'test title',
    url: 'https://test.com/',
    likes: 2,
    author: 'Test Author'
  };
  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog blog={blog} setBlogs={mockHandler}/>
    );
  });

  test('renders title content initially', () => {
    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).not.toHaveTextContent(blog.author);
    expect(component.container).not.toHaveTextContent(blog.url);
    expect(component.container).not.toHaveTextContent(blog.likes);
  });

  test('renders blog details after button click', () => {
    const button = component.getByText('view');

    fireEvent.click(button);

    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
    expect(component.container).toHaveTextContent(blog.url);
    expect(component.container).toHaveTextContent(blog.likes);
  });
});

