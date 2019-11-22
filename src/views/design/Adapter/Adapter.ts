// =============== 定义接口与类型 ==============================
// 支付宝接口
interface ZhifubaoInerface {
  zhifubaoShare(): void;
}
// 微信接口
interface WeixinInterface {
  weixinShare(): void;
}
// adapter 接口
interface AdapterInterface {
  share(): void;
}
// 合并所有 sdk 类型
interface MergeSdk extends ZhifubaoInerface, WeixinInterface {}
// 支持的平台类型
type platform = 'weixin' | 'zhifubao';
// =============== 实现接口 ==============================
// 微信 sdk 类实现
class WeixinSdk implements WeixinInterface {
  weixinShare() {
    console.log('微信分享');
  }
}
// 支付宝 sdk 类实现
class ZhifubaoSdk implements ZhifubaoInerface {
  zhifubaoShare() {
    console.log('支付宝分享');
  }
}
// adapter 类实现
class Adapter implements AdapterInterface {
  constructor() {
    this.sdk = this.getPlatfromSdk();
  }
  // 挂载 sdk
  private sdk: MergeSdk;
  // 根据 ua 获取到平台
  private getPlatform(): platform {
    // 默认写了 weixin
    return 'weixin';
  }
  // 将所有 sdk 方法放进一个 map 里
  private getPlatfromSdk() {
    const map = {
      weixin: WeixinSdk,
      zhifubao: ZhifubaoSdk
    };
    const platform = this.getPlatform();
    return new map[platform]() as MergeSdk;
  }
  // 分享功能
  public share() {
    const platform = this.getPlatform();

    switch (platform) {
      case 'weixin':
        this.sdk.weixinShare();
        break;
      case 'zhifubao':
        this.sdk.zhifubaoShare();
        break;
      default:
        console.log('此方法不存在');
    }
  }
}

const adapter = new Adapter();
adapter.share(); // 微信分享
