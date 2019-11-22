// =============== 实现接口 ==============================
// 微信 sdk 类实现
class WeixinSdk {
    weixinShare() {
        console.log('微信分享');
    }
}
// 支付宝 sdk 类实现
class ZhifubaoSdk {
    zhifubaoShare() {
        console.log('支付宝分享');
    }
}
// adapter 类实现
class Adapter {
    constructor() {
        this.sdk = this.getPlatfromSdk();
    }
    // 根据 ua 获取到平台
    getPlatform() {
        // 默认写了 weixin
        return 'weixin';
    }
    // 将所有 sdk 方法放进一个 map 里
    getPlatfromSdk() {
        const map = {
            weixin: WeixinSdk,
            zhifubao: ZhifubaoSdk
        };
        const platform = this.getPlatform();
        return new map[platform]();
    }
    // 分享功能
    share() {
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
