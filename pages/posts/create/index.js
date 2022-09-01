import axios from 'axios';
import Layout from '../../../components/Layout';
import Link from 'next/link';
import Router from 'next/router';

function PostCreate() {
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
                <form>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Title</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Post title..."
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Content</label>
                    <textarea
                      className="form-control"
                      rows={5}
                      placeholder="Post content..."
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Image</label>
                    <input type="file" className="form-control" />
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
