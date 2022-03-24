import { React, Component } from "react";
import { List, message, Avatar, Skeleton, Divider, Button, Row, Col, Tag } from "antd";
import Icon, {
  CheckCircleOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
const morningSvg = () => (<svg t="1647334193912" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6395" width="200" height="200"><path d="M630.656 699.754667a32.106667 32.106667 0 0 1-45.248 0l-90.517333-90.517334a32.106667 32.106667 0 0 1 0-45.248 32.106667 32.106667 0 0 1 45.248 0l90.517333 90.517334a32.064 32.064 0 0 1 0 45.248z" fill="#A8A8B4" p-id="6396"></path><path d="M540.16 609.258667l-90.517333 90.517333a32.106667 32.106667 0 0 1-45.248 0 32.106667 32.106667 0 0 1 0-45.248l90.517333-90.517333a32.106667 32.106667 0 0 1 45.248 0 32.106667 32.106667 0 0 1 0 45.248z" fill="#A8A8B4" p-id="6397"></path><path d="M513.834667 853.333333c-17.6 0-32-14.4-32-32v-170.666666c0-17.6 14.4-32 32-32s32 14.4 32 32v170.666666c0 17.6-14.4 32-32 32z" fill="#A8A8B4" p-id="6398"></path><path d="M513.834667 298.666667c-17.6 0-32-14.4-32-32v-85.333334c0-17.6 14.4-32 32-32s32 14.4 32 32v85.333334c0 17.6-14.4 32-32 32z" fill="#F9A825" p-id="6399"></path><path d="M213.333333 597.333333c0 17.6-14.4 32-32 32h-85.333333c-17.6 0-32-14.4-32-32s14.4-32 32-32h85.333333c17.6 0 32 14.4 32 32zM960 597.333333c0 17.6-14.4 32-32 32h-85.333333c-17.6 0-32-14.4-32-32s14.4-32 32-32h85.333333c17.6 0 32 14.4 32 32z" fill="#F9A825" p-id="6400"></path><path d="M300.821333 386.154667a32.106667 32.106667 0 0 1-45.248 0l-60.330666-60.330667a32.106667 32.106667 0 0 1 0-45.248 32.106667 32.106667 0 0 1 45.248 0l60.330666 60.330667a32.106667 32.106667 0 0 1 0 45.248zM723.178667 386.154667a32.106667 32.106667 0 0 1 0-45.248l60.330666-60.330667a32.106667 32.106667 0 0 1 45.248 0 32.106667 32.106667 0 0 1 0 45.248l-60.330666 60.330667a32.106667 32.106667 0 0 1-45.248 0zM371.029333 725.333333a191.04 191.04 0 0 1-49.173333-128c0-106.048 85.952-192 192-192s192 85.952 192 192a191.146667 191.146667 0 0 1-49.173333 128h78.656a254.570667 254.570667 0 0 0 34.517333-128c0-141.376-114.624-256-256-256s-256 114.624-256 256c0 46.677333 12.693333 90.304 34.517333 128h78.656z" fill="#F9A825" p-id="6401"></path></svg>);
const afternoonSvg = () => (<svg t="1647327617361" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5708" width="200" height="200"><path d="M404.394667 708.245333a32.106667 32.106667 0 0 1 45.248 0l90.517333 90.517334a32.106667 32.106667 0 0 1 0 45.248 32.106667 32.106667 0 0 1-45.248 0l-90.517333-90.517334a32.064 32.064 0 0 1 0-45.248z" fill="#A8A8B4" p-id="5709"></path><path d="M494.912 798.741333l90.517333-90.517333a32.106667 32.106667 0 0 1 45.248 0 32.106667 32.106667 0 0 1 0 45.248l-90.517333 90.517333a32.106667 32.106667 0 0 1-45.248 0 32.064 32.064 0 0 1 0-45.248z" fill="#A8A8B4" p-id="5710"></path><path d="M515.562667 789.333333c-17.6 0-32-14.4-32-32v-170.666666c0-17.6 14.4-32 32-32s32 14.4 32 32v170.666666c0 17.6-14.4 32-32 32z" fill="#A8A8B4" p-id="5711"></path><path d="M515.562667 298.666667c-17.6 0-32-14.4-32-32v-85.333334c0-17.6 14.4-32 32-32s32 14.4 32 32v85.333334c0 17.6-14.4 32-32 32z" fill="#F9A825" p-id="5712"></path><path d="M213.333333 597.333333c0 17.6-14.4 32-32 32h-85.333333c-17.6 0-32-14.4-32-32s14.4-32 32-32h85.333333c17.6 0 32 14.4 32 32zM960 597.333333c0 17.6-14.4 32-32 32h-85.333333c-17.6 0-32-14.4-32-32s14.4-32 32-32h85.333333c17.6 0 32 14.4 32 32z" fill="#F9A825" p-id="5713"></path><path d="M300.821333 386.154667a32.106667 32.106667 0 0 1-45.248 0l-60.330666-60.330667a32.106667 32.106667 0 0 1 0-45.248 32.106667 32.106667 0 0 1 45.248 0l60.330666 60.330667a32.106667 32.106667 0 0 1 0 45.248zM723.178667 386.154667a32.106667 32.106667 0 0 1 0-45.248l60.330666-60.330667a32.106667 32.106667 0 0 1 45.248 0 32.106667 32.106667 0 0 1 0 45.248l-60.330666 60.330667a32.106667 32.106667 0 0 1-45.248 0zM372.736 725.333333a191.04 191.04 0 0 1-49.173333-128c0-106.048 85.952-192 192-192s192 85.952 192 192a191.146667 191.146667 0 0 1-49.173334 128h78.656a254.570667 254.570667 0 0 0 34.517334-128c0-141.376-114.624-256-256-256s-256 114.624-256 256c0 46.677333 12.693333 90.304 34.517333 128h78.656z" fill="#F9A825" p-id="5714"></path></svg>);
const nightSvg = () => (<svg t="1647334215120" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7465" width="200" height="200"><path d="M466.2784 386.048c-41.9328-115.2-35.0208-236.288 10.0864-340.5312A462.4896 462.4896 0 0 0 397.6704 66.56C158.5152 153.6 35.2256 418.048 122.2656 657.2032s351.488 362.4448 590.592 275.4048c123.9552-45.1072 216.7296-137.8816 265.3184-250.0608-215.8592 37.7856-434.3296-83.3536-511.8976-296.4992z" fill="#FFB612" p-id="7466"></path></svg>);

const MorningIcon = props => <Icon component={morningSvg} {...props} />;
const AfternoonIcon = props => <Icon component={afternoonSvg} {...props} />;
const NightIcon = props => <Icon component={nightSvg} {...props} />;


class TodoPanel extends Component {
    constructor(props) {
      super(props);
      this.handleTodoItemClick = this.handleTodoItemClick.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleFinish = this.handleFinish.bind(this);
    }

    handleTodoItemClick(e) {
      const id = e.currentTarget.id;
      console.log("选中item: " + id);
      this.props.setTodoFormData(id);
    }

    handleDelete(id) {
      // const id = e.currentTarget.id;
      console.log("handledelete ");
      console.log(id);
      this.props.handleDelete(id);
    }

    handleFinish(id) {
      // const id = e.currentTarget.id;
      console.log("handleFinish ");
      console.log(id);
      this.props.handleFinish(id);
    }    

    render() {
      // console.log(logo_morning);
      const todoList = this.props.todoList;
      const map_time_logo = {1: <MorningIcon />, 2: <AfternoonIcon/>, 3: <NightIcon/>};
      const tag_colors = ["success", "processing", "error", "warning", "default"];
      return (
        <div id="scrollableDiv" className="todo-panel">
        <h2>干活儿</h2>
        <InfiniteScroll
          dataLength={todoList.length}
        //   hasMore={todoList.length < 50}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={todoList}
            renderItem={item => (
                <div>
                  <Divider style={{margin:'0px'}}/>
                  <List.Item key={item.id} onClick={this.handleTodoItemClick} id={item.id}>
                    <div className="todo-item">
                      <Row justify="space-around">
                        <Col span={6}>
                          <div className="todo-date">
                            <p className="date-font">{item.date}</p>
                            {map_time_logo[item.time]}
                          </div>
                        </Col>
                        <Col span={12}>
                          <div>
                            <h4>{item.title}</h4>
                            <div>{item.tags.map((item, index) => (<Tag color={tag_colors[index%5]}>{item}</Tag>))}</div>
                            <p style={{"paddingTop": "6px"}}>{item.text}</p>
                          </div>
                        </Col>
                        <Col span={4}>
                          <div className="todo-button">
                            <div><Button onClick={(e) => this.handleFinish(item.id)}><CheckCircleOutlined /></Button></div>
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

export default TodoPanel;