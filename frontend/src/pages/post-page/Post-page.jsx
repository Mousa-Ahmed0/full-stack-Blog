import './Post-page.css'
import PostList from '../../components/posts/PostList'
import Sidebar from '../../components/sidebar/Sidebar'
import { categories } from '../../dummyData'
import Pagination from '../../components/pagination/pagination'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostsCount } from "../../redux/apiCalls/postApiCall";

const POST_PER_PAGE = 3;

const PostsPage = () => {
  const dispatch = useDispatch();
  const { postsCount, posts } = useSelector(state => state.post);

  const [currentPage, setCurrentpage] = useState(1);
  const totalPages = Math.ceil(postsCount / POST_PER_PAGE);

  useEffect(() => {
    dispatch(fetchPosts(currentPage));
    window.scroll(0, 0);
  }, [currentPage])

  useEffect(() => {
    dispatch(getPostsCount());
  }, [])

  return (
    <>
      <section className="posts-page">
        <PostList posts={posts} />
        <Sidebar categoties={categories} />

      </section>
      <Pagination pages={totalPages} currentPage={currentPage} setCurrentpage={setCurrentpage} />
    </>
  );
}

export default PostsPage;