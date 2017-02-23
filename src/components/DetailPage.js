import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Modal from 'react-modal'
import modalStyle from '../constants/modalStyle'
import {withRouter} from 'react-router'

const detailModalStyle = {
  overlay: modalStyle.overlay,
  content: {
    ...modalStyle.content,
    height: 761
  }
}

class DetailPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    const {Post} = this.props.data

    return (
      <Modal
        isOpen
        contentLabel='Create Post'
        style={detailModalStyle}
        onRequestClose={this.props.router.goBack}
      >
        <div className='bg-white detail flex flex-column no-underline br2 h-100'>
          <div
            className='image'
            style={{
              backgroundImage: `url(${Post.imageUrl})`,
              backgroundSize: 'cover',
              paddingBottom: '100%',
            }}
          />
          <div className='flex items-center black-80 fw3 description'>
            {Post.description}
          </div>
        </div>
      </Modal>
    )
  }
}


const PostQuery = gql`query post($id: ID!) {
  Post(id: $id) {
    id
    imageUrl
    description
  }
}`

const DetailPageWithData = graphql(PostQuery, {
  options: () => ({
    variables: {
      id: 'cizibffrjta3g0160fjr4ynip'
    }
  })
})(DetailPage)

export default withRouter(DetailPageWithData)
