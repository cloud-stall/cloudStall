// pages/components/tabbars.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    grade:{
      type:Array,
      default: []
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready: function(){
    console.log('cccc',this.data.grade)
  }
})
