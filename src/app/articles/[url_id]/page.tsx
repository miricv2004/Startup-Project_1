import { db } from "@/db";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import Image from 'next/image';
import styles from './styles.module.css'

interface Article {
    params: {
        url_id: string;
    };
}

export default async function ArticlesPage({ params }: Article) {
    const articleId = parseInt(params.url_id, 10);

    if (isNaN(articleId)) {
        return notFound();
    }

    const article = await db.articles.findUnique({
        where: {
            id: articleId,
        },
    });

    if (!article) {
        return notFound();
    }

    let renderText: string[];
    try {
        renderText = JSON.parse(article.paragraphText);
        
    } catch (error) {
        console.error("Error parsing paragraphText:", error);
        return notFound();
    }
    
    

    const display = renderText.map((element: string, index: number) => {
        const sanitizedText = DOMPurify.sanitize(element)
        return (
            <div key={index}>
                {index === 0 && (
                    <div className={styles.imageWrapper}>
                        <div>
                            <Image 
                                src={article.topImage} 
                                alt="Top Image" 
                                width={600}  // Specify appropriate width
                                height={400} // Specify appropriate height
                            />
                        </div>
                    </div>
                )}
                <div dangerouslySetInnerHTML={{ __html: sanitizedText }} />
                {element.includes('Key Takeaways') && (
                    <div className={styles.imageWrapper}>
                        <div>
                            <Image 
                                src={article.middleImage} 
                                alt="Middle Image" 
                                width={600}  // Specify appropriate width
                                height={400} // Specify appropriate height
                            />
                        </div>
                    </div>
                )}
                {index === renderText.length - 2 && (
                    <div className={styles.imageWrapper}>
                        <div>
                            <Image 
                                src={article.bottomImage} 
                                alt="Bottom Image" 
                                width={600}  // Specify appropriate width
                                height={400} // Specify appropriate height
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    });

    return (
        <div className={styles.content}>
            <h1 style={{textAlign:"center"}}>{article.title}</h1>
            {display}
        </div>
    );
}
