import Snow from './src/Snow.js'

function parseUrl(url){
  let result = []
  let query = url.split("?")[1]
  let queryArr = query ? query.split("&") : []
  queryArr.forEach(function(item){
    let value = item.split("=")[1] || item.split("=")[0]
    result.push(value)
  });
  return result
}

const flakeArray = parseUrl(decodeURI(location.href))
setInterval(()=>{
  if (flakeArray.length) {
    new Snow('body',flakeArray[parseInt(flakeArray.length*Math.random())])
  } else {
    new Snow()
  }
},100)

window.makeFlake = function() {
  let href = location.href.split('?')[0] + '?'
  for(let i in arguments){
    href = href + (i < arguments.length - 1 ? arguments[i] + '&': arguments[i]  )
  }
  location.href = href
}

console.log('在控制台调用makeFlake(flake1,flake2,...),查看其它效果')
