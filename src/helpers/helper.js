export const convertFirebasePDOtoArray = (obj) => {
    let arr = []
    if(obj){
      for(let key in obj){
          arr.push(obj[key])
      }
    }

    return arr;
  }