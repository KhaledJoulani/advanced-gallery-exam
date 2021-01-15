import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './Image.scss';

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number,
    removeImage: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.state = {
      size: 200,
      rotate: 0,
      fullScreen: false
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

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  rotateImage = () => {
    // Roate by 90 degree
    this.setState(state => {
      return { rotate: state.rotate + 90 }
    })
  }

  closeView = (e)=>{
    e.stopPropagation();
    this.setState({ fullScreen: false })
  }

  render() {
    return (
      <div className="image-root">
        <div className="image-container"
          style={{
            backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
            width: this.state.size + 'px',
            height: this.state.size + 'px',
            transform: `rotate(${this.state.rotate}deg)`
          }}
        ></div>

        {
          this.state.fullScreen && <div className="display-full-image" onClick={e=> this.closeView(e) }>
            <span className='close-image-view' onClick={e=> this.closeView(e)}>&times;</span>
            <img src={this.urlFromDto(this.props.dto)} alt={this.props.dto.title} style={{transform: `rotate(${this.state.rotate}deg)`}} onClick={e => e.stopPropagation()}/>
          </div>
        }

        <div className='actions'>
          <FontAwesome className="image-icon" name="sync-alt" title="rotate" onClick={this.rotateImage} />
          <FontAwesome className="image-icon" name="trash-alt" title="delete" onClick={() => this.props.removeImage(this.props.dto.id)} />
          <FontAwesome className="image-icon" name="expand" title="expand" onClick={()=> this.setState({ fullScreen: true })} />
        </div>
      </div>
    );
  }
}

export default Image;
