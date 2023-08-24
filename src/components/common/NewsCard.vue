<template>
  <div class="news-card">
        <b-card>
            <b-card-img :src="getImgUrl(image)"></b-card-img>
            <b-card-text>
                <p class="detail-section-meet">
                {{ article }}
                </p>
            </b-card-text>
            <div class="logo-card">
                <b-img :src="getImgUrl(logoImage)"></b-img>
                <span class="text-logo"> {{ logoName }}</span>
            </div>
        </b-card>
  </div>
</template>

<script>

const EVENTS = {
  click: 'click',
}

export default {
  name: "news-card",
   props: {
        article: { type: String, required: true },
        image: { type: String, required: true },
        logoImage: { type: String, required: true },
        logoName: { type: String, required: true },
    },
    data: () => ({
        EVENTS,
    }),
    methods: {
        getImgUrl(name) {
            var images = require.context('@/assets/game_detail/', false, /\.png$/)
            return images('./' + name)
        },
        getProgress() {
            return (this.currentUnit/this.totalUnit) * 100
        },
        getStyleProgress(){
            return 'width: ' + this.getProgress() + "%"
        }
  },
};
</script>

<style lang="scss" scoped>

.news-card{
    height: 68vh;
}

.news-card>div.card {
  background-color: #2b2b3e;
  border-radius: 18px;
}

.news-card>div.card>div.card-body>p.card-text {
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  color: #e3e3e3;
  margin-top: 1.5rem;
}

span.text-logo {
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 36px;
  text-align: center;
  letter-spacing: -0.015em;
  color: #e3e3e3;
}


// img.section-partners-image {
//     width: 100%;
//     height: auto;
//     position: initial;
//     max-width: 25rem;
// }
</style>