import { useParams } from 'react-router-dom';
import './Category.css'
import PostList from '../../components/posts/PostList';
import { posts } from '../../dummyData';
import { useEffect } from 'react';
const Category = () => {
    const {category}=useParams();

    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    
    return ( 
        <section className="category">
            <h1 className='category-title'>Post based on {category}</h1>
            <PostList posts={posts}/>
        </section>
     );
}
 
export default Category;