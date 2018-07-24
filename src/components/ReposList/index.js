import React from 'react';
import TechnicalInfo from '../TechnicalInfo'

class ReposList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.setState({ show: !this.state.show })
  }
  render() {
    var view = this.state.show;
    var style = `btn btn-info glyphicon glyphicon-${view ? "minus" : "plus"}`;
    return (

      <div className="container">
        <button type="button" className={style} onClick={this.onClick}> {view ? "Hide" : "Show"}</button>

        {this.state.show ?
          <div className ="list-more">
            <div className="list-group" style={{ marginTop: 10 }}>
              <span ><TechnicalInfo data={this.props.data} /></span>
            </div>
          </div> : null}

      </div>
    )
  }
}

export default ReposList;