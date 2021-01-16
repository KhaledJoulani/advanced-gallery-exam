import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './Image.scss';
import ImageViewer from '../ImageViewer/ImageViewer';

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number,
    removeImage: PropTypes.func,
    index: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.state = {
      size: 200,
      rotate: 0,
      fullScreen: false,
      isDraggable: true
    };
  }

  calcImageSize() {
    const { galleryWidth } = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = (galleryWidth / imagesPerRow);
    this.setState({
      size
    });
  }

  componentDidMount() {
    this.calcImageSize();
  }

  componentWillReceiveProps() {
    this.calcImageSize();
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  rotateImage = () => {
    // Rotate by 90 degree
    this.setState(state => {
      return { rotate: state.rotate + 90 }
    })
  }

  closeView = () => {
    this.setState({ fullScreen: false, isDraggable: true });
  }

  handleDragStart = (e) => {
    this.props.draggableItem.source = e.currentTarget.id;
  }

  hanldeDragEnter = (e) => {
    const { draggableItem } = this.props;
    e.preventDefault();
    if (draggableItem.source !== e.currentTarget.id) {
      e.target.style.opacity = .2;
      draggableItem.destination = e.currentTarget.id;
    } else {
      draggableItem.destination = null;
    }
  }

  handleDragLeave(e) {
    e.preventDefault();
    e.target.style.opacity = '';
  }

  render() {
    return (
      <div className="image-root" id={`${this.props.index}`} draggable={this.state.isDraggable} onDragStart={e => this.handleDragStart(e)} onDragEnter={e => this.hanldeDragEnter(e)} onDragLeave={e => this.handleDragLeave(e)}>
        <div className="image-container"
          style={{
            backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
            width: this.state.size + 'px',
            height: this.state.size + 'px',
            transform: `rotate(${this.state.rotate}deg)`
          }}
        ></div>

        {
          this.state.fullScreen && <ImageViewer
            imageUrl={this.urlFromDto(this.props.dto)}
            closeView={this.closeView}
            style={{ transform: `rotate(${this.state.rotate}deg)` }}
          />
        }

        <div className='actions'>
          <FontAwesome className="image-icon" name="sync-alt" title="rotate" onClick={this.rotateImage} />
          <FontAwesome className="image-icon" name="trash-alt" title="delete" onClick={() => this.props.removeImage(this.props.dto.id)} />
          <FontAwesome className="image-icon" name="expand" title="expand" onClick={() => this.setState({ fullScreen: true, isDraggable: false })} />
        </div>
      </div>
    );
  }
}

export default Image;
