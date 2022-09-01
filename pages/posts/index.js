/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export async function getServerSideProps() {
  const req = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/posts`);
  const res = await req.data.data.data;

  return {
    props: {
      posts: res,
    },
  };
}

function PostIndex(props) {
  const { posts } = props;

  const router = useRouter();

  const refreshTable = () => {
    router.replace(router.asPath);
  };

  const deletePost = async (id) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_BACKEND}/posts/${id}`);
    refreshTable();
  };

  return (
    <Layout>
      <div className="container" style={{ marginTop: '100px' }}>
        <div className="row">
          <div className="col-md-12">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body">
                <Link href="posts/create">
                  <button className="btn btn-primary border-0 shadow-sm mb-3">
                    Add Post
                  </button>
                </Link>
                <table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Content</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id}>
                        <td className="text-center">
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_IMAGE}/${post.image}`}
                            width="150"
                            className="rounded-3"
                            alt="post-thumbnail"
                          />
                        </td>
                        <td>{post.title}</td>
                        <td>{post.content}</td>
                        <td>
                          <Link href={`/posts/edit/${post.id}`}>
                            <button className="btn btn-sm btn-warning border-0 shadow-sm mb-3 me-3">
                              Edit
                            </button>
                          </Link>
                          <button
                            onClick={() => deletePost(post.id)}
                            className="btn btn-sm btn-danger border-0 shadow-sm mb-3 me-3"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PostIndex;
