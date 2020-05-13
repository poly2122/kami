  const $siteList = $('.siteList')
  const $lastLi = $siteList.find('li.last')
  const x = localStorage.getItem('x')
  const xObject = JSON.parse(x)
  const $addLi=$(".add-card")


  const hashMap = xObject || [{
          logo: 'B',
          url: 'https://www.baidu.com',
          name:'百度'
      },
      {
          logo: 'J',
          url: 'http:juejin.com',
          name:'掘金'
      },
      {
          logo: 'B',
          url: 'https://www.bilibili.com',
          name:'哔哩哔哩'
      },
      {
        logo: 'Z',
        url: 'https://www.zhihu.com',
        name:'知乎'
    }
  ];

  const simplifyUrl = (url) => {
      return url.replace('https://', '')
          .replace('http://', '')
          .replace('www.', '')
          .replace(/\/.*/, '')
  }

  const render = () => {
      $siteList.find('li:not(.last)').remove()
      hashMap.forEach((node,index) => {
          const $li = $(`<li>
       <div class="site">
       <div class="logo"> ${node.logo} </div>
       <div class="link">${simplifyUrl(node.url)}</div>
       <div class="close">
    <svg class="icon">
        <use xlink:href="#icon-icon-close"></use>
    </svg>
        </div>
        </div>
        </a>
       </li>`).insertBefore($lastLi)
       $li.on('click',()=>{
           window.open(node.url)
       })
       $li.on('click','.close',(e)=>{
           e.stopPropagation()   //阻止冒泡
           hashMap.splice(index,1)
           render()
       })
      }) 
  }

  render()

  $('.addButton')
      .on('click', () => {
          let url = window.prompt('请输入需要添加的网址')
          console.log(url);
          if (url.indexOf('http') !== 0) {
              url = 'https://' + url;
          }
          console.log(url)

          hashMap.push({
              logo: simplifyUrl(url)[0].toUpperCase(),

              url: url
          })
          render()
      })

  window.onbeforeunload = () => {
      const string = JSON.stringify(hashMap)
      localStorage.setItem('x', string)
  }
//   键盘监听事件
$(document).on('keypress',(e)=>{
    const {key}=e
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase()===key){
            window.open(hashMap[i].url)
        }
    }
   
    
})
