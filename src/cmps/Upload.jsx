import { Component } from 'react'
import { cloudinaryService } from '../services/cloudinaryService'

export class Upload extends Component {
  state = {
    imgUrl: null,
    height: 100,
    width: 100,
    isUploading: false
  }

  uploadImg = async (ev) => {
    this.setState({ isUploading: true })
    const { secure_url, height, width } = await cloudinaryService.uploadImg(ev)
    this.setState({ isUploading: false, imgUrl: secure_url, height, width })
    this.props.getImgUrl(this.state.imgUrl)
  }

  get uploadMsg() {
    const { imgUrl, isUploading } = this.state
    if (imgUrl) return 'Upload Another?'
    return isUploading ? 'Uploading....' : 'Upload Image'
  }

  render() {
    const { imgUrl} = this.state
    const previewStyle = {
      backgroundImage: `url(${imgUrl})`,
      // width: 100,
      // height: 100,
    }
    return (
      <div className="upload-container">
       {imgUrl && <div className="upload-grid">
          <div className="upload-preview" style={previewStyle}>
          </div>
        </div>}
        <div>
          <label htmlFor="imgUpload">{this.uploadMsg}</label>
          <input type="file" onChange={this.uploadImg} accept="img/*" id="imgUpload" />
        </div>
      </div>
    )
  }
}
