// pages/order/order.js
import { request } from "../../utils/request.js";
const app = getApp();

Page({
  data: {
    tabs: ['全部', '待支付', '已支付', '售后'],
    activeIndex: 0,
    order:[],
    showOrder:[],
    navHeight:0,
  },
  onLoad(options) { 
    let that = this
    // 获取导航栏高度
    let query = wx.createSelectorQuery();
    query.select('.nav-bar').boundingClientRect(navRect=>{
      that.setData({
        navHeight: navRect.height,
      })
    }).exec();

    request({ url:"get-order-list",data:{"user_ouid":app.globalData.user_ouid}, method:"POST"}).then((res) => {
      if(res.code=='200'){ 
        console.log(res.data)
        this.setData({order: res.data, showOrder: res.data})
      }
    })
  },

  returnHome () {
    wx.navigateBack({ delta: 1 });
  },

  tabClick: function (e) {
    let tmp  = []
    let index = e.detail.index
    console.log("Tab点击:", e)
  },

  orderDetail(){
    //订单详情
    wx.navigateTo({
      url: '/pages/order/orderDetail'
    })
  }
})