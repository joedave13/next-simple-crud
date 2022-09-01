import axios from 'axios';
import Layout from '../../../components/Layout';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';

function PostCreate() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const [validation, setValidation] = useState({});

  const handleFileChange = (e) => {
    const imageData = e.target.files[0];

    if (!imageData.type.match('image.*')) {
      setImage('');
      return;
    }

    setImage(imageData);
  };

  const storePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_BACKEND}/posts`, formData)
      .then(() => {
        Router.push('/posts');
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  return (
    <Layout>
      <div className="container" style={{ marginTop: '100px' }}>
        <div className="row">
          <div className="col-md-6">
            <div className="card border-0 rounded shadow-sm">
              <div className="card-body">
                <Link href="/posts">
                  <button className="btn btn-danger border-0 shadow-sm mb-3">
                    Back
                  </button>
                </Link>
                <form onSubmit={storePost}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Title</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Post title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    {validation.title && (
                      <small className="text-danger">{validation.title}</small>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Content</label>
                    <textarea
                      className="form-control"
                      rows={5}
                      placeholder="Post content..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      spellCheck="false"
                    ></textarea>
                    {validation.content && (
                      <small className="text-danger">
                        {validation.content}
                      </small>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                    {validation.image && (
                      <small className="text-danger">{validation.image}</small>
                    )}
                  </div>

                  <div className="d-grid">
                    <button
                      className="btn btn-primary border-0 shadow-sm"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PostCreate;
