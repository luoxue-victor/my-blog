/**
 * 作者：落雪 
 * */
export default class CanvasRun {
  constructor(){
    console.log('注册成功')
    this.startTime = 0;
    this.endTime = 0;
    this.startClientX = 0;
    this.startClientY = 0;
    this.endClientX = 0;
    this.endClientY = 0;
    this.moveClientX = 0;
    this.moveClientY = 0;
  }
  public canvas: any;
  public ctx: any;
  public startTime: number;
  public endTime: number;
  public startClientX: number;
  public startClientY: number;
  public endClientX: number;
  public endClientY: number;
  public moveClientX: number;
  public moveClientY: number;
  private timer: any =0;
  public speed = {x: 0,y: 0};
  private VDomTree: any = [];
  private moveDistance: number = 0;
  private classList: any = {};
  private gain: number = 1;
  // 生成粒子
  private particleStore: any = {};
  public particlePics: any = [];
  private envents: any = {
    click: [],
    touchmove: [],
    touchstart: [],
    touchend: [],
    translateTop: [],
    translateleft: [],
    slowDown: []
  };
  
  // 事件只注册一次
  private SimpleInterest: boolean = true;
  // 初始化
  public async init({canvas,ctx,config,gain=1,noNeedOff=false,mounted=()=>{},created=()=>{}}: any) {
    let lastMoveX = 0;
    this.canvas = canvas;
    this.ctx = ctx;
    this.gain = gain;

    created && typeof created === 'function' && created();
    await this.compile(config);
    // if(!noNeedOff) this.offCanvas();
    this.draw();
    mounted && typeof mounted === 'function' && mounted();
    if(this.SimpleInterest) {
      this.SimpleInterest = false;
      this.touchstart((e: any)=>{
        this.startClientX = e.changedTouches[0].clientX;
        this.startClientY = e.changedTouches[0].clientY;
        this.endClientX = 0;
        this.endClientY = 0;
        this.moveClientX = 0;
        this.moveClientY = 0;
        this.moveDistance = 0;
        this.dispatchTouchstart(e);
      }); 
      this.touchend((e: any)=>{
        this.endClientX = e.changedTouches[0].clientX;
        this.endClientY = e.changedTouches[0].clientY;
        this.moveClientX = 0;
        this.moveClientY = 0;
        const diffTime = this.endTime - this.startTime;
        const diffX = this.endClientX - this.startClientX;
        const diffY = this.endClientY - this.startClientY;
        if( diffTime > 30 && diffTime < 150 && Math.abs(diffX) < 10 && Math.abs(diffY) < 10 ){
          this.dispatchClick(e);
        };
        this.speed = {
          x: parseInt(diffX / diffTime * 1000 + ''),
          y: parseInt(diffY / diffTime * 1000 + ''),
        };
        this.dispatchEnd(e);
      });
      this.touchmove((e: any)=>{
        this.moveClientX = e.changedTouches[0].clientX;
        this.moveClientY = e.changedTouches[0].clientY;
        this.dispatchMove(e);
        this.moveSlide(lastMoveX - e.changedTouches[0].clientX);
        this.draw();
        lastMoveX = e.changedTouches[0].clientX;
      });
    };
    
  };
  public destroyed () {
    this.clear();
    this.VDomTree = [{}];
  };
  // 更新画布
  public $apply() {
    this.init({canvas: this.canvas,ctx: this.ctx,config: this.VDomTree});
  };
  // 编译步骤 
  private async compile (VDomTree: any) {
    this.classList = {};
    const defaultEvent = () => {};
    const events = ['click','touchmove','touchstart','touchend'];
    // 可继承属性
    const canInheritAttr = ['w','fontSize','color','opcity'];
    // 父级可被撑开的属性
    const openParentAttr = ['w','h'];
    // 继承函数
    const inherit = (child: any,parent: any) =>{
      canInheritAttr.forEach(i => {
        if(!child[i] && parent && parent[i]) child[i] = parent[i]
      })
    };
    const openAttr = (parent: any) =>{
      if(!parent) return;
      openParentAttr.forEach((i: any) =>{
        if(parent.whiteSpace === 'nowrap') parent[i] = this.computedWidth(parent)[i] || parent[i];
      });
    };
    const combination = async (arr = VDomTree,parent: any = null) => {
      if(parent) parent.childX = 0;
      for(let i = 0; i < arr.length; i++){
        // 注册class
        arr[i].class && this.analysisString(arr[i].class).forEach((element: any) => addClass(element,arr[i]));
        arr[i].children && arr[i].children.length > 0 && await combination(arr[i].children,arr[i]);
        // 建立父子关系
        arr[i].parent = parent;
        arr[i].index = i;
        if(typeof arr[i].backgroundImage === 'string'){
          arr[i].backgroundImage = await this.createdImg(arr[i].backgroundImage);
        };
        // 继承关系
        inherit(arr[i],parent);
        // 放大倍数
        this.objectkeys(arr[i]).forEach(key => {
          const limits = ['zIndex','index','maxLine','scale','opcity','rotate'];
          if(limits.indexOf(key) > -1) return;
          if (typeof arr[i][key] === 'number') arr[i][key] *= this.gain;
          if(this.isPlainObject(arr[i][key]) && key !== 'parent') {
            const keys = this.objectkeys(arr[i][key]);
            keys.forEach(item=>{
              arr[i][key][item] *= this.gain;
            });
          }
        });
        // 注册事件
        events.forEach(e=>{
          if (!arr[i][e]) arr[i][e] = defaultEvent;
        });
      };
      openAttr(parent);
    };
    const addClass = (attr: string,dom: any) => {
      !this.classList[attr] ? this.classList[attr] = [dom] : this.classList[attr].push(dom);
    };
    await combination();
    this.VDomTree = VDomTree;
    return true;
  };

  public get getClassList() { return this.classList; }
  // 滑动监听，计算并设置移动距离
  private moveSlide(moveDistance: number) {
    if(Math.abs(moveDistance) < 30) this.moveDistance = moveDistance;
  };
  private dispatchMove(e: any) {
    const events = this.envents.touchmove;
    const ex = this.moveClientX;
    const ey = this.moveClientY;
    this.dispatchEvent(events,ex,ey,'touchmove');
  };
  // 事件派发 click
  private dispatchClick(e: any) {
    const events = this.envents.click;
    const ex = this.endClientX;
    const ey = this.endClientY;
    setTimeout(()=>{
      this.dispatchEvent(events,ex,ey,'click');
    },300) 
  };
  // 事件派发 click
  private dispatchTouchstart(e: any) {
    const events = this.envents.touchstart;
    const ex = this.startClientX;
    const ey = this.startClientY;
    this.dispatchEvent(events,ex,ey,'touchstart');
  };
  private dispatchEvent(events: any,ex: number,ey: number, type='click') {
    for(let i = 0; i < events.length; i++) {
      if(ex >= events[i].area.l && ex <= events[i].area.r && ey >= events[i].area.t && ey <= events[i].area.b){
        events[i] && typeof events[i][type] === 'function' && events[i][type].bind(this)(events[i]);
        this.draw();
        // 只允许同时触发一个事件，阻止向下传递
        return;
      }
    }
  };
  private dispatchEnd(e: any) {
    const events = this.envents.touchend;
    const ex = this.endClientX;
    const ey = this.endClientY;
    this.dispatchEvent(events,ex,ey,'touchend');
  };
  // 清理上次绘画
  public clear() {
    this.envents = {
      click: [],
      touchmove: [],
      touchstart: [],
      touchend: [],
      translateTop: [],
      translateleft: [],
      slowDown: [],
    };
  };
  // 
  offCanvas() {
    
    const files = this.getFile;
    const arr = [];
    for(let i = 0;i < files.length; i++) {
      if(files[i].particle) arr.push(files[i])
    };
    arr.map(VCANVASDOM=>{
      this.ctx.save();
      this.drwaView(VCANVASDOM);
      this.ctx.restore();

      let {x,y,w,h,particle} = VCANVASDOM;
      const grainSize = particle.size || 5;
      const diameter =  particle.d || 0;
      const getRandom = () => {
        return 0.5 * diameter * (Math.random() > 0.5 ? Math.random() : -Math.random()); 
      };
      const storeArr: any = [];
      const store = () => {
        for(let i = x;i <= x + w; i += grainSize) {
          for(let j = y; j <= y + h; j += grainSize) {
            storeArr.push({
              file: this.ctx.getImageData(i,j,grainSize,grainSize),
              x: i,
              y: j,
              w: grainSize,
              h: grainSize
            }); 
          }
        };
        this.particleStore[VCANVASDOM.class] = storeArr;
        // this.getClassList[VCANVASDOM.class][0].opcity = 0;
      };

      store();
      const put = () => {
        let arr = this.particleStore[VCANVASDOM.class];
        for(let i = 0; i < arr.length; i++) {
          arr[i] && arr[i].file && this.ctx.putImageData(
            arr[i].file,
            arr[i].x + getRandom(),
            arr[i].y + getRandom(),
          );
        }
      };

      const arr = [];
      this.ctx.save()
      this.drwaView(VCANVASDOM);
      this.ctx.restore();
      const getData = this.ctx.getImageData(0,0,500,500);
      arr.push(getData);
      this.particlePics[VCANVASDOM.class] = arr;
      console.log(getData)
    });
  };
  // 绘图
  public draw() {
    this.clear();
    const files = this.getFile;
    let i = 0;
    const draw = () => {
      const VCANVASDOM = Object.assign({},files[i],{self: files[i]})
      this.warp(VCANVASDOM as any);
      i++;
      if(files.length === i) return;
      draw();
    };
    draw();
  };
  // 事件储存，把层级高的事件放在上面
  private eventStoreArea (type: string,envent: any) {
    this.envents[type] && this.envents[type].unshift(envent);
  };
  // 把px转化成适合屏幕大小尺寸
  private rpxToFix(rpx: number|string = '10rpx') {
    rpx = rpx + '';
    if(!/^[\d]+(rpx)$/.test(rpx)) return rpx;
    return this.trasnslateUnit(parseInt(rpx)) * this.gain;
  };
  private errorLog(msg: any) {
    console.error(msg);
    return true;
  };
  // 画圆角矩形
  private drwaRoundRect({x=0,y=0,w=0,h=0,borderRadius=0,border='1rpx solid transparent'}) {
    border = border || '1rpx solid transparent';
    const strArr = this.analysisString(border);
    if(strArr.length < 3) return this.errorLog('您设置的border缺少参数');
    const borderSize =  this.rpxToFix(strArr[0]);
    const borderColor =  this.rpxToFix(strArr[2]);
    const borderType =  this.analysisString(strArr[1],':');
    let r = borderRadius;
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.ctx.strokeStyle = borderColor;
    borderType[0] === 'dashed' && this.ctx.setLineDash([borderType[1] || 10, borderType[2] || 3]);
    this.ctx.lineWidth = borderSize;
    this.ctx.beginPath();
    this.ctx.moveTo(x + r, y);
    this.ctx.arcTo(x + w, y, x + w, y + h, r);
    this.ctx.arcTo(x + w, y + h, x, y + h, r);
    this.ctx.arcTo(x, y + h, x, y, r);
    this.ctx.arcTo(x, y, x + w, y, r);
    this.ctx.closePath();
    return this.ctx;
  };
  private drawFont({fontSize,color='#000000',lineHeight,maxLine,text,textAlign='start',overText,overTextColor,fontWeight,x,y,w,h}: any) {
    this.ctx.save();
    lineHeight = lineHeight || fontSize;
    this.ctx.font = `${fontWeight ? fontWeight + ' ' : ''}${fontSize}px Arial`;
    if(textAlign === 'center') x = x + w / 2;
    if(textAlign === 'end') x = x + w;
    this.ctx.textAlign = textAlign;
    const computedTextArr = this.computedText(text,fontSize,w);
    computedTextArr.forEach((item,index)=>{
      text = item.resText;
      if(index >= maxLine) return;
      if(index === maxLine - 1 && Math.abs(w - item.tw) < fontSize) {
        if(overText) {
          text = text.substr(0,text.length - (1 + overText.length)) + ('...');
          this.ctx.fillStyle = overTextColor || color;
          this.ctx.fillText(overText, x + this.ctx.measureText(text).width, y + lineHeight);
        }else{
          text = text.substr(0,text.length - 1) + '...';
        }
      }; 
      y += lineHeight;
      this.ctx.fillStyle = color;
      this.ctx.fillText(text, x, y);
    });
    this.ctx.restore();
    return this.ctx;
  };

  // 粒子化
  private getParticle (VCANVASDOM: any) {
    this.drwaView(VCANVASDOM);
    const arr: any = [];
    let {x,y,w,h,particle} = VCANVASDOM;
    const grainSize = particle.size || 5;
    const diameter =  particle.d || 0;
    const getRandom = () => {
      return 0.5 * diameter * (Math.random() > 0.5 ? Math.random() : -Math.random()); 
    };
    const store = () => {
      for(let i = x;i <= x + w; i += grainSize) {
        for(let j = y; j <= y + h; j += grainSize) {
          arr.push({
            file: this.ctx.getImageData(i,j,grainSize,grainSize),
            x: i,
            y: j,
            w: grainSize,
            h: grainSize
          }); 
        }
      };
      this.particleStore[VCANVASDOM.class] = arr;
      this.getClassList[VCANVASDOM.class][0].opcity = 0;
    };
    const put = () => {
      let arr = this.particleStore[VCANVASDOM.class];
      for(let i = 0; i < arr.length; i++) {
        arr[i] && arr[i].file && this.ctx.putImageData(
          arr[i].file,
          arr[i].x + getRandom(),
          arr[i].y + getRandom(),
        );
      }
    };

    !this.particleStore[VCANVASDOM.class] ? store() : put();
    
  };

  private drwaView(VCANVASDOM: any) {
    
    let { backgroundImage,backgroundColor='transparent',x,y,w,h,text,backgroundSize,backgroundPosition,scale,opcity,rotate} = VCANVASDOM;
    if (opcity >= 0) this.ctx.globalAlpha = opcity;
    if(scale) {
      this.ctx.translate(x + w/2,y + h/2);
      this.ctx.scale(scale.x,scale.y);
      this.ctx.translate( -(x + w/2),-(y + h/2));
    }
    if(rotate) {
      this.ctx.translate(x + w/2,y + h/2);
      this.ctx.rotate(parseInt(rotate) * Math.PI / 180);
      this.ctx.translate(-(x + w/2),-(y + h/2));
    }
    this.drwaRoundRect(VCANVASDOM).stroke();
    this.ctx.clip();
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(x, y, w, h);
    if(backgroundPosition) {
      x = x + backgroundPosition.x;
      y = y + backgroundPosition.y;
    };
    if(backgroundSize) {
      w = backgroundSize.w;
      h = backgroundSize.h;
    };
    this.ctx 
      && backgroundImage 
      && this.ctx.drawImage(backgroundImage, x, y, w, h);
    this.ctx && text && this.drawFont(VCANVASDOM as any);
  }
  
  // 视图包裹器
  private viewWrap(VCANVASDOM: any) { 
    this.ctx.save();
    // 粒子化单独渲染
    VCANVASDOM.particle 
      ? this.getParticle(VCANVASDOM) 
      : this.drwaView(VCANVASDOM);
    this.ctx.restore();
  };
  // 事件包裹器
  private eventWrap({self,x,y,w,h,click,touchstart,touchmove,touchend}: any) {
    x /= this.gain;
    y /= this.gain;
    w /= this.gain;
    h /= this.gain;
    [click,touchstart,touchmove,touchend].forEach(e => {
      if(e && e.name === 'defaultEvent') return;
      if(e && typeof e === 'function') {
        const params: any = {
          area: {
            t: y,
            b: y + h,
            l: x,
            r: x + w,
          },
          self
        };
        params[e.name] = e;
        this.eventStoreArea(e.name,params);
      }
    });
  };
  // 将事件跟绘图区分开，分别处理
  private warp(VCANVASDOM: any) {
    const w = this.canvas.width;
    const h = this.canvas.height;
    // 如果元素在canvas外则不绘制
    if (
         VCANVASDOM.x + w < 0 
      || VCANVASDOM.y + h < 0 
      || VCANVASDOM.x > w 
      || VCANVASDOM.y > h
    ) return;
    this.viewWrap(VCANVASDOM);
    this.eventWrap(VCANVASDOM);
  };
  // 递归遍历得到所有dom， 并排序文件，后续可能会增加功能
  private get getFile() {
    let returnArr: any = [];
    if(this.VDomTree && this.VDomTree.length > 0){
      const combination = (arr: any = this.VDomTree,parent: any = null) => {
        if(parent) parent.childX = 0;
        for(let i = 0; i < arr.length; i++){
          if (arr[i].zIndex < 0 || arr[i].display === 'none') continue;
          returnArr.push(this.modify(arr[i],parent));
          if(arr[i].children && arr[i].children.length > 0){
            combination(arr[i].children,arr[i]);
          }
        };
      };
      combination();
    };
    return this.sort(returnArr);
  };
  // 计算父级宽度
  private computedWidth(parent: any): any {
    if(!parent.children) return { w: 0,h: 0 };
    let w = 0, h = 0;
    w += fixUndefind(parent.paddingLeft) + fixUndefind(parent.paddingRight);
    parent.children.forEach((element: any) => {
      h = (element.h > h ? element.h : h);
      w += fixUndefind(element.w) + fixUndefind(element.maginLeft) + fixUndefind(element.marginRight);
    });
    // 矫正计算宽度，后续改良现在不准确，临时方案
    w -= 800 / parent.children.length;
    // w = (parent.children.length - 1) * 168;
    return { w, h };
    function fixUndefind(num: number) {
      return num ? num : 0;
    };
  };

  // 滑动边界
  private slideSide(type: any,file: any,max: any,min: any) {
    if(file[type] > max) {
      file[type] = max;
      cancelAnimationFrame(this.timer);
    }else if(file[type] < min){
      file[type] = min;
      cancelAnimationFrame(this.timer);
    };
  };
  // 能够左右滑动
  private canLRSlide(parent: any) {
    let x = parent.x || 0, 
        y = parent.y || 0, 
        w = parent.computedW || 0, 
        h = parent.computedH || 0,
        maxMaginLeft = parent.children[0] ? parent.children[0].maginLeft || 0 : 0,
        minMaginLeft = (document.body.clientWidth - parent.w / this.gain);
    parent.computedW = parent.w / this.gain;
    parent.computedH = parent.h / this.gain;
    x /= this.gain;
    y /= this.gain;
    w /= this.gain;
    h /= this.gain;
    const area =  {
      t: y,
      b: y + h,
      l: x,
      r: x + w,
    };
    this.eventStoreArea('touchmove',{
      area,
      touchmove: ()=>{
        this.clear();
        cancelAnimationFrame(this.timer);
        parent.marginLeft = -1 * this.moveDistance + fixUndefind(parent.marginLeft);
      },
    });
    this.eventStoreArea('touchend',{
      area,
      touchend: ()=> {
        this.clear()
        clearInterval(this.timer);
        let speed = this.speed.x * this.gain;
        if(Math.abs(speed) < 300) return;
        const run = () =>{
          if(speed > 0) speed -= 10 * this.gain; else speed += 10 * this.gain;
          parent.marginLeft = 1 * speed / 100 + fixUndefind(parent.marginLeft);
          this.draw();
          if(Math.abs(speed) <= 10 * this.gain) return;
          this.timer = requestAnimationFrame(run);
        };
        run();
      },
    });
    this.slideSide('marginLeft',parent,maxMaginLeft,minMaginLeft);
    function fixUndefind(num: number) {
      return num ? num : 0;
    };
  };
  private slideTop(child: any,parent: any) {
    this.translateSlide(child,parent)
  };
  private translateSlide(child: any, parent: any) {
    let timer: any = 0;
    const speed = child.slideSpeed || 3;
    const ifAddSpeed = child.slideTop < 0;
    if(parent.slideRunning && Math.abs(child.slideTop) > speed) return; 
    parent.slideRunning = true;
    const slide = () => {
      child.slideTop = ifAddSpeed ? child.slideTop + speed : child.slideTop - speed;
      if(!parent.marginTop) parent.marginTop = 0;
      parent.marginTop = ifAddSpeed ? parent.marginTop + speed : parent.marginTop - speed;
      this.draw(); 
      if (Math.abs(child.slideTop) <= speed) {
        parent.slideRunning = false;
        window.cancelAnimationFrame(timer);
        return;
      };
      timer = window.requestAnimationFrame(slide);
    };
    timer = window.requestAnimationFrame(slide);
  };
  // 修饰动作
  private modify(child: any, parent: any) {
    if(!parent) return child;
    if(child.canLRSlide) this.canLRSlide(parent);
    if(child.slideTop) this.slideTop(child,parent);
    // 使用定位 不会影响到拖拽
    if(child.position) {
      child.x = child.position.x;
      child.y = child.position.y;
      return child;
    };
    // 不使用相对定位
    child.x = fixUndefind(parent.x) + fixUndefind(parent.paddingLeft) + fixUndefind(child.marginLeft);
    child.y = fixUndefind(parent.y) + fixUndefind(parent.paddingTop) + fixUndefind(child.marginTop);
    if(parent.whiteSpace === 'nowrap') {
      child.x = fixUndefind(parent.childX) + fixUndefind(parent.paddingLeft) + fixUndefind(child.marginLeft) + fixUndefind(parent.marginLeft);
      parent.childX = fixUndefind(parent.childX) + child.w + fixUndefind(child.marginLeft);
      return child;
    };
    function fixUndefind(num: any) {
      return num ? num : 0;
    };
    return child;
  };
  // 封装 touchstart 事件
  private touchstart(cb: Function) {
      this.canvas.addEventListener('touchstart',(e: any)=>{
      this.startTime = Date.now();
      cb(e);
    })
  };
  // 封装 touchend 事件
  private touchend(cb: Function) {
    this.canvas.addEventListener('touchend',(e: any)=>{
      this.endTime = Date.now();
      cb(e);
    })
  };
  // 封装 touchmove事件
  private touchmove(cb: Function) {
    this.canvas.addEventListener('touchmove',(e: any)=>{
      cb(e);
    })
  };

  // ============================工具方法===========================================
  /**
   * 解析字符串 
   * '1rpx solid red' return ['1rpx','solid','red'];
   */ 
  private analysisString(str: string,type: string = ' ') {
    const arr: any = [];
    if(!str) return arr;
    str.trim().split(type).forEach(item => {
      arr.push(item.trim());
    });
    return arr;
  };
  public computedText(text: string = '',fontSize = 28,w = 200): {resText: string,tw: number}[] {
    const textArr = text.split('\n');
    let resTextArr = [];

    const map = (t: string) => {
      const textArr = t.split('');
      let tw = 0;
      let lineIndex = 0;
      let resTextArr: any = [];
      let resText = '';
      textArr.map((char)=>{
        const len = /[\w|\d|,|.]/.test(char) ? fontSize / 2 : fontSize;
        if(tw > w - fontSize) {
          resText = '';
          tw = 0;
          lineIndex++;
        };
        tw += len;
        resText += char;
        resTextArr[lineIndex] = {
          resText,
          tw
        };
      });
      return resTextArr;
    };

    for(let i = 0; i < textArr.length; i++) {
      resTextArr.push(...map(textArr[i])); 
    }
    return resTextArr;
  };
  // 见图片转为canvas可用的img对象
  public createdImg(url: string): any {
    return new Promise((resovle,reject)=>{
      const img = new Image();
      // 解决跨域问题
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        resovle(img);
      };
      img.onerror= (e) => {
        reject(e);
      };
      img.src = url;
    });
  };
  // 生成图片,此方法需要在所有canvas绘制完成后调用
  public get createdImageUrl() {
    return this.canvas.toDataURL("image/png");
  };
  // 把数据转化呈用户适配用户屏幕  
  public trasnslateUnit (num: number) {
    return parseInt(num * document.body.clientWidth / 750 + '');
  };
  // 吧用户手机的尺寸数据转化成 750
  public paramsTranslateUnit = (num: number) => {
    return parseInt(num * 750 / this.gain / document.body.clientWidth + '');
  };
  // 排序
  public sort(arr: any) {
    function sequence(a: any,b: any){
      a = a.zIndex || 0;
      b = b.zIndex || 0;
      return a > b ? 1 : a < b ? -1 : 0;
    };
    return arr.sort(sequence);
  };
  // 下载资源，并返回进度
  public downloadFile(files: any[],cb: Function) {
    try {
      let j = 0;
      for(let i=0; i< files.length;i++) {
        files[i].then((res: any)=>{
          files[i] = res;
          j++;
          cb(files,j/files.length);
        })
      };
    } catch (error) {
      
    }
  };
  public isPlainObject(obj: any) {
    const _toString = Object.prototype.toString;
    return _toString.call(obj) === '[object Object]'
  };
  public objectkeys(obj: any) {
    if (this.isPlainObject(obj)) return Object.keys(obj);
    return [];
  }
}
