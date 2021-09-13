import { Widget, ImageSize } from "./widgets"
import { TextPanelData, WidgetTextPanel } from "./widgetTextPanel";


export type WGIconInfo = {
    imageURL?: string
    imageSize?: ImageSize
    imageScale?: ImageSize | number
    vAlign?: string
    hAlign?: string
    bVisible?: boolean
    onClickFunction?: () => void
}

export type WGIconListInfo = {
  vAlign?: string
  hAlign?: string
  positionX?: number
  positionY?: number
  spacing?: number
  stackOrientation?: UIStackOrientation
  bVisible?: boolean
  bDebug?: boolean
}

export class WGIconList extends Widget{
  childrenWidget: WGIcon[]
  constructor(
      parentUI: Widget | UIShape,
      listInfo: WGIconListInfo = { }
  ){
    var parent: UIShape;
    if (parentUI as Widget) {
      parent = (parentUI as Widget).container
    }
    else if(parentUI as UIShape){
      parent = (parentUI as UIShape)
    }

    if (!listInfo.vAlign) listInfo.vAlign = 'center'
    if (!listInfo.hAlign) listInfo.hAlign = 'left'
    if (!listInfo.positionX) listInfo.positionX = 1
    if (!listInfo.positionY) listInfo.positionY = 25
    if (!listInfo.spacing) listInfo.spacing = 6
    if (!listInfo.stackOrientation) listInfo.stackOrientation = UIStackOrientation.VERTICAL


    var container = new UIContainerStack(parent)
    container.stackOrientation = listInfo.stackOrientation
    container.spacing = listInfo.spacing

    container.vAlign = listInfo.vAlign
    container.hAlign = listInfo.hAlign
    container.positionX = listInfo.positionX+'%'
    container.positionY = listInfo.positionY+'%'
    
    container.adaptHeight = false
    container.adaptWidth = false
    super(parentUI, container)
    this.childrenWidget = []

    if (listInfo.bVisible) {
      this.show(true)
    }

    if (listInfo.bDebug) {
      container.visible = true
      container.color = new Color4(0.8,0.8,0.8,0.5)
    }
    
  }
  createIcon(iconInfo?: WGIconInfo){
    const icon = new WGIcon(this, iconInfo)
    this.childrenWidget.push(icon)
  }
  createIconURL(url: string, iconInfo?: WGIconInfo){
    if(!iconInfo) { iconInfo = {} }
    iconInfo.onClickFunction = function() {
      openExternalURL(url)
    }
    this.createIcon(iconInfo)
  }
  createIconShowWG(wg: Widget, iconInfo?: WGIconInfo, panelData?: TextPanelData){
    if(!iconInfo) { iconInfo = {} }
    iconInfo.onClickFunction = function() {
      if (panelData) {
        try {
          (wg as WidgetTextPanel).setPanelData(panelData)
        } catch (error) {}
      }
      wg.show(!wg.container.visible)
    }
    this.createIcon(iconInfo)
  }
}

export class WGIcon extends Widget{
  imageURL: string
  image: UIImage
  clickFuntion: ()=>void
  constructor(
      parentUI: Widget | UIShape,
      iconInfo: WGIconInfo = { }
  ){
    var parent: UIShape;
    if (parentUI as Widget) {
      parent = (parentUI as Widget).container
    }
    else if(parentUI as UIShape){
      parent = (parentUI as UIShape)
    }

    if (!iconInfo.imageURL) iconInfo.imageURL = "assets/UI_Icon_Info.png"
    if (!iconInfo.imageSize) iconInfo.imageSize = {x: 225, y:225}
    if (!iconInfo.vAlign) iconInfo.vAlign = 'center'
    if (!iconInfo.hAlign) iconInfo.vAlign = 'center'

    if (!iconInfo.imageScale) {
      iconInfo.imageScale = {x: 1, y:1}
    }
    else if(typeof iconInfo.imageScale == "number"){
      iconInfo.imageScale = {x: iconInfo.imageScale, y: iconInfo.imageScale}
    }

    const image = new UIImage(parent, new Texture(iconInfo.imageURL))
    image.sourceWidth = iconInfo.imageSize.x
    image.sourceHeight = iconInfo.imageSize.y
  
    image.width = image.sourceWidth*iconInfo.imageScale.x+'px'
    image.height = image.sourceHeight*iconInfo.imageScale.y+'px'
    
    image.vAlign = iconInfo.vAlign
    image.hAlign = iconInfo.hAlign

    super(parentUI, image)
    this.image = image
    
    if (iconInfo.onClickFunction) { this.setClickEvent(iconInfo.onClickFunction) }
    image.visible = (iconInfo.bVisible == true)

  }
  setClickEvent(clickFuntion:() => void){
    this.image.isPointerBlocker = true
    this.clickFuntion = clickFuntion
    this.image.onClick = new OnClick (()=>{
      clickFuntion()
    })
  }
  removeClickEvent(){
    if (this.image.onClick) {
      this.image.isPointerBlocker = false
      this.image.onClick = null
    }
  }
}