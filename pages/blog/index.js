import PropTypes from 'prop-types'
import Image from 'next/image'

import {getPosts, getTags} from '@/lib/blog.js'

import colors from '@/styles/colors.js'

import Page from '@/layouts/main.js'

import BlogPagination from '@/components/blog/blog-pagination.js'
import BlogCard from '@/components/blog/blog-card.js'
import BlogTags from '@/components/blog/blog-tags.js'

const Blog = ({posts, tags, tagsList, pagination}) => (
  <Page title='Blog du PCRS' description='La liste complète des billets du blog autour du PCRS'>
    {posts ? (
      <div>
        <div className='blog-header fr-my-5w'>
          <Image
            src='/images/illustrations/blog_illustration.png'
            height={200}
            width={200}
            alt=''
            aria-hidden='true'
          />
          <h2 className='fr-mt-5w fr-mb-0'>Blog du PCRS</h2>
        </div>

        <div className='blog-posts-container'>
          {tagsList.length > 0 && <BlogTags selectedTags={tags} tagsList={tagsList} />}

          <div className='blog-cards-list fr-my-6w fr-px-md-6w'>
            {posts.length > 0 && posts.map(post => <BlogCard key={post.id} post={post} />)}
            {(posts.length === 0 && tags.length === 0) && <div className='no-article'>Aucun article de blog n’est disponible</div>}
            {(posts.length === 0 && tags.length > 0) && <div className='no-article'>Aucun article ne contient ces tags</div>}
          </div>

          <BlogPagination {...pagination} />
        </div>
      </div>
    ) : (
      <div className='unavailable fr-p-5w'>
        <Image
          src='/images/illustrations/500.png'
          height={456}
          width={986}
          alt=''
          style={{
            width: '100%',
            maxWidth: '500px',
            height: 'auto'
          }}
        />

        <div className='fr-pt-8w'>
          <p>
            <b className='fr-h3'>Le blog est actuellement inaccessible</b><br />
            <i>Merci de réessayer ultérieurement</i>
          </p>
        </div>
      </div>
    )}

    <style jsx>{`
      .blog-header {
        text-align: center;
      }

      .blog-cards-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 6em;
        justify-items: center;
      }

      .no-article {
        font-style: italic;
      }

      .unavailable {
        text-align: center;
        color: ${colors.darkgrey};
      }
    `}</style>
  </Page>
)

export async function getServerSideProps({query}) {
  const data = await getPosts(query)
  const tags = query?.tags || null
  const tagsList = await getTags()

  return {
    props: {
      posts: data?.posts || null,
      pagination: data?.meta.pagination || null,
      tags: tags?.split(',') || [],
      tagsList
    }
  }
}

Blog.propTypes = {
  posts: PropTypes.array,
  pagination: PropTypes.object,
  tags: PropTypes.array,
  tagsList: PropTypes.array.isRequired
}

Blog.defaultProps = {
  posts: null,
  pagination: null,
  tags: null
}

export default Blog
