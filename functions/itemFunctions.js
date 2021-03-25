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


module.exports = {
randomValue,
randomKey,
getRarity
}