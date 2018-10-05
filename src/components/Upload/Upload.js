const React = require('react')
class Upload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.sendUpUrl = this.sendUpUrl.bind(this)
    }
    handleChange(event) {
        var binaryData = event.target.result;
        //Converting Binary Data to base 64
        var base64String = window.btoa(binaryData)
        // console.log(event.target.files)
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }

    sendUpUrl(e) {
        e.preventDefault();
        this.props.get_img_url(this.state.file);
    }

    render() {
        return (
            <form onSubmit={this.sendUpUrl}>
                <input type="file" onChange={this.handleChange} />
                <img src={this.props.img_prop} />
                <button type="submit">Upload</button>
            </form>
        );
    }
}
module.exports = Upload