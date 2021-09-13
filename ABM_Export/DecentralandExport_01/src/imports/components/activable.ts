import { getUserAccount } from "@decentraland/EthereumController";
import { TokenInfo } from "../eth/eth";
import { hasTokenInList } from "../eth/tokenCheck";
import { hasPoap } from "./poap";


export enum ActivableAction {
    ignore = 0,
    deactivate = 1,
    activate = 2
}
  
export type ActivableShapeConfig = {
    activateOnSpawn?: boolean
    success?: {
        collision?: ActivableAction
        visible?: ActivableAction
    }
    fail?: {
        collision?: ActivableAction
        visible?: ActivableAction
    }
}
  
export function actionToBoolean(action: ActivableAction): boolean {
    switch (action) {
      case ActivableAction.ignore:
        return;
      case ActivableAction.deactivate:
        return false;
      case ActivableAction.activate:
        return true; 
      default:
        break;
    }
}

interface IActivable{
    bActive: Boolean
    activate(bActivate: boolean): void
}

export class Activable implements IActivable{
    bActive: boolean
    constructor(){
    }
    activate(bActivate: boolean){
        this.bActive = bActivate
    }
 
}

export class ActivableCondition{
    activable: IActivable
    condition: () => boolean | Promise<boolean>
    constructor(activable: IActivable){
        this.activable = activable
    }
    checkActivable(){
        if (this.condition) {
            let result = this.condition()
            if(!isPromise(result)){
                this.activable.activate(result as boolean)
            }
            else{
                executeTask(async () => {
                    this.activable.activate((await result))
                })
            }
        }
    }
}

@Component('ActivableShape')
export class ActivableShape extends Activable{
    entity: IEntity
    config: ActivableShapeConfig
    constructor(entity: IEntity, config: ActivableShapeConfig){
        super()
        this.config = config
        this.entity = entity
    }
    activate(bActivate: boolean){

        if (bActivate && this.config.success) {
            if (this.config.success.collision) {
                this.activeCollision(actionToBoolean(this.config.success.collision))
            }
            if (this.config.success.visible) {
                this.activeVisibility(actionToBoolean(this.config.success.visible))
            }
        }
        else if (!bActivate && this.config.fail) {
            if (this.config.fail.collision) {
                this.activeCollision(actionToBoolean(this.config.fail.collision))
            }
            if (this.config.fail.visible) {
                this.activeVisibility(actionToBoolean(this.config.fail.visible))
            }
        }
        this.bActive = bActivate
    }
    activeCollision(bActivate: boolean){
      let shapeComponent = getMeshShapeComponent(this.entity)
      if (shapeComponent) {
        shapeComponent.withCollisions = bActivate
      }
    }
    activeVisibility(bActivate: boolean){
      let shapeComponent = getMeshShapeComponent(this.entity)
      if (shapeComponent) {
        shapeComponent.visible = bActivate
      }
    }
}

@Component('ActivableWithPoap')
export class ActivableWithPoap {
    poapEventId: number
    activable: Activable
    condition: ActivableCondition
    constructor(entity: IEntity, poapEventId: number, config: ActivableShapeConfig){

        const bAutoActivate = config.activateOnSpawn
        config.activateOnSpawn = false

        this.activable = new ActivableShape(entity, config)
        this.poapEventId = poapEventId
        this.condition = new ActivableCondition(this.activable)
        var self = this
        this.condition.condition = async function(): Promise<boolean> {
            try {
                const result = await hasPoap(self.poapEventId)
                console_log("hasPoap", result)
                return result
            } catch (error) {
                log("hasPoap error")
                console_log(error)
                return false
            }
        }
        if (bAutoActivate) {
        this.condition.checkActivable()
        }
    }
}

@Component('ActivableWithToken')
export class ActivableWithToken {
  tokenList: TokenInfo[]
  activable: Activable
  condition: ActivableCondition
  constructor(entity: IEntity, tokenList: TokenInfo[], config: ActivableShapeConfig){

    const bAutoActivate = config.activateOnSpawn
    config.activateOnSpawn = false

    this.activable = new ActivableShape(entity, config)
    this.tokenList = tokenList
    this.condition = new ActivableCondition(this.activable)
    var self = this
    this.condition.condition = async function(): Promise<boolean> {
        try {
            const address = await getUserAccount()
            const hasToken = await hasTokenInList(address, self.tokenList)
            console_log("hasToken", hasToken)
            return hasToken
          } catch (error) {
            log("hasToken error")
            console_log(error)
            return false
          }
    }
    if (bAutoActivate) {
      this.condition.checkActivable()
    }
  }
}
