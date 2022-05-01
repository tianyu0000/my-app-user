import React, { useEffect, useState } from "react";
import styles from './styles.module.scss'
import classNames from "classnames/bind";
import dayjs from 'dayjs'
import {
  Form,
  Input,
  Button,
  Dialog,
  Checkbox,
  Space,
  DatePicker,
} from 'antd-mobile'
import { CloseCircleFill } from 'antd-mobile-icons'
import { DatePickerFilter } from "antd-mobile/es/components/date-picker";
import moment from "moment";

const cx = classNames.bind(styles)

const DatePick: React.FC = () => {
  const [pickerVisible_start, setpickerVisible_start] = useState(false)
  const [pickerVisible_end, setpickerVisible_end] = useState(false)

  useEffect(() => {
  }, [])
  return <><Form.Item
    style={{ 'height': '20px', 'width': '100%' }}
    noStyle
    shouldUpdate={(prevValues, curValues) =>
      prevValues.date_start !== curValues.date_start
    }
  >
    {({ getFieldValue, setFieldsValue }) => (
      <Form.Item
        name='date_start'
        trigger='onConfirm'
        // label='起始日期'
        arrow={
          getFieldValue('date_start') ? (
            <CloseCircleFill
              style={{
                color: 'var(--adm-color-light)',
                fontSize: 14,
              }}
              onClick={e => {
                e.stopPropagation()
                setFieldsValue({ date_start: null })
              }}
            />
          ) : (
            true
          )
        }
        onClick={() => {
          setpickerVisible_start(true)
        }}
      >
        <DatePicker
          visible={pickerVisible_start}
          onClose={() => {
            setpickerVisible_start(false)
          }}
        >
          {value =>
            value ? dayjs(value).format('YYYY-MM-DD') : '请选择：起始日期'
          }
        </DatePicker>
      </Form.Item>
    )}
  </Form.Item>
    <Form.Item
      style={{ 'height': '20px', 'width': '100%' }}
      noStyle
      shouldUpdate={(prevValues, curValues) =>
        prevValues.date_end !== curValues.date_end
      }
    >
      {({ getFieldValue, setFieldsValue }) => (
        <Form.Item
          name='date_end'
          trigger='onConfirm'
          // label='起始日期'
          arrow={
            getFieldValue('date_end') ? (
              <CloseCircleFill
                style={{
                  color: 'var(--adm-color-light)',
                  fontSize: 14,
                }}
                onClick={e => {
                  e.stopPropagation()
                  setFieldsValue({ date_end: null })
                }}
              />
            ) : (
              true
            )
          }
          onClick={() => {
            setpickerVisible_end(true)
          }}
        >
          <DatePicker
            visible={pickerVisible_end}
            onClose={() => {
              setpickerVisible_end(false)
            }}
          >
            {value =>
              value ? dayjs(value).format('YYYY-MM-DD') : '请选择：截止日期'
            }
          </DatePicker>
        </Form.Item>
      )}
    </Form.Item>
  </>
}
export default DatePick;