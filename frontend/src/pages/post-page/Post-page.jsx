import './Post-page.css'
import PostList from '../../components/posts/PostList'
import Sidebar from '../../components/sidebar/Sidebar'
import {categories,posts}from '../../dummyData'
import Pagination from '../../components/pagination/pagination'
import { useEffect } from 'react'
const PostsPage = () => {
  useEffect(()=>{
    window.scroll(0,0);
  },[])
    return (
        <>
          <section className="posts-page">
              <PostList posts={posts}/>
              <Sidebar categoties={categories}/>
        
          </section>
          <Pagination/>
        </>
      );
}
 
export default PostsPage;