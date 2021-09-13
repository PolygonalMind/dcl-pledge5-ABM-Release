export class Text{
  text: {en: string}
  comfirmText?: {en: string, fontSize?: number}
  cancelText?: {en: string, fontSize?: number}
  fontSize: number
  vAlign: string
  nextTextIndex?: number
  bIsComfirmText?: boolean = false
  comfirmTextIndex?: number
  cancelTextIndex?: number
  comfirmFunction?: Function
  cancelFunction?: Function
  callback?: Function
  bEndDialog?: boolean = false
}
export class Dialog{
  texts: Text[]
}
export const textDialogs: Dialog[] = [
    {
      texts:[
        {
          text: {
            en: "Welcome to the Aetheria Block Museum located in the Aetheria district in Decentraland!",
          },
          fontSize: 30,
          vAlign: "0%",
        },
        {
          text: {
            en: "Be ready to learn about Ethereum early history via data and generative art from OG cryptoartists.",
          },
          fontSize: 28,
          vAlign: "0%",
        },
        {
          text: {
            en: "The Museum is divided into 5 sections covering significant events from Genesis through the end of 2018.",
          },
          fontSize: 28,
          vAlign: "0%",
        },
        {
          text: {
            en: "They are: 'The First Million', 'Early Days - theDAO', 'Denial of Service', 'The Bull Times' and 'The Peak of Inflated Expectations'.",
          },
          fontSize: 26,
          vAlign: "0%",
        },
        {
          text: {
            en: "Each section tells the story of historically significant blocks that were proposed around that time.",
          },
          fontSize: 28,
          vAlign: "0%",
        },
        {
          text: {
            en: "Along with a textual description of each block, you will find art that was seeded from that block itself.",
          },
          fontSize: 28,
          vAlign: "0%",
        },
        {
          text: {
            en: "Two of the artwork series - 'CryptoArte' and 'Block Parks' - were created by Sebastián Brocher while the 'Ms Ethereum' series is a collaboration between hex6c and Chiara Braidotti.",
          },
          fontSize: 22,
          vAlign: "0%",
        },
        {
          text: {
            en: "You will find more links with more information about the artists and their series at the entrance of the Museum. Enjoy!",
          },
          fontSize: 26,
          vAlign: "0%",
          bEndDialog: true
        },
      ]
    },
    {
      texts:[
        {
          text: {
            en: "Welcome to the meditation Garden just the chosen ones can enter this zone",
          },
          fontSize: 30,
          vAlign: "0%",
        },
        {
          text: {
            en: "Please sit and meditate with me",
          },
          fontSize: 36,
          vAlign: "0%",
          bEndDialog: true
        },
      ]
    },
]

export function getTextData(dialogId:number, textId:number): Text{
  if (textDialogs[dialogId]) {
    if (textDialogs[dialogId].texts[textId]) {
      return textDialogs[dialogId].texts[textId];
    }
    else return null;
  }
  else return null;

}

export function getText(dialogId:number, textId:number, textLanguage:string): string{
  if (textDialogs[dialogId]) {
    if (textDialogs[dialogId].texts[textId]) {
      if (!textDialogs[dialogId].texts[textId].text[textLanguage]) {
        textLanguage = 'en'
      }
      return textDialogs[dialogId].texts[textId].text[textLanguage];
    }
    else return "";
  }
  else return "";

}
