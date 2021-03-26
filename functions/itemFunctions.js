const items = require("../json/items.js")

const randomValue =  (obj) => {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
  };
const randomKey = (obj) => {
    var keys = Object.keys(obj)
    return keys[keys.length * Math.random() <<0]
}
const getRarity = (luckyKey) => {
  let rarity;
  if(items['common'][luckyKey])  rarity = 'common'
  if(items['uncommon'][luckyKey])  rarity = 'uncommon'
  if(items['rare'][luckyKey])  rarity = 'rare'
  if(items['legendary'][luckyKey])  rarity = 'legendary'
  return rarity
}


const getCount = () => {
  const total = Object.keys(items['common']).length + Object.keys(items['uncommon']).length + Object.keys(items['rare']).length + Object.keys(items['legendary']).length
  return total
}
module.exports = {
randomValue,
randomKey,
getRarity,
getCount
}