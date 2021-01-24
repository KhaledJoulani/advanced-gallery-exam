import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Image from '../Image';
import './Gallery.scss';

class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      galleryWidth: this.getGalleryWidth(),
      page: 1,
      loading: false,
      draggableItem: { source: null, destination: null }
    };
  }

  getGalleryWidth() {
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }
  getImages(tag) {
    if (!this.state.loading) {

      this.setState({ loading: true });

      const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&page=${this.state.page + 1}&format=json&nojsoncallback=1`;
      const baseUrl = 'https://api.flickr.com/';
      axios({
        url: getImagesUrl,
        baseURL: baseUrl,
        method: 'GET'
      })
        .then(res => res.data)
        .then(res => {
          if (
            res &&
            res.photos &&
            res.photos.photo &&
            res.photos.photo.length > 0
          ) {
            this.setState(state => {
              return { images: [...state.images, ...res.photos.photo], loading: false, page: state.page + 1 }
            });
          } else {
            this.setState({ loading: false });
          }
        })
    }
  }

  resizeGalleryWidth = () => {
    this.setState({
      galleryWidth: document.body.clientWidth
    });
  }

  scrollLoad = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1) {
      this.getImages(this.props.tag);
    }
  }

  componentDidMount() {
    this.getImages(this.props.tag);
    this.resizeGalleryWidth();
    window.addEventListener('resize', this.resizeGalleryWidth);
    window.addEventListener('scroll', this.scrollLoad);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeGalleryWidth);
    window.removeEventListener('scroll', this.scrollLoad);
  }

  componentDidUpdate(prevProps){
    if(prevProps.tag !== this.props.tag){
      this.setState({page: 1,images: []});
      this.getImages(this.props.tag);
    }
  }

  removeImageFromList = (imageId) => {
    this.setState(state => {
      const updatedImageList = state.images.filter(img => {
        if (img.id !== imageId) return img;
      });
      return { images: updatedImageList }
    })
  }

  handleDropItem = (e) => {
    e.preventDefault();

    const { source, destination } = this.state.draggableItem;

    if (!destination) return;

    this.setState(state => {
      const image = state.images.splice(source, 1)[0];
      state.images.splice(destination, 0, image);
      return { images: state.images };
    })
  }

  render() {
    return (
      <div className="gallery-root" onDrop={e => this.handleDropItem(e)} onDragOver={e=> e.preventDefault()} >
        {this.state.images.map((dto, index) => {
          return <Image key={'image-' + dto.id + index} dto={dto} galleryWidth={this.state.galleryWidth} removeImage={this.removeImageFromList} index={index} draggableItem={this.state.draggableItem} />;
        })}
        {!this.state.loading && this.state.images.length === 0 && <h2>No results for "{this.props.tag}"</h2>}
        {this.state.loading && <h2>Loading...</h2>}
      </div>
    );
  }
}

export default Gallery;
