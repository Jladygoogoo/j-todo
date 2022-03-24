import { React, Component } from "react";
import { List, message, Avatar, Skeleton, Divider, Button, Row, Col, Tag } from "antd";
import Icon, {
  LeftCircleOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from 'moment';


function resolveMoment(str, type) {
    if(str == null) {
        return null;
    }
    let datetime = moment(str);
    if(type == "date") {
        return datetime.format("YYYY/MM/DD");
    }
    else {
        return datetime.format("HH:mm");
    }
}


class DdlPanel extends Component {
    constructor(props) {
      super(props);
      this.handleTodoItemClick = this.handleTodoItemClick.bind(this);
      this.handleConvert = this.handleConvert.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
    }

    handleTodoItemClick(e) {
        if (e.target.nodeName === "SPAN" || e.target.nodeName === "BUTTON") {return;}
        const id = e.currentTarget.id;
        this.props.setDdlFormData(id);
      }

    handleConvert(id) {
      // 将ddl转为todo
      console.log(id);
      this.props.convertDdl2Todo(id);
    }

    handleDelete(id) {
      // const id = e.currentTarget.id;
      this.props.handleDelete(id);
    }


    render() {
      const ddlList = this.props.ddlList;
      const tag_colors = ["success", "processing", "error", "warning", "default"];
      return (
        <div id="scrollableDiv" className="todo-panel">
        <h2>DDL</h2>
        <InfiniteScroll
          dataLength={ddlList.length}
        //   hasMore={ddlList.length < 50}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={ddlList}
            renderItem={item => (
                <div>
                  <Divider style={{margin:'0px'}}/>
                  <List.Item key={item.id} onClick={this.handleTodoItemClick} id={item.id}>
                    <div className="todo-item">
                      <Row justify="space-around">                          
                        <Col span={18}>
                            <div className="date-font">
                                <p style={{marginBottom:"5px"}}>{item.date} {item.timeHs}</p>
                            </div>   
                            <h4 style={{marginTop:"5px"}}>{item.title} </h4>                           
                            <div>
                                {item.tags.map((item, index) => (<Tag color={tag_colors[index%5]}>{item}</Tag>))}
                            </div>
                        </Col>
                        <Col span={4}>
                          <div className="todo-button">
                            <div><Button onClick={(e) => this.handleConvert(item.id)}><LeftCircleOutlined /></Button></div>
                            <div style={{paddingTop:"12px"}}><Button onClick={(e) => this.handleDelete(item.id)}><DeleteOutlined /></Button></div>
                          </div>                            
                        </Col>
                      </Row>
                    </div>
                  </List.Item>
              </div>
            )}
          />
        </InfiniteScroll>
      </div>
    );
  }

}

export default DdlPanel;