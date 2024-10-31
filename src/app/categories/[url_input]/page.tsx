import { db } from '@/db'
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ArticleParams{
    params:{
        url_input : string
    }
}


export default async function DymanicArticles({params} : ArticleParams){
    const articles = await db.articles.findMany({
        where: {
            category: {
                category: params.url_input 
            }
        }
    });
    
    
    
    if(articles.length <= 0){
        return notFound();
    }
    const renderedArticles = articles.map(article => {
      return (
          <div key={article.id} className="relative group">
              <div className="overflow-hidden">
                  <Image 
                      src={article.topImage} 
                      alt={article.title} 
                      width={800}
                      height={450}
                      className="w-full h-auto transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100" // Set opacity on hover
                  />
              </div>
              <div className="absolute inset-0 flex flex-col justify-between h-full p-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-white bg-opacity-90"> {/* Slightly transparent background */}
                  {/* Top Div with Headline */}
                  <div className="h-1/2 flex items-center justify-center border-b border-gray-400">
                      <h1 className="text-black text-lg text-center">{article.title}</h1>
                  </div>
                  {/* Bottom Div with Logo and Button in both halves */}
                  <div className="h-1/2 flex">
                      <div className="w-1/2 flex flex-col items-center justify-center border-r border-gray-300"> {/* Right border for first div */}
                          <Image src="/read.png" alt='read' width={70} height={70} /> {/* Specify width and height for optimization */}
                          <Link href={`/articles/${article.id}`} className="border-solid border-2 text-black py-1 px-4 pl-8 pr-8 pt-4 pb-4">
                              Read
                          </Link>
                      </div>
                      <div className="w-1/2 flex flex-col items-center justify-center border-l border-gray-300"> {/* Left border for second div */}
                          <Image src="/watch.png" alt='watch' width={70} height={70} /> {/* Specify width and height for optimization */}
                          <Link href={`/watch/${article.id}`} className="border-solid border-2 text-black py-1 px-4 pl-8 pr-8 pt-4 pb-4">
                              Watch
                          </Link>
                      </div>
                  </div>
              </div>
          </div>
      );
  });
  
  
  
  
  
    
    return (
        <div className="grid grid-cols-2">
            {renderedArticles}
        </div>
    )
}