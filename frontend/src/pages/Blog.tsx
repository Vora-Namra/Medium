import { Appbar } from '../components/Appbar';
import FullBlog from '../components/FullBlog';
import Spinner from '../components/Spinner';
import { useBlog } from '../hooks/useBlogs'
import { useParams } from 'react-router-dom';
const Blog = () => {
  const {id} = useParams();
  const { loading, blog } = useBlog({id:(id || "")});
  if(loading){
    return <div>

    <Appbar />
    
    <div className='flex justify-center items-center h-screen'>
      <Spinner/>
    </div>
    
    </div>

  }
  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  )
 }

export default Blog