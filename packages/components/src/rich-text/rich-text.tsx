import { uniComponent, PropType, h, uni2Platform, useRef, onMounted, ref } from '@uni-component/core'

interface Attributes {
  [propName: string]: string | {
    [propName: string]: string
  }
}

interface NodeType {
  name: string
  attrs?: Attributes
  children?: ElementType[]
}

interface TextType {
  type: 'text'
  text: string
}

type ElementType = NodeType | TextType

type StringType = string

export type Nodes = ElementType[] | StringType

const UniRichText = uniComponent('uni-rich-text', {
  nodes: [Array, String] as PropType<Nodes>
}, (_, props) => {
  const ele = ref<HTMLDivElement>()
  const setEleRef = useRef(ele)

  onMounted(() => {
    const el = ele.value!
    const nodes = props.nodes
    if (!Array.isArray(nodes)) {
      el.innerHTML = props.nodes as StringType
    }
  })

  return {
    setEleRef
  }
})

UniRichText.render = function (props, state) {
  const { nodes } = props
  const { rootClass, setEleRef } = state

  const renderNode = (node: ElementType) => {
    if ('type' in node && node.type === 'text') {
      // unsupport Html Entries
      const content = (node.text || '').replace(/&nbsp;/g, '\u00A0')
      return content
    } else if ('name' in node && node.name) {
      const {
        name,
        attrs,
        children
      } = node
      const attributes: Attributes = {}
      let childList: any[] = []

      if (attrs && typeof attrs === 'object') {
        for (const key in attrs) {
          const val = attrs[key]
          if (key === 'style' && typeof val === 'string') {
            // stencil JSX style props only support object
            const styles = val
              .split(';')
              .map(item => item.trim())
              .filter(item => item)

            const styleObj: {
              [propName: string]: string
            } = {}

            styles.forEach(item => {
              if (!item) return

              const res = /(.+): *(.+)/g.exec(item)
              if (!res) return

              const [, name, value] = res
              const styleName = name.replace(/-([a-z])/g, (...args) => args[1].toUpperCase())
              styleObj[styleName] = value
            })

            if (Object.keys(styleObj).length) {
              attributes.style = styleObj
            }

            continue
          }
          attributes[key] = val
        }
      }

      if (children && children.length) {
        childList = children.map(node => renderNode(node))
      }

      return h(name, attributes, childList)
    }

    return null
  }

  if (Array.isArray(nodes)) {
    return (
      <div ref={setEleRef} class={rootClass}>
        {nodes.map(node => renderNode(node))}
      </div>
    )
  } else {
    return (
      <div ref={setEleRef} class={rootClass}></div>
    )
  }
}

export const RichText = uni2Platform(UniRichText)
