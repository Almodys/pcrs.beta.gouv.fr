import PropTypes from 'prop-types'

import Meta from '@/components/meta.js'
import Header from '@/components/header'
import Footer from '@/components/footer'

const Page = ({title, description, image, children}) => (
  <>
    <Meta title={title} description={description} image={image} />
    <Header />

    <main>
      {children}
    </main>

    <Footer />

    <style jsx>{`
      main {
        flex: 1;
        box-sizing: border-box;
      }
    `}
    </style>
  </>
)

Page.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.node
}

Page.defaultProps = {
  title: 'Accompagnement national du PCRS',
  description: 'Accompagner et diffuser les projets locaux de PCRS en cours et à venir',
  image: null
}

export default Page
