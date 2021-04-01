//用户的临时标识一般不变，只要有了，后期全部都是这一个
//用户临时标识要先存储起来，然后获取的时候先从存储的地方去拿，如果有直接返回
//如果没有再创建，创建好还要存储起来

import { v4 as uuidv4 } from 'uuid';

export function getUserTempId(){
  //先从localStorage获取，能拿到代表之前已经创建好并保存过，直接拿就行
  let userTempId = localStorage.getItem('USERTEMPID_KEY')

  if(!userTempId){
    // 之前没创建过，那么这次我们得新建一个，并且新建完成要保存localStorage
    //创建
    userTempId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    //保存
    localStorage.setItem('USERTEMPID_KEY',userTempId)
  }
  return userTempId
}