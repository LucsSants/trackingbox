import axios from "axios";
import * as cheerio from "cheerio";

type Data  = {
  Data: string;
  Status: string;
  Local: string;
  Hora: string;
  }

function removeColonBetweenNumbers(str:string) {
  str = str.replace(/(\d):(\d)/g, '$1$2');
  // Remove espaços em branco entre um número e uma letra
  str = str.replace(/([a-zA-Z])\s+:/g, '$1:');
  str = str.replace(/\|/g, ':');
  str = str.replace(/\s+H/g, 'H');
  str = str.replace(/\s{3,}/g, '');
  return str
}

function RemoveBigSpace(str:string) {
  str = str.replace(/\s{3,}/g, '');
  str = str.replace(/(\d)([a-zA-Z])/g, '$1 :$2');
  str = str.replace(/\bData\b/g, ':Data');
  str = str.replace(/\bDestino\b/g, ':Destino');
  str = str.replace(/\n/g, '');
  return str
}

export async function getAllStatus(orderCode: string) {
  let result : any[] = [];
  await axios("https://www.linkcorreios.com.br/?id=LB568216445HK")
    .then(
      
       async (response) => {
        const html = response.data
        const $ = cheerio.load(html)
        const info : any =[]
        const infos : any =[]

        await $('.singlepost .linha_status',html).each(function() {
          info.push(RemoveBigSpace($(this).text()))
          // info.push(removeColonBetweenNumbers(AddSpaceBetween(($(this).text()))).split(":"))
          // a = {

          // }
        })

        function arrayDeArraysParaObjetos(arr: any[][]): object[]{
          const resultado: object[] = [];
        
          for (let i = 0; i < arr.length; i++) {
            const objeto: { [key: string]: any } = {};
        
            for (let j = 0; j < arr[i].length; j += 2) {
              const chave: string = arr[i][j];
              const valor: string = arr[i][j + 1];
              objeto[chave] = valor;
            }
        
            resultado.push(objeto);
          }
           return resultado;
        }
        
        info.forEach(function(item:any) {
          infos.push(removeColonBetweenNumbers(item.toString()).split(":"))
        })
        const obj = arrayDeArraysParaObjetos(infos)
        console.log(obj)
        result = obj
       
    }
    
    ).catch(err=> console.log(err))

    return result
}

export async function getLastStatus(orderCode: string) {
  let result = {}
  await axios(`https://www.linkcorreios.com.br/?id=${orderCode}`)
    .then(
      async (response) =>  {
        const html = await response.data
        const $ = cheerio.load(html)
        const info : any =[]
        await $('.card-header ul li',html).each( function() {
          info.push(removeColonBetweenNumbers(($(this).text())).split(":"))
        })
        if(!info) {
          throw new Error ("Código incorreto, ou ainda não temos informações sobre esse pacote") 
        } 
        let hora = info[1].slice(2,4)
        info.push(hora)
        const obj = Object.fromEntries(info)
      
        result = obj
      }
      
      ).catch(err=> console.log(err, "cu"))

      return result
      
}