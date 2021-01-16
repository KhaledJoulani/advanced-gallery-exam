import './ImageViewer.scss';
import React from 'react';
import PropTypes from 'prop-types';

class ImageViewer extends React.Component {

    static PropsTypes = {
        closeView: PropTypes.func,
        title: PropTypes.string,
        style: PropTypes.object,
        imageUrl: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            url: props.imageUrl,
            title: props.title || '',
            style: props.style || {},
            filter: { sepia: 0, saturate: 1, invert: 0, hueRotate: 0, grayscale: 0, contrast: 1, brightness: 1, blur: 0 }
        }
    }

    handleClick = e => {
        e.stopPropagation();
        this.props.closeView();
    }

    render() {
        const { filter, url, title } = this.state;
        const styles = { ...this.state.style, filter: `sepia(${filter.sepia}) saturate(${filter.saturate}) invert(${filter.invert}) hue-rotate(${filter.hueRotate}deg) grayscale(${filter.grayscale}) contrast(${filter.contrast}) brightness(${filter.brightness}) blur(${filter.blur}px)` }
        return (
            <div className="display-full-image" onClick={e => this.handleClick(e)}>
                <span className='close-image-view' onClick={e => this.handleClick(e)}>&times;</span>
                <img
                    src={url}
                    alt={title}
                    style={styles}
                    onClick={e => e.stopPropagation()}
                />
                <div className='tools-bar' onClick={e => e.stopPropagation()}>
                    <div className="tool-group">
                        <span className="tool-name">Brightness</span>
                        <input type="range" max='3' min='0' step='0.1' value={filter.brightness} onChange={e => this.setState({ filter: { ...filter, brightness: e.target.value } })} />
                    </div>
                    <div className="tool-group">
                        <span className="tool-name">Contrast</span>
                        <input type="range" max='3' min='0' step='0.1' value={filter.contrast} onChange={e => this.setState({ filter: { ...filter, contrast: e.target.value } })} />
                    </div>
                    <div className="tool-group">
                        <span className="tool-name">Blur</span>
                        <input type="range" max='10' min='0' step='1' value={filter.blur} onChange={e => this.setState({ filter: { ...filter, blur: e.target.value } })} />
                    </div>
                    <div className="tool-group">
                        <span className="tool-name">Grayscale</span>
                        <input type="range" max='1' min='0' step='0.1' value={filter.grayscale} onChange={e => this.setState({ filter: { ...filter, grayscale: e.target.value } })} />
                    </div>
                    <div className="tool-group">
                        <span className="tool-name">Hue-rotate</span>
                        <input type="range" max='360' min='0' step='1' value={filter.hueRotate} onChange={e => this.setState({ filter: { ...filter, hueRotate: e.target.value } })} />
                    </div>
                    <div className="tool-group">
                        <span className="tool-name">Invert</span>
                        <input type="range" max='1' min='0' step='0.1' value={filter.invert} onChange={e => this.setState({ filter: { ...filter, invert: e.target.value } })} />
                    </div>
                    <div className="tool-group">
                        <span className="tool-name">Saturate</span>
                        <input type="range" max='3' min='0' step='0.1' value={filter.saturate} onChange={e => this.setState({ filter: { ...filter, saturate: e.target.value } })} />
                    </div>
                    <div className="tool-group">
                        <span className="tool-name">Sepia</span>
                        <input type="range" max='1' min='0' step='0.1' value={filter.sepia} onChange={e => this.setState({ filter: { ...filter, sepia: e.target.value } })} />
                    </div>
                </div>
            </div>
        )
    }

}

export default ImageViewer;