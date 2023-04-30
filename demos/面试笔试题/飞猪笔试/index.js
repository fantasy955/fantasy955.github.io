/**
 * 营销卡片渲染数据
 */
// interface IDirectVoucher {
//     /** 品牌名 */
//     brandName?: string;
//     /** 品牌logo */
//     brandLogo?: string;
//     /** 距离描述 */
//     distanceDesc?: string;
//     /** 活动素材图 */
//     campImage?: string;
//     /** 营销标签 */
//     promoLogo?: string | string[];
//     /** 券描述 */
//     voucherDesc?: string;
//     /** 券 */
//     benefitAmount?: string;
//     /** 特价券原价 */
//     oriPriceAmount?: string;
//     /** 折扣描述 */
//     discountDesc?: string;
//     /** 库存 */
//     voucherStockNum?: string;
// }

const cardDataList = [
    {
        brandName: '弄堂里',
        brandLogo:
            'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*anNdQqA_I_AAAAAAAAAAAAAAARQnAQ',
        distanceDesc: '500m',
        campImage:
            'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*U29sSqgeU-4AAAAAAAAAAAAAARQnAQ',
        promoLogo: [
            'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*y6CTRo9L2oEAAAAAAAAAAAAAARQnAQ',
            'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*Q1d4SIoeKRkAAAAAAAAAAAAAARQnAQ',
        ],
        voucherDesc: '弄堂里14元超值优惠券包x2',
        benefitAmount: '1',
        oriPriceAmount: '28',
        discountDesc: '0.6折',
        voucherStockNum: '库存888份',
    },
    {
        brandName: '弄堂里',
        brandLogo:
            'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*anNdQqA_I_AAAAAAAAAAAAAAARQnAQ',
        distanceDesc: '500m',
        campImage:
            'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*U29sSqgeU-4AAAAAAAAAAAAAARQnAQ',
        promoLogo: [
            'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*Q1d4SIoeKRkAAAAAAAAAAAAAARQnAQ',
        ],
        voucherDesc: '弄堂里14元超值优惠券包x2',
        benefitAmount: '1',
        discountDesc: '0.6折',
    },
    {
        brandName: '飞猪',
        brandLogo:
            'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*dCL5Q4oBaQsAAAAAAAAAAAAAARQnAQ',
        campImage:
            'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*MZ7VSaNZXRYAAAAAAAAAAAAAARQnAQ',
        promoLogo:
            'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*90WEQLmnKdkAAAAAAAAAAAAAARQnAQ',
        voucherDesc: '南方航空20元优惠券',
        benefitAmount: '20',
    },
];

// interface ICardProps {
//     data: IDirectVoucher;
// }

const Card = {
    props: {
        data: Object,
    },
    template: `
<div class="card">
    <div class="card-left">
        <div class="card-left-title">
            <div style="display: inline-block">
                <img :src="data.brandLogo" alt="" />
                <span>{{data.brandName}}</span>
            </div>
            <div v-if="data.distanceDesc" class="distance" style="display: inline-block">
                <span>{{data.distanceDesc}}</span>
            </div>
        </div>
        <div class="card-left-content">
            <img :src="data.campImage">
            <div class="desc">
                <div style="width: 100%" class="promoLogo">
                    <div v-if="Array.isArray(data.promoLogo)">
                        <img v-for="item in data.promoLogo" :src="item" />
                    </div>
                    <img v-else :src="data.promoLogo" />
                </div>
                <div style="width: 100%" class="voucher">{{data.voucherDesc}}</div>
                <div>
                    <div style="width: 100%" class="amount">{{data.benefitAmount+'元'}}</div>
                    <div style="width: 100%" v-if="data.oriPriceAmount" class="oriPrice">{{data.oriPriceAmount+'元'}}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="card-right">
        <div v-if="data.discountDesc" class="discountDesc">
            {{data.discountDesc}}
        </div>
        <button class='btn'>{{text}}</button>
    </div>
</div>
`,
    mounted: function () {

    },
    data(){
        return {
            text: '10s',
        }
    }
};

const CardList = {
    components: { Card },
    data() {
        return {
            cardDataList,
        };
    },
    template: `
<div>
<card v-for="cardData in cardDataList" :data="cardData" />
</div>
`,
    mounted: function () {

    }
}

Vue.createApp(CardList).mount('#app')
