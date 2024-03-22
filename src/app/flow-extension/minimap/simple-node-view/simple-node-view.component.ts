
import { NodeView } from '@antv/x6'

export class SimpleNodeView extends NodeView {
  protected override renderMarkup() {
    return this.renderJSONMarkup({
      tagName: 'rect',
      selector: 'body',
    })
  }

  override update() {
    super.update({
      body: {
        refWidth: '100%',
        refHeight: '100%',
        fill: '#ced4de',
      },
    })
  }
}