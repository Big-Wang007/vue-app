import {
  Button,
  // Layout,
  // Alert,
  // Breadcrumb,
  // Menu,
  Form,
  Input,
  // message,
  Table,
  // DatePicker,
  Select,
  Row,
  Col,
  ConfigProvider,
  Dropdown,
  Avatar,
  Pagination,
  Badge,
} from "ant-design-vue";

export default function installAntd(app) {
  app.use(Button);
  // app.use(Layout);
  // app.use(Alert);
  // app.use(Breadcrumb);
  // app.use(Menu);
  app.use(Form);
  app.use(Input);
  app.use(Table);
  // app.use(DatePicker);
  app.use(Select);
  app.use(Row);
  app.use(Col);
  app.use(ConfigProvider);
  app.use(Dropdown);
  app.use(Avatar);
  app.use(Pagination);
  app.use(Badge);
  // message.config({
  //   top: `100px`,
  //   duration: 2,
  //   maxCount: 3,
  //   rtl: true,
  //   prefixCls: "my-message",
  // });
  // app.provide("$message", message);
}
