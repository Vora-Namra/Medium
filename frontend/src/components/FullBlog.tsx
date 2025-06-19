import type { Blog } from '../hooks/useBlogs';
import { Appbar } from './Appbar';
import { Avatar } from './BlogCard';

const formatContent = (content: string) => {
    let formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedContent = formattedContent
        .split('\n\n')
        .map(paragraph => `<p class="text-lg leading-relaxed mb-4">${paragraph}</p>`)
        .join('');
    return formattedContent;
};

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return (
        <div>
            <Appbar />
            <div className="flex justify-center px-4 sm:px-6 lg:px-20 mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 w-full max-w-screen-xl gap-y-10 gap-x-10">

                    {/* Blog Content */}
                    <div className="lg:col-span-8 col-span-12">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                            {blog.title}
                        </h1>
                        <p className="text-slate-500 pt-2 text-sm sm:text-base">
                            Posted on 2nd Nov 2024
                        </p>
                        <div
                            className="pt-4 text-justify"
                            dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }}
                        ></div>
                    </div>

                    {/* Author Sidebar */}
                    <div className="lg:col-span-4 col-span-12 lg:pl-6">
                        <h2 className="text-slate-600 text-lg mb-2">Author</h2>
                        <div className="flex items-center space-x-2">
                            <Avatar name={blog.author.name || "Anonymous"} />
                            <span className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </span>
                        </div>
                        <p className="pt-1 text-slate-500">
                            Working for Self | Motivated to Learn and Grow | Focused | Tech Enthusiast
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FullBlog;
