import { EdgeView, ToolsView } from '@antv/x6';


export class PopoverToolComponent extends ToolsView.ToolItem<EdgeView, PopoverToolOptions>{
  private knob: HTMLDivElement;
  private popover: HTMLDivElement;
  private popoverVisible = false;

  override onRender() {
    if (!this.knob) {
      this.knob = ToolsView.createElement('div', false) as HTMLDivElement;
      this.popover = ToolsView.createElement('div', false) as HTMLDivElement;
      const arrow = ToolsView.createElement('div', false) as HTMLDivElement;
      const body = ToolsView.createElement('div', false) as HTMLDivElement;
      const btn = ToolsView.createElement('button', false) as HTMLElement
      this.initKnob();
      this.initPopover(body, arrow, btn);
      this.container.appendChild(this.knob);
      document.addEventListener('mouseover', (e) => {
        if (this.popoverVisible &&
          e.target !== this.popover &&
          e.target !== body &&
          e.target !== arrow &&
          e.target !== btn) {
          this.hidePopover();
        }
      })
    }
    return this
  }

  override update(): this {
    this.getPosition();
    return this;
  }

  override delegateEvents() {
    this.cellView.on('edge:connected', this.getPosition, this)

    return super.delegateEvents()
  }

  protected override onRemove() {
    this.cellView.off('edge:connected', this.getPosition, this)
  }

  private initKnob() {
    this.knob.style.position = 'absolute';
    this.knob.style.display = 'block';
    this.knob.style.cursor = 'pointer';
    this.knob.style.background = '#d8d8d8';
    this.knob.style.textAlign = 'center';
    this.knob.style.color = '#868c91';
    this.knob.style.lineHeight = '16px';
    this.knob.style.width = '16px';
    this.knob.style.height = '16px';
    this.knob.textContent = 'n';
    this.knob.onmouseover = (e) => {
      e.stopPropagation();
      this.knob.style.background = '#188ffd';
      this.knob.style.color = '#ffffff';
      this.showPopover();
    };
    this.knob.onmouseout = () => {
      this.knob.style.background = '#d8d8d8';
      this.knob.style.color = '#868c91';

    };
  }

  private initPopover(body: HTMLDivElement, arrow: HTMLDivElement, btn: HTMLElement) {
    this.popover.appendChild(body);
    this.popover.appendChild(arrow);
    this.popover.style.position = 'absolute';
    this.popover.style.alignItems = 'center';
    body.style.background = '#ffffff';
    body.style.boxShadow = '5px 5px 10px rgba(17,17,26,0.1)';
    //TODO 展示表与表之间的关系
    body.textContent = 'N   :   1';
    body.style.lineHeight = '50px';
    body.style.textAlign = 'center';
    body.style.width = '150px';
    body.style.height = '50px';
    arrow.style.width = '0px';
    arrow.style.height = '0px';
    arrow.style.borderLeft = '6px solid transparent';
    arrow.style.borderTop = '10px solid #ffffff';
    arrow.style.borderRight = '6px solid transparent';
    arrow.style.marginLeft = '69px';
    btn.textContent = '删除'
    btn.style.textAlign = 'center'
    btn.style.paddingLeft = '10px'
    btn.style.marginLeft = '50px'
    btn.style.borderLeft = '1px solid #d8d8d8'
    btn.onclick = () => { this.cell.remove() }
    btn.onmouseover = () => { btn.style.color = 'red' }
    btn.onmouseout = () => { btn.style.color = '#000000' }
    body.appendChild(btn);
  }

  private getPosition() {
    const bbox = this.cellView.getBBox();
    this.knob.style.top = bbox.y + bbox.height / 2 - 8 + 'px'
    this.knob.style.left = bbox.x + bbox.width / 2 - 8 + 'px'
    this.popover.style.top = bbox.y + (bbox.height / 2) - 8 - 60 + 'px'
    this.popover.style.left = bbox.x + (bbox.width / 2) - 8 - 67 + 'px'
  }

  private hidePopover() {
    this.popoverVisible = false;
    this.container.removeChild(this.popover);

  }

  private showPopover() {
    this.popoverVisible = true;
    this.container.appendChild(this.popover);
  }
}
PopoverToolComponent.config({
  tagName: 'div',
  isSVGElement: false,
});
export interface PopoverToolOptions extends ToolsView.ToolItem.Options {
  tooltip?: string
}