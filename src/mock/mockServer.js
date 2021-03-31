//这个文件里面主要是为了模拟接口
import Mock from 'mockjs'
import banner from './banner.json'
import floor from './floor.json'


Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})
