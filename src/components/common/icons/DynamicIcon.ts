import { h } from 'vue'
import * as Icon from '@ant-design/icons-vue'

const DynamicIcon = ({ name, style }: { name: string, style?: string }) => {
  return h((Icon as any)[name], { style })
}

DynamicIcon.props = ['name']

export default DynamicIcon
