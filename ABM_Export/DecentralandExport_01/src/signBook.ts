import { UserService } from "./imports/services/userService"


const LIMIT = 33

type signInfo = {
  nSigns: number,
  page: number,
  nPages: number,
  nextPage: boolean,
  signs: any[],
  bPendingRequest: boolean,
  bAlreadySigned: boolean
}

var requestInfo: signInfo = {
  bPendingRequest: false,
  bAlreadySigned: false,
  nSigns: 0,
  page: 0,
  nextPage: false,
  nPages: 0,

  signs: [],
}


function signatureListRequest(newpage: number, callback = function(){}){
  if (requestInfo.bPendingRequest==false) {
    requestInfo.bPendingRequest = true
    requestInfo.page = newpage
    executeTask(async () => {
      try {
        
        let response = await fetch("https://v2.lowpolyhub.com:3000/signatures?signbook=abm&skip="+requestInfo.page*LIMIT+"&limit="+LIMIT, {
          headers: { "Content-Type": "application/json" },
          method: "GET"
        })

        /*let response = await fetch("https://lowpolyhub.com:3000/api/signatures/abm/1?skip="+requestInfo.page*LIMIT+"&limit="+LIMIT, {
          headers: { "Content-Type": "application/json" },
          method: "GET"
        })*/
        let json = await response.json()
        if (response.status && response.status==200) {
          requestInfo.signs = json
          //requestInfo.nSigns = json.result.totalSigns
          //requestInfo.nPages = Math.ceil(requestInfo.nSigns/LIMIT)
          if (requestInfo.signs.length==LIMIT) {
            requestInfo.nextPage = true
          }
          else{
            requestInfo.nPages = requestInfo.page+1
            requestInfo.nextPage = false
          }
   
          requestInfo.bPendingRequest = false
          callback()
          console_log(requestInfo);
        }
        else{
          throw new Error(json)
        }
        /*if (json.status && json.status=="success") {
          requestInfo.signs = json.result.signs
          requestInfo.nSigns = json.result.totalSigns
          requestInfo.nPages = Math.ceil(requestInfo.nSigns/LIMIT)
          requestInfo.bPendingRequest = false
          callback()
          console_log(requestInfo);
        }
        else{
          throw new Error(json.error)
        }*/

      } catch (e){
        requestInfo.bPendingRequest = false
        log("failed to reach URL")
        console_log(e);
      }
    })
  }
}

function signBookRequest(address:string, name:string, callback = function(){}){
  if (requestInfo.bAlreadySigned==false) {
    requestInfo.bAlreadySigned = true
    executeTask(async () => {
      try {
        await UserService.instance().signAndLogin()
        const loginToken = UserService.instance().getAccessToken()      
        const body = {
          signbook: "abm",
          wallet: address,
          username: name
        }
        let response = await fetch("https://v2.lowpolyhub.com:3000/signatures", {
          headers: { 
            "Authorization": "Bearer "+loginToken,
            "Content-Type": "application/json" 
          },
          body: JSON.stringify(body),
          method: "POST"
        })
        let json = await response.json()
        if (response.status && response.status==200) {
          callback()
        }
        else{
          throw new Error(json.message)
        }
        /*let response = await fetch("https://lowpolyhub.com:3000/api/signatures/abm/1?address="+address+"&name="+name, {
          headers: { "Content-Type": "application/json" },
          method: "POST"
        })
        let json = await response.json()
        if (json.status && json.status=="success") {
          console_log(json);
          callback()
        }
        else{
          throw new Error(json.error)
        }*/

      } catch (e){
        requestInfo.bAlreadySigned = false
        log("failed to reach URL")
        console_log(e);
      }
    })
  }
}

@Component("SignPanel")
export class SignPanel {
  panelEntity: IEntity
  nextButton: IEntity
  previousButton: IEntity
  pagesEntity: IEntity
  pagesTextShape: TextShape
  panelTextShape1: TextShape
  panelTextShape2: TextShape
  panelTextShape3: TextShape
  constructor(entity: IEntity, panelEntity: IEntity, nextButton: IEntity, backButton: IEntity, pagesEntity: IEntity) {

    const tra = entity.getComponent(Transform)
    this.panelEntity = new Entity()
    this.panelEntity.addComponent(new Transform({
      //position: getEntityWorldPosition(panelEntity), rotation: tra.rotation.clone()
    }))
    //engine.addEntity(this.panelEntity)
    this.panelEntity.setParent(panelEntity)

    this.previousButton = backButton
    this.nextButton = nextButton

    this.pagesEntity = new Entity()
    this.pagesEntity.addComponent(new Transform({
      //position: getEntityWorldPosition(pagesEntity), rotation: tra.rotation.clone()
    }))
    //engine.addEntity(this.pagesEntity)
    this.pagesEntity.setParent(pagesEntity)

    var self = this
    this.nextButton.addComponent(new OnPointerDown(
      e => {
        self.nextPage()
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: "Next page",
        distance: 5
      }
    ))
    this.previousButton.addComponent(new OnPointerDown(
      e => {
        self.previousPage()
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: "Previous page",
        distance: 5
      }
    ))
    this.pagesTextShape = new TextShape()
    this.pagesTextShape.fontSize = 3
    this.pagesTextShape.color = Color3.Black()
    this.pagesTextShape.value = (requestInfo.page+1)+" / -"
    this.pagesEntity.addComponent(this.pagesTextShape)
    this.pagesEntity.getComponent(Transform).rotate(Vector3.Up(), 90)
    this.pagesEntity.getComponent(Transform).translate((new Vector3(-0.05,0,0)))

    this.panelEntity.getComponent(Transform).translate((new Vector3(-0.05,1,0)))
    this.panelEntity.getComponent(Transform).rotate(Vector3.Up(), 90)

    const rows = new Entity()
    rows.addComponent(new Transform({scale:new Vector3(0.7,0.7,0.7)}))
    rows.setParent(this.panelEntity)

    const row1 = new Entity()
    row1.addComponent(new Transform({position: new Vector3(-1.75,0,0)}))
    row1.setParent(rows)
    const row2 = new Entity()
    row2.addComponent(new Transform({position: new Vector3(0,0,0)}))
    row2.setParent(rows)
    const row3 = new Entity()
    row3.addComponent(new Transform({position: new Vector3(1.75,0,0)}))
    row3.setParent(rows)

    /*const title = new Entity()
    title.setParent(this.panelEntity)
    title.addComponent(new Transform({position: new Vector3(0.1,0.4,0)}))*/

    /*var titleText = new TextShape()
    titleText.color = Color3.Black()
    titleText.hTextAlign = "center"
    titleText.vTextAlign = "top"
    titleText.fontSize = 3
    titleText.value = "SIGN BOOK"
    title.addComponent(titleText)*/

    this.panelTextShape1 = new TextShape()
    this.panelTextShape1.color = Color3.Black()
    this.panelTextShape1.hTextAlign = "center"
    this.panelTextShape1.vTextAlign = "top"
    this.panelTextShape1.fontSize = 2
    row1.addComponent(this.panelTextShape1)

    this.panelTextShape2 = new TextShape()
    this.panelTextShape2.color = Color3.Black()
    this.panelTextShape2.hTextAlign = "center"
    this.panelTextShape2.vTextAlign = "top"
    this.panelTextShape2.fontSize = 2
    row2.addComponent(this.panelTextShape2)

    this.panelTextShape3 = new TextShape()
    this.panelTextShape3.color = Color3.Black()
    this.panelTextShape3.hTextAlign = "center"
    this.panelTextShape3.vTextAlign = "top"
    this.panelTextShape3.fontSize = 2
    row3.addComponent(this.panelTextShape3)


    signatureListRequest(0, function(){self.updateSignPanel()})
    self.updateSignPanel()
  }
  nextPage(){
    if (!requestInfo.bPendingRequest && requestInfo.nextPage) {
      var self = this
      self.setLoadingPanel()
      signatureListRequest(requestInfo.page+1, function() {self.updateSignPanel()})

      if (requestInfo.nPages) {
        this.pagesTextShape.value = (requestInfo.page+1)+"/ "+requestInfo.nPages
      }
      else{
        this.pagesTextShape.value = (requestInfo.page+1)+"/ -"
      }
      
    }
  }
  previousPage(){
    if (!requestInfo.bPendingRequest && requestInfo.page-1>=0) {
      var self = this
      self.setLoadingPanel()
      signatureListRequest(requestInfo.page-1, function() {self.updateSignPanel()})
      if (requestInfo.nPages) {
        this.pagesTextShape.value = (requestInfo.page+1)+"/ "+requestInfo.nPages
      }
      else{
        this.pagesTextShape.value = (requestInfo.page+1)+"/ -"
      }
    }
  }
  setLoadingPanel(){
    this.panelTextShape1.value = ""
    this.panelTextShape3.value = ""
    this.panelTextShape2.value = "Loading ....."
  }
  updateSignPanel(){
    if (requestInfo.nPages) {
      this.pagesTextShape.value = (requestInfo.page+1)+"/ "+requestInfo.nPages
    }
    else{
      this.pagesTextShape.value = (requestInfo.page+1)+"/ -"
    }
    this.panelTextShape1.value = ""
    this.panelTextShape2.value = ""
    this.panelTextShape3.value = ""
    for (let i = 0; i < requestInfo.signs.length; i++) {
      if ((i+1)%3==1) {
        this.panelTextShape1.value += requestInfo.signs[i].username+"\n"
      }
      else if((i+1)%3==2){
        this.panelTextShape2.value += requestInfo.signs[i].username+"\n"
      }
      else if((i+1)%3==0){
        this.panelTextShape3.value += requestInfo.signs[i].username+"\n"
      }
    }

  }
}

@Component("SignBook")
export class SignBook {
  entity: IEntity
  address: string
  name: string
  signPannels: SignPanel[]
  constructor(entity: IEntity, address: string, name: string, signPannels: SignPanel[]) {
    this.entity = entity
    this.address = address
    this.name = name
    this.signPannels = signPannels
    var self = this
    this.entity.addComponent(new OnPointerDown(
      e => {
        signBookRequest(address, name, function(){
          signatureListRequest(requestInfo.nPages-1, function(){
            for (let i = 0; i < self.signPannels.length; i++) {
              self.signPannels[i].updateSignPanel();
            }
          })
        })
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: "Sign in the book",
        distance: 5
      }
    ))
  }
}
