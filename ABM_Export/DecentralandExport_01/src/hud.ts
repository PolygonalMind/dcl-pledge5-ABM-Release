import { 
  Widget, WidgetTalk, setWidgetNFT, getWidgetNFT, WidgetNFT, 
  WGIconList, WGIconListInfo, WidgetTextPanel, SkipMode
} from "./imports/index"
import { textDialogs} from './jsonData/textsData'

class WidgetRobot extends WidgetTalk{
  show(bVisible: boolean){
    super.show(bVisible)
    if (!bVisible) {
      this.callback()
    }
  }
}

var hud: HUD = null

export function getHUD(){
    if (!hud) {
      spawnHUD()
    }
    return hud
}

function spawnHUD(){
  hud = new HUD()
}

export class HUD {
  canvas: UICanvas
  widgets: Widget[]
  wgIconList: WGIconList[]
  wgTalk: WidgetRobot
  wgNFT: WidgetNFT
  wgTextPanel: WidgetTextPanel
  constructor(){
    this.canvas = new UICanvas()
    this.canvas.visible = true
    this.wgTalk = new WidgetTalk(this.canvas, 1, true, SkipMode.Click)
    setWidgetNFT(this.canvas)
    this.wgNFT = getWidgetNFT()
    this.widgets = [this.wgNFT, this.wgTalk]
    this.wgIconList = []

  }
  setWidgetDialogIndex(widget: number | WidgetTalk, newIndex: number){
    try {
      let widgetTalk: WidgetTalk
      if (typeof widget == 'number') {
        widgetTalk = this.widgets[widget] as WidgetTalk
      }
      else {
        widgetTalk = widget as WidgetTalk
      }
      widgetTalk.dialogIndex = newIndex
      widgetTalk.dialogData = textDialogs[newIndex]
      widgetTalk.textData = {
        dialogId: newIndex,
        textId: -1
      }
    } catch (error) {
      
    }
    
  }
  showWidgetIndex(index: number, hideOthers:boolean, showForTime: number=0){
    if (hideOthers) {
      this.hideAll()
    }
    if (this.widgets[index]) {
      if(showForTime>0){
        this.widgets[index].showForTime(true, showForTime)
      }
      else {this.widgets[index].show(true)}
    }

  }
  hideWidgetIndex(index: number){
    if (this.widgets[index] && this.widgets[index].container.visible) {
      this.widgets[index].show(false);
    }
  }
  hideAll(){
    for (let i = 0; i < this.widgets.length; i++) {
      this.hideWidgetIndex(i)
    }
  }
  createIconList(listInfo?: WGIconListInfo){
      const iconList = new WGIconList(this.canvas, listInfo)
      this.wgIconList.push(iconList)
      this.widgets.push(iconList)
      return iconList
  }
  getWidgetTextPanel(){
    if (!this.wgTextPanel) {
      this.wgTextPanel = new WidgetTextPanel(this.canvas)
      this.widgets.push(this.wgTextPanel)
    }
    return this.wgTextPanel
  }

}


