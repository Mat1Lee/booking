import React, { useState } from 'react'
import BaseBorderBox from './BaseBorderBox'
import { Col, DatePicker, Form, Input, Row,Button, Select } from 'antd';
import RenderLoading from './RenderLoading';
import { LIST_TYPE } from '../constants/list';
import { filterAcrossAccents } from '../helper';
import subVn from '../core/list';
export default function HighFilter({onCancel}) {
    const [isLoading, setLoading] = useState(false);
    const layoutRow = {
        gutter: 16,
      };
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values);
        
    };
    const options = Object.keys(LIST_TYPE).map((key) => ({ value: key, label: LIST_TYPE[key].label }));
    const districts = subVn.getDistrictsByProvinceCode('72');
  return (
    <Form
    form={form}
    onFinish={onFinish}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    labelAlign="left"
    scrollToFirstError={true}

    initialValues={{
      variants: [
        {
          exchangeValue: 1,
          variantIsDefault: true,
        },
      ],
    }}
  >
    {/* <BaseBorderBox title={"Khoảng ngày"}>
      <Row {...layoutRow}>
        <Col style={{ paddingBottom: 10 }} span={12}>
          <Form.Item
            label="Ngày bắt đầu"
            name={'startDate'}
          >
            <DatePicker  />
          </Form.Item>
        </Col>
        <Col style={{ paddingBottom: 10 }} span={12}>
          <Form.Item
            label="Ngày kết thúc"
            name={'endDate'}
          >
            <DatePicker  />
          </Form.Item>
        </Col>
      </Row>
    </BaseBorderBox> */}
    <BaseBorderBox >
      <Row {...layoutRow}>
        <Col span={12}>

              <Form.Item
                label="Quận/Huyện"
                name={"districtId"}
                rules={[
                  {
                    required: true,
                    message: "Xin vui lòng chọn Quận/Huyện!",
                  },
                ]}
              >
                {isLoading ? (
                  <Skeleton.Input active />
                ) : (
                  <Select
                    // disabled={!form.getFieldValue(["address", "cityId"])}
                    onChange={(value) => {
                      // setDistrictCode && setDistrictCode(value);
                      form && form.setFieldsValue && form.setFieldsValue({
                       
                          wardId : null
                        
                      });
                    }}
                    showSearch
                    filterOption={filterAcrossAccents}
                  >
                    {districts.map(({ code, name }) => (
                      <Option key={code} value={code}>
                        {name}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
           
        </Col>
        <Col span={12}>
          <Form.Item
            label="Loại nhà đất"
            name={"type"}
          >
           <Select
          style={{ width: 120 }}
          value={options[0].value}
          options={options}
          onChange={(value) => {}
          }
        />
          </Form.Item>
        </Col>
      </Row>
      <Row {...layoutRow}>

        <Col span={12}>
          <Form.Item
            label="Giá"
            name={"price"}
          >
            {RenderLoading(isLoading, <Input />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Số phòng tắm"
            name={"bathRooms"}
          >
            {RenderLoading(isLoading, <Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row {...layoutRow}>

        <Col span={12}>
          <Form.Item
            label="Diện tích"
            name={"area"}
          >
            {RenderLoading(isLoading, <Input />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Số phòng ngủ"
            name={"bedRooms"}
          >
            {RenderLoading(isLoading, <Input />)}
          </Form.Item>
        </Col>
      </Row>
    </BaseBorderBox>

    <Row justify={"end"} gutter={16}>
      <Col>
        <Button onClick={onCancel}>
          Huỷ
        </Button>
      </Col>
      <Col>
        <Button
        style={{color:'black'}}
        //   loading={isSubmitLoading}
          htmlType="submit"
          type="primary"
        >
          {"Tìm kiếm"}
        </Button>
      </Col>
    </Row>
  </Form>
  )
}
