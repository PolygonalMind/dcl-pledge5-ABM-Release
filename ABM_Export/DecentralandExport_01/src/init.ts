import { TagComponent, Widget, WidgetTalk } from "./imports/index"
import { SignPanel,SignBook } from "./signBook"
import { getUserData } from '@decentraland/Identity'
import { getUserAccount } from '@decentraland/EthereumController'
import { getHUD } from "./hud"

var hud = getHUD()

function loadNPCs() {
  for (const entityId in engine.getEntitiesWithComponent(TagComponent)) {
    const entity = engine.getEntitiesWithComponent(TagComponent)[entityId] as Entity
    if(entity.getComponent(TagComponent).tag=="NPC1"){
      const collisionEntity = new Entity()
      collisionEntity.addComponent(new BoxShape())
      collisionEntity.addComponent(new Material())
      collisionEntity.getComponent(Material).albedoColor = new Color4(0,0,0,0)
      collisionEntity.addComponent(new Transform({ position: new Vector3(0,1,0),scale: new Vector3(1,2,1)}))
      collisionEntity.setParent(entity)
      
      collisionEntity.addComponent(new OnPointerDown(
        function() {
          if(!hud.wgTalk.container.visible){
            collisionEntity.getComponent(OnPointerDown).distance = 0
            hud.setWidgetDialogIndex(hud.wgTalk, 0)
            hud.showWidgetIndex(1, true)
            hud.wgTalk.callback = function() {
              collisionEntity.getComponent(OnPointerDown).distance = 8
            }
          }
          
        },
        {
          button: ActionButton.POINTER,
          hoverText: "Talk",
          distance: 8
        }
      ))
    }
    else if(entity.getComponent(TagComponent).tag=="NPC2"){
      const collisionEntity = new Entity()
      collisionEntity.addComponent(new BoxShape())
      collisionEntity.addComponent(new Material())
      collisionEntity.getComponent(Material).albedoColor = new Color4(0,0,0,0)
      collisionEntity.addComponent(new Transform({ position: new Vector3(0,1,0),scale: new Vector3(1,2,1)}))
      collisionEntity.setParent(entity)
      
      collisionEntity.addComponent(new OnPointerDown(
        function() {
          if(!hud.wgTalk.container.visible){
            collisionEntity.getComponent(OnPointerDown).distance = 0
            hud.setWidgetDialogIndex(hud.wgTalk, 1)
            hud.showWidgetIndex(1, true)
            hud.wgTalk.callback = function() {
              collisionEntity.getComponent(OnPointerDown).distance = 8
            }
          }
          
        },
        {
          button: ActionButton.POINTER,
          hoverText: "Talk",
          distance: 8
        }
      ))
    }
  }
}

//   Load Sign Panel
function loadSignPanel(address:string, name:string) {
  var signPanelsArray: SignPanel[] = []
  for (const entityId in engine.getEntitiesWithComponent(TagComponent)) {
    let entity: Entity = engine.getEntitiesWithComponent(TagComponent)[entityId] as Entity
    if (entity.getComponent(TagComponent).tag=="Signpanel") {
      let panelInfo = {
        board: null, next: null, back: null, pages: null
      }
      for (const childid in entity.children) {
        let child = entity.children[childid]
        if (child.hasComponent(TagComponent)) {
          if (child.getComponent(TagComponent).tag=="Signpanel_Board") {
            panelInfo.board = child
          }
          else if (child.getComponent(TagComponent).tag=="Signpanel_Next") {
            panelInfo.next = child
          }
          else if (child.getComponent(TagComponent).tag=="Signpanel_Back") {
            panelInfo.back = child
          }
          else if (child.getComponent(TagComponent).tag=="Signpanel_Pages") {
            panelInfo.pages = child
          }
        }
      }
      if (panelInfo.board && panelInfo.next && panelInfo.back && panelInfo.pages) {
        var pannel = new SignPanel(entity, panelInfo.board, panelInfo.next, panelInfo.back, panelInfo.pages)
        entity.addComponent(pannel)
        signPanelsArray.push(pannel)
      }
    }
  }
  for (const entityId in engine.getEntitiesWithComponent(TagComponent)) {
    let entity: IEntity = engine.getEntitiesWithComponent(TagComponent)[entityId]
    if (entity.getComponent(TagComponent).tag=="Signpanel_Sign") {
        entity.addComponent(new SignBook(entity, address, name, signPanelsArray))
    }
  }
}


//Load user name/id
executeTask(async () => {
    try {
      const userData = await getUserData()
      const address = await getUserAccount()
      loadSignPanel(address, userData.displayName)
    } catch (error) {
      log(error.toString())
    }
})

export const loadInit = function(){
  loadNPCs()
}
loadInit()
